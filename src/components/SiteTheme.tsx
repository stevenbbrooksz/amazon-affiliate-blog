import { useEffect } from 'react';
import { SITE_SETTINGS } from '../generated/site-settings.generated';

export function buildThemeCss() {
  return [
    `--color-orange-50: ${SITE_SETTINGS.accent50};`,
    `--color-orange-100: ${SITE_SETTINGS.accent100};`,
    `--color-orange-200: ${SITE_SETTINGS.accent200};`,
    `--color-orange-400: ${SITE_SETTINGS.accent400};`,
    `--color-orange-500: ${SITE_SETTINGS.accent500};`,
    `--color-orange-600: ${SITE_SETTINGS.accent600};`,
    `--color-orange-700: ${SITE_SETTINGS.accent700};`,
    `--site-surface: ${SITE_SETTINGS.surfaceColor};`,
    `--site-ink: ${SITE_SETTINGS.inkColor};`,
    `--site-dark: ${SITE_SETTINGS.darkColor};`,
    `--site-font: ${SITE_SETTINGS.fontFamily};`,
    `--color-gray-900: ${SITE_SETTINGS.darkColor};`,
    `--color-gray-950: ${SITE_SETTINGS.darkColor};`,
  ].join(' ');
}

export function SiteTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('style', `${root.getAttribute('style') || ''} ${buildThemeCss()}`);
  }, []);

  return null;
}
