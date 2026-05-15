import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppContent } from '../src/App.tsx';
import { canonicalUrl, SEO_ROUTES, SITE_NAME, SITE_URL, type SeoRoute } from '../src/seo.ts';
import { posts, guidePath } from '../src/guides.ts';
import { GENERATED_GUIDE_FAQS } from '../src/generated/guides.generated.ts';
import { withAmazonAffiliateId } from '../src/lib/amazonAffiliate.ts';

const distDir = path.resolve('dist');
const templatePath = path.join(distDir, 'index.html');

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const escapeJsonForScript = (value: unknown) => JSON.stringify(value, null, 2).replaceAll('<', '\\u003c');

function renderSeoTags(route: SeoRoute) {
  const canonical = canonicalUrl(route.path);
  const jsonLd = buildStructuredData(route);

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    '<meta name="robots" content="index,follow" />',
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.svg" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${SITE_URL}/og-image.svg" />`,
    `<script type="application/ld+json" data-seo>${escapeJsonForScript(jsonLd)}</script>`,
  ].map((tag) => `    ${tag}`).join('\n');
}

function buildStructuredData(route: SeoRoute) {
  const canonical = canonicalUrl(route.path);
  const pageId = `${canonical}#webpage`;
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'WebPage',
      '@id': pageId,
      url: canonical,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': websiteId },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems(route).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    },
  ];

  const guide = posts.find((post) => guidePath(post.id) === route.path);
  if (guide) {
    graph.push({
      '@type': 'Article',
      '@id': `${canonical}#article`,
      headline: guide.title,
      description: guide.excerpt,
      image: guide.headerImage,
      author: { '@type': 'Person', name: guide.author },
      publisher: { '@id': organizationId },
      mainEntityOfPage: { '@id': pageId },
      datePublished: guide.date,
      dateModified: guide.date,
    });

    if (guide.recommendedProducts.length) {
      graph.push({
        '@type': 'ItemList',
        '@id': `${canonical}#recommended-products`,
        name: `${guide.title} recommended products`,
        itemListElement: guide.recommendedProducts.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.imageUrl,
            offers: {
              '@type': 'Offer',
              price: product.price.replace(/[^0-9.]/g, ''),
              priceCurrency: product.price.includes('$') ? 'USD' : undefined,
              url: withAmazonAffiliateId(product.affiliateUrl),
            },
            aggregateRating: product.rating
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: product.rating,
                  reviewCount: 1,
                }
              : undefined,
          },
        })),
      });
    }

    const faqs = GENERATED_GUIDE_FAQS[guide.id];
    if (faqs?.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      });
    }
  }

  if (route.path === '/') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${canonical}#guide-list`,
      name: 'Amazon affiliate buying guides',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          url: `${SITE_URL}${guidePath(post.id)}`,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function breadcrumbItems(route: SeoRoute) {
  const guide = posts.find((post) => guidePath(post.id) === route.path);
  if (guide) {
    return [
      { name: SITE_NAME, url: `${SITE_URL}/` },
      { name: guide.category, url: `${SITE_URL}/category/${encodeURIComponent(guide.category)}` },
      { name: guide.title, url: canonicalUrl(route.path) },
    ];
  }

  return [
    { name: SITE_NAME, url: `${SITE_URL}/` },
    { name: route.title.replace(` - ${SITE_NAME}`, ''), url: canonicalUrl(route.path) },
  ];
}

function stripDefaultSeo(html: string) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="description"[^>]*\/?>/g, '')
    .replace(/\s*<meta name="robots"[^>]*\/?>/g, '')
    .replace(/\s*<link rel="canonical"[^>]*\/?>/g, '')
    .replace(/\s*<meta property="og:[^"]+"[^>]*\/?>/g, '')
    .replace(/\s*<meta name="twitter:[^"]+"[^>]*\/?>/g, '')
    .replace(/\s*<script type="application\/ld\+json" data-seo>[\s\S]*?<\/script>/g, '');
}

function renderHtml(template: string, route: SeoRoute) {
  const appHtml = renderToString(
    <StaticRouter location={route.path}>
      <AppContent />
    </StaticRouter>,
  );

  return stripDefaultSeo(template)
    .replace('</head>', `${renderSeoTags(route)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

async function writeRouteHtml(template: string, route: SeoRoute) {
  const html = renderHtml(template, route);
  const outputPath =
    route.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.path.replace(/^\/|\/$/g, ''), 'index.html');

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

async function writeSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = SEO_ROUTES.map((route) =>
    [
      '  <url>',
      `    <loc>${canonicalUrl(route.path)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      route.path === '/' ? '    <priority>1.0</priority>' : '    <priority>0.8</priority>',
      '  </url>',
    ].join('\n'),
  ).join('\n');

  await writeFile(
    path.join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
}

async function writeRobots() {
  await writeFile(
    path.join(distDir, 'robots.txt'),
    ['User-agent: *', 'Allow: /', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n'),
  );
}

async function write404(template: string) {
  const html = stripDefaultSeo(template)
    .replace(
      '</head>',
      [
        '    <title>Page Not Found - AMZREVIEWS</title>',
        '    <meta name="description" content="The requested AMZREVIEWS page could not be found." />',
        '    <meta name="robots" content="noindex,follow" />',
        `    <link rel="canonical" href="${SITE_URL}/404" />`,
        '  </head>',
      ].join('\n'),
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(
        <StaticRouter location="/404">
          <AppContent />
        </StaticRouter>,
      )}</div>`,
    );

  await writeFile(path.join(distDir, '404.html'), html);
}

async function prerender() {
  const template = await readFile(templatePath, 'utf8');
  await Promise.all(SEO_ROUTES.map((route) => writeRouteHtml(template, route)));
  await writeSitemap();
  await writeRobots();
  await write404(template);
  console.log(`Prerendered ${SEO_ROUTES.length} routes with route-specific SEO metadata.`);
}

await prerender();
