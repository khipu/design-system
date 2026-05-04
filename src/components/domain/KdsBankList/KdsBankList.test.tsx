import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsBankList } from './KdsBankList';

describe('KdsBankList', () => {
  it('renders with role="list" and kds-bank-list class', () => {
    render(<KdsBankList data-testid="list" />);
    const list = screen.getByTestId('list');
    expect(list).toHaveAttribute('role', 'list');
    expect(list).toHaveClass('kds-bank-list');
  });

  it('renders children', () => {
    render(
      <KdsBankList>
        <div>Bank A</div>
        <div>Bank B</div>
      </KdsBankList>,
    );
    expect(screen.getByText('Bank A')).toBeInTheDocument();
    expect(screen.getByText('Bank B')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<KdsBankList data-testid="list" className="custom" />);
    expect(screen.getByTestId('list')).toHaveClass('kds-bank-list', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KdsBankList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
