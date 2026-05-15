import { AMAZON_AFFILIATE_ID } from '../generated/site-settings.generated';

const AMAZON_HOST_RE = /(^|\.)amazon\.[a-z.]+$/i;

export function withAmazonAffiliateId(url: string, affiliateId = AMAZON_AFFILIATE_ID) {
  const tag = affiliateId.trim();
  if (!tag) return url;

  try {
    const parsed = new URL(url);
    if (!AMAZON_HOST_RE.test(parsed.hostname)) return url;

    parsed.searchParams.set('tag', tag);
    return parsed.toString();
  } catch {
    return url;
  }
}
