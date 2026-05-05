import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsTypography } from './KdsTypography';

describe('KdsTypography', () => {
  it('renders body variant by default as <p>', () => {
    render(<KdsTypography>Text</KdsTypography>);
    const el = screen.getByText('Text');
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass('kds-text-body');
  });

  it('renders display1 as <h1>', () => {
    render(<KdsTypography variant="display1">Title</KdsTypography>);
    const el = screen.getByText('Title');
    expect(el.tagName).toBe('H1');
    expect(el).toHaveClass('kds-text-display1');
  });

  it('renders heading2 as <h2>', () => {
    render(<KdsTypography variant="heading2">Sub</KdsTypography>);
    expect(screen.getByText('Sub').tagName).toBe('H2');
  });

  it('renders label as <span>', () => {
    render(<KdsTypography variant="label">Label</KdsTypography>);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });

  it('allows overriding the HTML element via as prop', () => {
    render(<KdsTypography variant="heading1" as="div">Div</KdsTypography>);
    expect(screen.getByText('Div').tagName).toBe('DIV');
  });

  it('applies muted color', () => {
    render(<KdsTypography color="muted">Gray</KdsTypography>);
    expect(screen.getByText('Gray')).toHaveClass('kds-text-muted');
  });

  it('merges custom className', () => {
    render(<KdsTypography className="custom">T</KdsTypography>);
    expect(screen.getByText('T')).toHaveClass('kds-text-body', 'custom');
  });
});
