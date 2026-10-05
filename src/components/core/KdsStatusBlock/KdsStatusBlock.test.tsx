/**
 * KdsStatusBlock - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsStatusBlock } from './KdsStatusBlock';

describe('KdsStatusBlock', () => {
  it('renders status block with title', () => {
    render(<KdsStatusBlock status="success" title="Payment successful" />);
    expect(screen.getByText('Payment successful')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <KdsStatusBlock 
        status="success" 
        title="Done" 
        description="Transaction completed" 
      />
    );
    expect(screen.getByText('Transaction completed')).toBeInTheDocument();
  });

  it('keeps the description in the title column when not inline', () => {
    const { container } = render(<KdsStatusBlock status="success" title="Done" description="Detail" />);
    const block = container.firstElementChild as HTMLElement;
    const description = screen.getByText('Detail');
    expect(description.parentElement).not.toBe(block);
    expect(block).not.toHaveClass('kds-status-block--described');
  });

  it('inline: renders the description below the icon+title row, as a direct child', () => {
    const { container } = render(<KdsStatusBlock status="warn" title="Done" description="Detail" inline />);
    const block = container.firstElementChild as HTMLElement;
    const description = screen.getByText('Detail');
    expect(block).toHaveClass('kds-status-block', 'inline', 'kds-status-block--described');
    expect(description).toHaveClass('kds-status-block-description');
    expect(description.parentElement).toBe(block);
    expect(block.lastElementChild).toBe(description);
  });

  it('inline without description: no modifier and the title is the last child of its column', () => {
    const { container } = render(<KdsStatusBlock status="warn" title="Done" inline />);
    const block = container.firstElementChild as HTMLElement;
    expect(block).not.toHaveClass('kds-status-block--described');
    expect(screen.getByText('Done').nextElementSibling).toBeNull();
  });

  it('renders a ReactNode description with inline emphasis', () => {
    render(
      <KdsStatusBlock
        status="success"
        title="Done"
        description={<><strong>Tu pago ya está en proceso</strong> Te avisaremos por correo.</>}
      />
    );
    const strong = screen.getByText('Tu pago ya está en proceso');
    expect(strong.tagName).toBe('STRONG');
    expect(screen.getByText(/Te avisaremos por correo\./)).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(
      <KdsStatusBlock 
        status="success" 
        title="Done" 
        icon="check_circle" 
      />
    );
    expect(screen.getByText('check_circle')).toBeInTheDocument();
  });
});
