import type { PostDetailData } from './types';

declare global {
  interface Window {
    __GUIDE_DETAILS__?: Record<string, PostDetailData>;
  }
}

let serverGuideDetails: Record<string, PostDetailData> = {};

export function setServerGuideDetails(details: Record<string, PostDetailData>) {
  serverGuideDetails = details;
}

export function getInitialGuideDetail(slug: string) {
  if (typeof window === 'undefined') {
    return serverGuideDetails[slug] ?? null;
  }

  return window.__GUIDE_DETAILS__?.[slug] ?? null;
}

export async function fetchGuideDetail(slug: string) {
  const response = await fetch(`/guides-data/${encodeURIComponent(slug)}.json`);
  if (!response.ok) return null;
  return (await response.json()) as PostDetailData;
}
