/**
 * KdsRadioGroup - Test Suite
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsRadioGroup } from './KdsRadioGroup';

describe('KdsRadioGroup', () => {
  it('renders radio group with options', () => {
    render(
      <KdsRadioGroup
        label="Account Type"
        name="account"
        options={[
          { value: 'checking', label: 'Checking' },
          { value: 'savings', label: 'Savings' },
        ]}
      />
    );
    expect(screen.getByText('Account Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Checking')).toBeInTheDocument();
    expect(screen.getByLabelText('Savings')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <KdsRadioGroup
        name="test"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
        onChange={handleChange}
      />
    );
    await user.click(screen.getByLabelText('Option A'));
    expect(handleChange).toHaveBeenCalledWith('a');
  });
});
