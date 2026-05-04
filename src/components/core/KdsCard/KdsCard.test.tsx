import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsCard, KdsCardHeader, KdsCardBody, KdsCardFooter } from './KdsCard';

describe('KdsCard', () => {
  it('renders as article with kds-card-elevated', () => {
    render(<KdsCard>Content</KdsCard>);
    const card = screen.getByText('Content').closest('article');
    expect(card).toHaveClass('kds-card-elevated');
  });

  it('applies outlined variant', () => {
    render(<KdsCard variant="outlined">Content</KdsCard>);
    expect(screen.getByText('Content').closest('article')).toHaveClass('kds-card-outlined');
  });

  it('applies dimmed class', () => {
    render(<KdsCard dimmed>Content</KdsCard>);
    expect(screen.getByText('Content').closest('article')).toHaveClass('kds-card-dimmed');
  });

  it('renders clickable card as button', async () => {
    const onClick = vi.fn();
    render(<KdsCard onClick={onClick}>Click me</KdsCard>);
    await userEvent.click(screen.getByText('Click me').closest('article')!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('KdsCardHeader', () => {
  it('renders with kds-card-header class', () => {
    render(<KdsCardHeader>Header</KdsCardHeader>);
    expect(screen.getByText('Header')).toHaveClass('kds-card-header');
  });
});

describe('KdsCardBody', () => {
  it('renders with kds-card-body class', () => {
    render(<KdsCardBody>Body</KdsCardBody>);
    expect(screen.getByText('Body')).toHaveClass('kds-card-body');
  });
});

describe('KdsCardFooter', () => {
  it('renders with kds-card-footer class', () => {
    render(<KdsCardFooter>Footer</KdsCardFooter>);
    expect(screen.getByText('Footer')).toHaveClass('kds-card-footer');
  });
});
