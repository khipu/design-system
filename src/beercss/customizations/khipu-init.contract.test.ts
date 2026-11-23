import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import initScript from './khipu-init.js?raw';

/**
 * khipu-init.js is a plain IIFE served to server-rendered pages (payment GSP). It is run
 * here as-is in jsdom and exercised through `window.Khipu.initContract`.
 */
type KhipuApi = { initContract: (root?: ParentNode) => void };

// jsdom has no layout: give .kds-contract-content a fixed scroll geometry.
let scrollTop = 0;
let scrollHeight = 1000;
const clientHeight = 200;

function mockGeometry() {
  const isContent = (el: Element) => el.classList.contains('kds-contract-content');
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return isContent(this) ? scrollHeight : 0;
  });
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return isContent(this) ? clientHeight : 0;
  });
  vi.spyOn(HTMLElement.prototype, 'scrollTop', 'get').mockImplementation(function (this: HTMLElement) {
    return isContent(this) ? scrollTop : 0;
  });
}

function mountContract() {
  document.body.innerHTML = `
    <div class="kds-contract" data-kds-contract>
      <div class="kds-contract-content" tabindex="0" role="region" aria-label="Contrato">…</div>
      <label class="checkbox kds-contract-accept">
        <input type="checkbox" name="accept" disabled aria-describedby="hint"/>
        <span>Declaro que leí y acepto el contrato</span>
      </label>
      <div class="kds-contract-hint" id="hint">Desplázate hasta el final del contrato para poder aceptarlo.</div>
    </div>`;
  const contract = document.querySelector<HTMLElement>('[data-kds-contract]')!;
  return {
    contract,
    content: contract.querySelector<HTMLElement>('.kds-contract-content')!,
    checkbox: contract.querySelector<HTMLInputElement>('input[type="checkbox"]')!,
    hint: contract.querySelector<HTMLElement>('.kds-contract-hint')!,
  };
}

describe('khipu-init.js initContract (read-to-accept contract)', () => {
  let api: KhipuApi;

  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    new Function(initScript)();
    api = (window as unknown as { Khipu: KhipuApi }).Khipu;
  });

  afterEach(() => {
    scrollTop = 0;
    scrollHeight = 1000;
    document.body.innerHTML = '';
    // Geometry getters (and the load-time console.log spy, no longer needed) are restored.
    vi.restoreAllMocks();
  });

  it('keeps the checkbox disabled until the content is scrolled to the end', () => {
    mockGeometry();
    const { contract, content, checkbox, hint } = mountContract();
    const onRead = vi.fn();
    contract.addEventListener('kds:contract-read', onRead);
    api.initContract();

    expect(checkbox.disabled).toBe(true);
    expect(hint.hidden).toBe(false);

    scrollTop = 500;
    content.dispatchEvent(new Event('scroll'));
    expect(checkbox.disabled).toBe(true);

    expect(checkbox).toHaveAttribute('aria-describedby', 'hint');

    scrollTop = 800;
    content.dispatchEvent(new Event('scroll'));
    expect(checkbox.disabled).toBe(false);
    expect(hint.hidden).toBe(true);
    // The hidden hint no longer describes the checkbox.
    expect(checkbox).not.toHaveAttribute('aria-describedby');
    expect(contract).toHaveClass('kds-contract--read');
    expect(onRead).toHaveBeenCalledTimes(1);

    content.dispatchEvent(new Event('scroll'));
    expect(onRead).toHaveBeenCalledTimes(1);
  });

  it('enables the checkbox right away when the content fits without scrolling', () => {
    scrollHeight = 150;
    mockGeometry();
    const { checkbox, hint } = mountContract();
    api.initContract();
    expect(checkbox.disabled).toBe(false);
    expect(hint.hidden).toBe(true);
  });

  it('does not mark a hidden contract as read (no layout yet) until it gets a size', () => {
    scrollHeight = 0;
    mockGeometry();
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 0);
    const { checkbox } = mountContract();
    api.initContract();
    expect(checkbox.disabled).toBe(true);
  });

  it('disables the checkbox itself, so markup without `disabled` still requires reading', () => {
    mockGeometry();
    const { checkbox } = mountContract();
    checkbox.disabled = false; // markup shipped without `disabled` (works without JS)
    api.initContract();
    expect(checkbox.disabled).toBe(true);
  });

  it('initialises each contract once', () => {
    mockGeometry();
    const { contract, content } = mountContract();
    const onRead = vi.fn();
    contract.addEventListener('kds:contract-read', onRead);
    api.initContract();
    api.initContract();
    scrollTop = 800;
    content.dispatchEvent(new Event('scroll'));
    expect(onRead).toHaveBeenCalledTimes(1);
  });
});

