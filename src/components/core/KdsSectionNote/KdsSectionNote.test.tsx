/**
 * KdsSectionNote - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsSectionNote } from './KdsSectionNote';

describe('KdsSectionNote', () => {
  it('renders section note with text', () => {
    render(<KdsSectionNote>Important note</KdsSectionNote>);
    expect(screen.getByText('Important note')).toBeInTheDocument();
  });

  it('renders with default info icon', () => {
    render(<KdsSectionNote>Note</KdsSectionNote>);
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(<KdsSectionNote icon="warning">Warning note</KdsSectionNote>);
    expect(screen.getByText('warning')).toBeInTheDocument();
  });
});
