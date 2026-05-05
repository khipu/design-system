/**
 * KdsLogoHeader - Test Suite
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  KdsLogoHeader,
  KdsLogoHeaderLogo,
  KdsLogoHeaderSeparator,
  KdsLogoHeaderCode,
  KdsLogoHeaderCloseButton,
} from './KdsLogoHeader';

describe('KdsLogoHeader', () => {
  it('renders header with all sub-components', () => {
    render(
      <KdsLogoHeader>
        <KdsLogoHeaderLogo />
        <KdsLogoHeaderSeparator />
        <KdsLogoHeaderCode>ABC-123</KdsLogoHeaderCode>
        <KdsLogoHeaderCloseButton onClose={() => {}} />
      </KdsLogoHeader>
    );
    expect(screen.getByText('ABC-123')).toBeInTheDocument();
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <KdsLogoHeader>
        <KdsLogoHeaderCloseButton onClose={onClose} />
      </KdsLogoHeader>
    );
    const closeBtn = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
