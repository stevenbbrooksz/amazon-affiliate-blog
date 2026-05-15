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

async function generate() {
  const data = parseFrontmatter(await readFile(settingsPath, 'utf8'));
  const amazonAffiliateId = data.amazonAffiliateId?.trim() ?? '';

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    [
      '/* This file is generated from content/settings/affiliate.md. Do not edit it directly. */',
      `export const AMAZON_AFFILIATE_ID = ${JSON.stringify(amazonAffiliateId)};`,
      '',
    ].join('\n'),
  );

  console.log('Generated site settings.');
}

await generate();
