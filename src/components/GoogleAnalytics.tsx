import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GOOGLE_ANALYTICS_ID } from '../generated/site-settings.generated';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID_RE = /^G-[A-Z0-9]+$/i;

function getMeasurementId() {
  const id = GOOGLE_ANALYTICS_ID.trim();
  return GA_ID_RE.test(id) ? id : '';
}

function loadGoogleAnalytics(measurementId: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag() {
    window.dataLayer?.push(arguments);
  };

  if (!document.querySelector(`script[data-google-analytics="${measurementId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.googleAnalytics = measurementId;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
}

export function GoogleAnalytics() {
  const location = useLocation();
  const initializedId = useRef('');
  const measurementId = getMeasurementId();

  useEffect(() => {
    if (!measurementId) return;
    if (initializedId.current !== measurementId) {
      loadGoogleAnalytics(measurementId);
      initializedId.current = measurementId;
    }

    window.gtag?.('event', 'page_view', {
      page_path: `${location.pathname}${location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search, measurementId]);

  return null;
}
