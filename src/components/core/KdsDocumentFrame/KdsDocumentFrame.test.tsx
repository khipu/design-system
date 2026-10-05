import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KdsDocumentFrame } from './KdsDocumentFrame';

describe('KdsDocumentFrame', () => {
  it('renders the document in an iframe with its accessible title', () => {
    const { container, getByTitle } = render(
      <KdsDocumentFrame src="https://example.com/terms" title="Términos y condiciones" />,
    );
    expect(container.firstChild).toHaveClass('kds-document-frame');
    expect(getByTitle('Términos y condiciones')).toHaveAttribute('src', 'https://example.com/terms');
  });

  it('defaults the scale to 1', () => {
    const { container } = render(<KdsDocumentFrame src="/doc" title="Doc" />);
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.getPropertyValue('--kds-document-frame-scale')).toBe('1');
  });

  it('exposes the scale as a CSS variable', () => {
    const { container } = render(<KdsDocumentFrame src="/doc" title="Doc" scale={0.6} />);
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.getPropertyValue('--kds-document-frame-scale')).toBe('0.6');
  });

  it('merges className and style', () => {
    const { container } = render(
      <KdsDocumentFrame src="/doc" title="Doc" className="extra" style={{ minHeight: '10rem' }} />,
    );
    const frame = container.firstChild as HTMLElement;
    expect(frame).toHaveClass('kds-document-frame', 'extra');
    expect(frame.style.minHeight).toBe('10rem');
  });
});