type SheetApi = {
  initSheets: (root?: ParentNode) => void;
  openSheet: (id: string, opener?: HTMLElement) => void;
  closeSheet: (id: string) => void;
};

function mountSheet(dismissible = true) {
  document.body.innerHTML = `
    <button type="button" id="opener" data-open-sheet="confirm-sheet">Cancelar esta alta</button>
    <div class="kds-bottom-sheet-scrim kds-bottom-sheet-scrim--dialog open" id="confirm-sheet" hidden
         ${dismissible ? '' : 'data-sheet-dismissible="false"'}>
      <div class="kds-bottom-sheet kds-bottom-sheet--dialog" role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 class="kds-bottom-sheet-title" id="t">¿Cancelar esta alta?</h2>
        <div class="kds-bottom-sheet-actions">
          <button type="submit" id="confirm">Sí, cancelar alta</button>
          <button type="button" id="back" data-close-sheet>Volver</button>
        </div>
      </div>
    </div>`;
  const get = (id: string) => document.getElementById(id) as HTMLElement;
  return { opener: get('opener'), scrim: get('confirm-sheet'), confirm: get('confirm'), back: get('back') };
}

const key = (target: HTMLElement, k: string, shiftKey = false) =>
  target.dispatchEvent(new KeyboardEvent('keydown', { key: k, shiftKey, bubbles: true, cancelable: true }));

describe('khipu-init.js initSheets (server-rendered bottom sheets)', () => {
  const api = () => (window as unknown as { Khipu: SheetApi }).Khipu;

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('opens from data-open-sheet, focuses the first action and fires kds:sheet-open', () => {
    const { opener, scrim, confirm } = mountSheet();
    const onOpen = vi.fn();
    scrim.addEventListener('kds:sheet-open', onOpen);
    api().initSheets();
    opener.click();
    expect(scrim.hidden).toBe(false);
    expect(document.activeElement).toBe(confirm);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('closes with data-close-sheet and returns the focus to the opener', () => {
    const { opener, scrim, back } = mountSheet();
    const onClose = vi.fn();
    scrim.addEventListener('kds:sheet-close', onClose);
    api().initSheets();
    opener.click();
    back.click();
    expect(scrim.hidden).toBe(true);
    expect(document.activeElement).toBe(opener);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes with Escape and with a click on the scrim', () => {
    const { opener, scrim, confirm } = mountSheet();
    api().initSheets();
    opener.click();
    key(confirm, 'Escape');
    expect(scrim.hidden).toBe(true);
    opener.click();
    scrim.click();
    expect(scrim.hidden).toBe(true);
  });

  it('ignores Escape and the scrim when data-sheet-dismissible="false"', () => {
    const { opener, scrim, confirm, back } = mountSheet(false);
    api().initSheets();
    opener.click();
    key(confirm, 'Escape');
    scrim.click();
    expect(scrim.hidden).toBe(false);
    back.click();
    expect(scrim.hidden).toBe(true);
  });

  it('keeps Tab inside the sheet', () => {
    const { opener, confirm, back } = mountSheet();
    api().initSheets();
    opener.click();
    back.focus();
    key(back, 'Tab');
    expect(document.activeElement).toBe(confirm);
    key(confirm, 'Tab', true);
    expect(document.activeElement).toBe(back);
  });

  it('initialises once and ignores openers pointing to a missing sheet', () => {
    const { opener, scrim } = mountSheet();
    const onOpen = vi.fn();
    scrim.addEventListener('kds:sheet-open', onOpen);
    api().initSheets();
    api().initSheets();
    opener.click();
    expect(onOpen).toHaveBeenCalledTimes(1);

    const stray = document.createElement('button');
    stray.setAttribute('data-open-sheet', 'nope');
    document.body.appendChild(stray);
    api().initSheets();
    expect(() => stray.click()).not.toThrow();
  });

  it('only opens bottom sheets: the id of another element is ignored', () => {
    const { opener } = mountSheet();
    opener.setAttribute('data-open-sheet', 'opener');
    api().initSheets();
    expect(() => opener.click()).not.toThrow();
    expect(opener.hidden).toBe(false);
  });

  it('exposes openSheet / closeSheet', () => {
    const { scrim } = mountSheet();
    api().openSheet('confirm-sheet');
    expect(scrim.hidden).toBe(false);
    api().closeSheet('confirm-sheet');
    expect(scrim.hidden).toBe(true);
  });
});
