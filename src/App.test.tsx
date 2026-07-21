import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from '@shared/i18n';
import { createLocalStorage, createMatchMedia } from './test/test-helpers';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorage());
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => createMatchMedia(false)),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders and shows controls bar with locale toggle', () => {
    render(
      <I18nProvider>
        <App />
      </I18nProvider>,
    );

    expect(screen.getByText('🇬🇧 EN')).toBeInTheDocument();
  });
});
