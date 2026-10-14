import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KdsCardSelector, KdsCardSelectorGroup } from './KdsCardSelector';

describe('KdsCardSelector', () => {
  it('renders title with kds-card-selector class', () => {
    render(<KdsCardSelector title="Transferencia" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-card-selector');
    expect(screen.getByText('Transferencia')).toHaveClass('kds-card-selector-title');
  });

  it('applies selected class', () => {
    render(<KdsCardSelector title="Tarjeta" selected />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('kds-card-selector', 'selected');
  });

  it('renders icon wrapped in kds-card-selector-icon', () => {
    render(<KdsCardSelector title="QR" icon="qr_code" />);
    const iconWrapper = screen.getByText('qr_code').parentElement;
    expect(iconWrapper).toHaveClass('kds-card-selector-icon');
    expect(screen.getByText('qr_code')).toHaveClass('material-symbols-outlined');
  });

  it('renders description when provided', () => {
    render(<KdsCardSelector title="QR" description="Escanea el codigo" />);
    expect(screen.getByText('Escanea el codigo')).toHaveClass('kds-card-selector-description');
  });

  it('does not render description when omitted', () => {
    const { container } = render(<KdsCardSelector title="QR" />);
    expect(container.querySelector('.kds-card-selector-description')).toBeNull();
  });

  it('does not render icon when omitted', () => {
    const { container } = render(<KdsCardSelector title="QR" />);
    expect(container.querySelector('.kds-card-selector-icon')).toBeNull();
  });

  it('fires onClick handler', async () => {
    const onClick = vi.fn();
    render(<KdsCardSelector title="Click" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom className', () => {
    render(<KdsCardSelector title="Test" className="custom" />);
    expect(screen.getByRole('button')).toHaveClass('kds-card-selector', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<KdsCardSelector ref={ref} title="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders children as inline details inside the button', () => {
    render(
      <KdsCardSelector title="QR">
        <strong>Nuevo</strong>
      </KdsCardSelector>,
    );
    const details = screen.getByText('Nuevo').parentElement!;
    expect(details).toHaveClass('kds-card-selector-details');
    expect(details.tagName).toBe('SPAN');
  });

  it('without `radio`, name and value stay on the button (e.g. a submit button)', () => {
    render(<KdsCardSelector type="submit" name="flow" value="legal" title="Persona jurídica" />);
    const btn = screen.getByRole('button', { name: /Persona jurídica/ });
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveAttribute('name', 'flow');
    expect(btn).toHaveAttribute('value', 'legal');
    expect(screen.queryByRole('radio')).toBeNull();
  });

  it('hides the decorative icon from assistive tech', () => {
    render(<KdsCardSelector title="QR" icon="qr_code" />);
    expect(screen.getByRole('button', { name: 'QR' })).toBeInTheDocument();
    expect(screen.getByText('qr_code').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  describe('radio option (radio + name + value)', () => {
    const renderPair = (onCheckedChange = vi.fn()) =>
      render(
        <KdsCardSelectorGroup label="Tipo de contribuyente">
          <KdsCardSelector
            radio
            name="tipo"
            value="juridica"
            icon="business"
            title="Persona jurídica"
            description="Empresas constituidas legalmente."
            onCheckedChange={onCheckedChange}
          >
            <ul>
              <li>Acceso a la banca en línea empresas.</li>
            </ul>
          </KdsCardSelector>
          <KdsCardSelector
            radio
            name="tipo"
            value="natural"
            icon="person"
            title="Persona natural"
            onCheckedChange={onCheckedChange}
          />
        </KdsCardSelectorGroup>,
      );

    it('renders a native radio labelled by the title, described by the description', () => {
      renderPair();
      const radio = screen.getByRole('radio', { name: 'Persona jurídica' }) as HTMLInputElement;
      expect(radio).toHaveClass('kds-card-selector-radio');
      expect(radio.name).toBe('tipo');
      expect(radio.value).toBe('juridica');
      expect(radio).toHaveAccessibleDescription('Empresas constituidas legalmente.');
      expect(screen.queryByRole('button')).toBeNull();
    });

    it('wraps the card in a div with the radio modifier and block details', () => {
      renderPair();
      const card = screen.getByRole('radio', { name: 'Persona jurídica' }).closest('.kds-card-selector')!;
      expect(card.tagName).toBe('DIV');
      expect(card).toHaveClass('kds-card-selector--radio');
      const details = screen.getByRole('list').parentElement!;
      expect(details).toHaveClass('kds-card-selector-details');
      expect(details.tagName).toBe('DIV');
    });

    it('calls onCheckedChange with the value and keeps a single selection per name', () => {
      const onCheckedChange = vi.fn();
      renderPair(onCheckedChange);
      fireEvent.click(screen.getByText('Persona jurídica'));
      fireEvent.click(screen.getByText('Persona natural'));
      expect(onCheckedChange).toHaveBeenLastCalledWith('natural');
      expect(screen.getByRole('radio', { name: 'Persona natural' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'Persona jurídica' })).not.toBeChecked();
    });

    it('reflects the checked prop', () => {
      render(<KdsCardSelector radio name="tipo" value="natural" title="Persona natural" checked />);
      expect(screen.getByRole('radio', { name: 'Persona natural' })).toBeChecked();
    });

    it('groups the options in a labelled radiogroup on the 2-column grid', () => {
      renderPair();
      const group = screen.getByRole('radiogroup', { name: 'Tipo de contribuyente' });
      expect(group).toHaveClass('kds-card-selector-group');
    });
  });
});
