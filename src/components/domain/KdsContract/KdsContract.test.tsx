import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { KdsContract } from './KdsContract';

// jsdom has no layout: give .kds-contract-content a fixed scroll geometry.
let scrollTop = 0;
let scrollHeight = 1000;

function mockGeometry() {
  const isContent = (el: Element) => el.classList.contains('kds-contract-content');
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return isContent(this) ? scrollHeight : 0;
  });
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return isContent(this) ? 200 : 0;
  });
  vi.spyOn(HTMLElement.prototype, 'scrollTop', 'get').mockImplementation(function (this: HTMLElement) {
    return isContent(this) ? scrollTop : 0;
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  scrollTop = 0;
  scrollHeight = 1000;
});

const scrollTo = (top: number) => {
  scrollTop = top;
  fireEvent.scroll(screen.getByRole('region', { name: 'Contrato' }));
};

describe('KdsContract', () => {
  it('renders the content as a focusable labelled region and the read-to-accept checkbox', () => {
    mockGeometry();
    const { container } = render(<KdsContract>Mandato…</KdsContract>);
    expect(container.firstElementChild).toHaveClass('kds-contract');
    const region = screen.getByRole('region', { name: 'Contrato' });
    expect(region).toHaveClass('kds-contract-content');
    expect(region).toHaveAttribute('tabindex', '0');
    const checkbox = screen.getByRole('checkbox', { name: 'Declaro que leí y acepto el contrato' });
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAccessibleDescription(
      'Desplázate hasta el final del contrato para poder aceptarlo.',
    );
  });

  it('enables the checkbox and calls onReadComplete once the end is reached', () => {
    mockGeometry();
    const onReadComplete = vi.fn();
    const { container } = render(<KdsContract onReadComplete={onReadComplete}>Mandato…</KdsContract>);
    scrollTo(500);
    expect(screen.getByRole('checkbox')).toBeDisabled();
    scrollTo(800);
    expect(screen.getByRole('checkbox')).toBeEnabled();
    expect(container.firstElementChild).toHaveClass('kds-contract--read');
    expect(screen.queryByText(/Desplázate/)).toBeNull();
    scrollTo(800);
    expect(onReadComplete).toHaveBeenCalledTimes(1);
  });

  it('does not treat a hidden (unlaid-out) contract as read', () => {
    scrollHeight = 0;
    mockGeometry();
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 0);
    render(<KdsContract>Mandato…</KdsContract>);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('enables the checkbox right away when the content fits', () => {
    scrollHeight = 150;
    mockGeometry();
    render(<KdsContract>Corto</KdsContract>);
    expect(screen.getByRole('checkbox')).toBeEnabled();
  });

  it('reports acceptance changes and reflects the accepted prop', () => {
    scrollHeight = 150;
    mockGeometry();
    const onAcceptedChange = vi.fn();
    const { rerender } = render(
      <KdsContract name="acepta" accepted={false} onAcceptedChange={onAcceptedChange}>
        Corto
      </KdsContract>,
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onAcceptedChange).toHaveBeenCalledWith(true);
    rerender(
      <KdsContract name="acepta" accepted onAcceptedChange={onAcceptedChange}>
        Corto
      </KdsContract>,
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect((screen.getByRole('checkbox') as HTMLInputElement).name).toBe('acepta');
  });

  it('accepts custom labels for i18n', () => {
    mockGeometry();
    render(
      <KdsContract contentLabel="Contract" acceptLabel="I accept" hint="Scroll to the end.">
        …
      </KdsContract>,
    );
    expect(screen.getByRole('region', { name: 'Contract' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'I accept' })).toHaveAccessibleDescription(
      'Scroll to the end.',
    );
  });
});
