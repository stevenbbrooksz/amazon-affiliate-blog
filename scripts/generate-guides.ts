import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { PostDetailData, PostIndex, Product } from '../src/types';

type Frontmatter = Record<string, string | Record<string, string>[]>;

const contentDir = path.resolve('content/guides');
const indexOutputPath = path.resolve('src/generated/guides.index.generated.ts');
const detailOutputDir = path.resolve('public/guides-data');

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

function splitKeyValue(line: string) {
  const separatorIndex = line.indexOf(':');
  if (separatorIndex === -1) return null;
  return {
    key: line.slice(0, separatorIndex).trim(),
    value: stripQuotes(line.slice(separatorIndex + 1)),
  };
}

function parseFrontmatter(frontmatter: string): Frontmatter {
  const lines = frontmatter.split(/\r?\n/);
  const data: Frontmatter = {};
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const entry = splitKeyValue(line);
    if (!entry) {
      index += 1;
      continue;
    }

    if (entry.value) {
      data[entry.key] = entry.value;
      index += 1;
      continue;
    }

    const list: Record<string, string>[] = [];
    index += 1;

    while (index < lines.length) {
      const listLine = lines[index];
      if (!listLine.startsWith('  - ')) break;

      const item: Record<string, string> = {};
      const firstEntry = splitKeyValue(listLine.slice(4));
      if (firstEntry) item[firstEntry.key] = firstEntry.value;
      index += 1;

      while (index < lines.length && lines[index].startsWith('    ')) {
        const nestedEntry = splitKeyValue(lines[index].trim());
        if (nestedEntry) item[nestedEntry.key] = nestedEntry.value;
        index += 1;
      }

      list.push(item);
    }

    data[entry.key] = list;
  }

  return data;
}

function requireString(data: Frontmatter, key: string, filePath: string) {
  const value = data[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${filePath} is missing required frontmatter field: ${key}`);
  }
  return value;
}

function optionalString(data: Frontmatter, key: string) {
  const value = data[key];
  return typeof value === 'string' ? value : '';
}

function optionalList(data: Frontmatter, key: string) {
  const value = data[key];
  return Array.isArray(value) ? value : [];
}

function parsePublishTime(data: Frontmatter, filePath: string) {
  const publishAt = optionalString(data, 'publishAt').trim();
  const scheduledValue = publishAt || requireString(data, 'date', filePath);
  const timestamp = Date.parse(scheduledValue);

  if (Number.isNaN(timestamp)) {
    throw new Error(`${filePath} has an invalid publishAt/date value: ${scheduledValue}`);
  }

  return timestamp;
}

async function readGuide(filePath: string): Promise<{ guide: PostDetailData; order: number; publishTime: number; faqs: { question: string; answer: string }[] }> {
  const raw = await readFile(filePath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filePath} must start with frontmatter delimited by ---`);
  }

  const data = parseFrontmatter(match[1]);
  const slug = requireString(data, 'slug', filePath);
  const order = Number.parseInt(optionalString(data, 'order') || '999', 10);

  const products: Product[] = optionalList(data, 'recommendedProducts').map((item) => ({
    id: item.id ?? '',
    name: item.name ?? '',
    description: item.description ?? '',
    price: item.price ?? '',
    rating: Number.parseFloat(item.rating ?? '0') || 0,
    imageUrl: item.imageUrl ?? '',
    affiliateUrl: item.affiliateUrl ?? '',
    category: item.category ?? '',
  }));

  const faqs = optionalList(data, 'faqs').map((item) => ({
    question: item.question ?? '',
    answer: item.answer ?? '',
  }));

  return {
    guide: {
      id: slug,
      title: requireString(data, 'title', filePath),
      excerpt: requireString(data, 'excerpt', filePath),
      content: match[2].trim(),
      date: requireString(data, 'date', filePath),
      author: requireString(data, 'author', filePath),
      category: requireString(data, 'category', filePath),
      headerImage: requireString(data, 'headerImage', filePath),
      recommendedProducts: products,
    },
    order: Number.isFinite(order) ? order : 999,
    publishTime: parsePublishTime(data, filePath),
    faqs,
  };
}

async function generate() {
  const files = (await readdir(contentDir)).filter((file) => file.endsWith('.md')).sort();
  const guidesWithOrder = await Promise.all(files.map((file) => readGuide(path.join(contentDir, file))));
  const now = Date.now();
  const publishedGuidesWithOrder = guidesWithOrder.filter(({ publishTime }) => publishTime <= now);
  const guides = publishedGuidesWithOrder
    .sort((a, b) => a.order - b.order || a.guide.title.localeCompare(b.guide.title))
    .map(({ guide }) => guide);

  const guideIndex: PostIndex[] = guides.map(({ content: _content, recommendedProducts: _products, ...index }) => index);

  const faqByGuideSlug = Object.fromEntries(
    publishedGuidesWithOrder.map(({ guide, faqs }) => [guide.id, faqs]),
  );

  await mkdir(path.dirname(indexOutputPath), { recursive: true });
  await rm(detailOutputDir, { recursive: true, force: true });
  await mkdir(detailOutputDir, { recursive: true });

  await Promise.all(
    guides.map((guide) =>
      writeFile(
        path.join(detailOutputDir, `${guide.id}.json`),
        `${JSON.stringify(guide, null, 2)}\n`,
      ),
    ),
  );

  await writeFile(
    indexOutputPath,
    [
      "import type { PostIndex } from '../types';",
      '',
      '/* This file is generated from content/guides/*.md. Do not edit it directly. */',
      `export const GENERATED_GUIDE_INDEX: PostIndex[] = ${JSON.stringify(guideIndex, null, 2)};`,
      `export const GENERATED_GUIDE_FAQS: Record<string, { question: string; answer: string }[]> = ${JSON.stringify(faqByGuideSlug, null, 2)};`,
      '',
    ].join('\n'),
  );

  const skippedCount = guidesWithOrder.length - publishedGuidesWithOrder.length;
  console.log(`Generated ${guides.length} guides${skippedCount ? `; skipped ${skippedCount} scheduled guides.` : '.'}`);
}

await generate();
