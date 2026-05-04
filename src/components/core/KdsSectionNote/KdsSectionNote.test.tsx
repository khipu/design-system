/**
 * KdsSectionNote - Test Suite
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsSectionNote } from './KdsSectionNote';

describe('KdsSectionNote', () => {
  it('renders note with default icon', () => {
    render(<KdsSectionNote>This is a note</KdsSectionNote>);
    expect(screen.getByText('This is a note')).toBeInTheDocument();
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('renders note with custom icon', () => {
    render(<KdsSectionNote icon="warning">Warning note</KdsSectionNote>);
    expect(screen.getByText('Warning note')).toBeInTheDocument();
    expect(screen.getByText('warning')).toBeInTheDocument();
  });
});
