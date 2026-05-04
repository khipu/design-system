import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KdsAccordion, KdsAccordionSummary, KdsAccordionDetails } from './KdsAccordion';

describe('KdsAccordion', () => {
  it('renders details element with kds-accordion class', () => {
    const { container } = render(
      <KdsAccordion>
        <KdsAccordionSummary>Title</KdsAccordionSummary>
        <KdsAccordionDetails>Content</KdsAccordionDetails>
      </KdsAccordion>
    );
    expect(container.querySelector('details')).toHaveClass('kds-accordion');
  });

  it('renders summary with expand icon', () => {
    render(
      <KdsAccordion>
        <KdsAccordionSummary>Title</KdsAccordionSummary>
        <KdsAccordionDetails>Content</KdsAccordionDetails>
      </KdsAccordion>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('expand_more')).toBeInTheDocument();
  });

  it('renders details content', () => {
    render(
      <KdsAccordion>
        <KdsAccordionSummary>Title</KdsAccordionSummary>
        <KdsAccordionDetails>Content here</KdsAccordionDetails>
      </KdsAccordion>
    );
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('forwards className', () => {
    const { container } = render(
      <KdsAccordion className="custom">
        <KdsAccordionSummary>Title</KdsAccordionSummary>
      </KdsAccordion>
    );
    expect(container.querySelector('details')).toHaveClass('kds-accordion', 'custom');
  });
});
