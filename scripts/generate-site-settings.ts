import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const settingsPath = path.resolve('content/settings/affiliate.md');
const outputPath = path.resolve('src/generated/site-settings.generated.ts');

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`${settingsPath} must start with frontmatter delimited by ---`);
  }

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) continue;
    data[line.slice(0, separatorIndex).trim()] = stripQuotes(line.slice(separatorIndex + 1));
  }
  return data;
}

function setting(data: Record<string, string>, key: string, fallback = '') {
  const value = data[key]?.trim();
  return value || fallback;
}

async function generate() {
  const data = parseFrontmatter(await readFile(settingsPath, 'utf8'));
  const settings = {
    siteName: setting(data, 'siteName', 'AMZREVIEWS'),
    siteNamePrefix: setting(data, 'siteNamePrefix', 'AMZ'),
    siteNameAccent: setting(data, 'siteNameAccent', 'REVIEWS'),
    siteUrl: setting(data, 'siteUrl', 'https://amazon-affiliate-blog.pages.dev'),
    defaultSeoTitle: setting(data, 'defaultSeoTitle', 'AMZREVIEWS - Amazon Affiliate Buying Guides'),
    defaultSeoDescription: setting(data, 'defaultSeoDescription', 'Amazon affiliate buying guides, product comparisons, and practical recommendations.'),
    heroEyebrow: setting(data, 'heroEyebrow', 'Featured Guide'),
    heroTitle: setting(data, 'heroTitle', 'Amazon Smart Picks.'),
    heroTitleAccent: setting(data, 'heroTitleAccent', 'Smart Picks.'),
    heroDescription: setting(data, 'heroDescription', 'Practical Amazon buying guides and recommendations.'),
    heroImageUrl: setting(data, 'heroImageUrl', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80'),
    footerDescription: setting(data, 'footerDescription', 'Your trusted source for honest, in-depth reviews and buying guides.'),
    aboutTitle: setting(data, 'aboutTitle', 'About AMZReviews'),
    aboutBody: setting(data, 'aboutBody', 'Welcome to AMZReviews.'),
    aboutCommitmentTitle: setting(data, 'aboutCommitmentTitle', 'Our Commitment'),
    aboutCommitmentBody: setting(data, 'aboutCommitmentBody', 'Transparency is at the heart of everything we do.'),
    contactTitle: setting(data, 'contactTitle', 'Get in Touch'),
    contactDescription: setting(data, 'contactDescription', "Have a question? We'd love to hear from you."),
    primaryCtaLabel: setting(data, 'primaryCtaLabel', 'Best Sellers'),
    primaryCtaUrl: setting(data, 'primaryCtaUrl', 'https://www.amazon.com/Best-Sellers/zgbs'),
    fontFamily: setting(data, 'fontFamily', 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'),
    accent50: setting(data, 'accent50', '#fff7ed'),
    accent100: setting(data, 'accent100', '#ffedd5'),
    accent200: setting(data, 'accent200', '#fed7aa'),
    accent400: setting(data, 'accent400', '#fb923c'),
    accent500: setting(data, 'accent500', '#f97316'),
    accent600: setting(data, 'accent600', '#ea580c'),
    accent700: setting(data, 'accent700', '#c2410c'),
    surfaceColor: setting(data, 'surfaceColor', '#fafafa'),
    inkColor: setting(data, 'inkColor', '#111827'),
    darkColor: setting(data, 'darkColor', '#111827'),
    amazonAffiliateId: setting(data, 'amazonAffiliateId', 'smartymode-20'),
    googleAnalyticsId: setting(data, 'googleAnalyticsId'),
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    [
      '/* This file is generated from content/settings/affiliate.md. Do not edit it directly. */',
      `export const SITE_SETTINGS = ${JSON.stringify(settings, null, 2)} as const;`,
      'export const AMAZON_AFFILIATE_ID = SITE_SETTINGS.amazonAffiliateId;',
      'export const GOOGLE_ANALYTICS_ID = SITE_SETTINGS.googleAnalyticsId;',
      '',
    ].join('\n'),
  );

  console.log('Generated site settings.');
}

await generate();
