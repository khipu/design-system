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
