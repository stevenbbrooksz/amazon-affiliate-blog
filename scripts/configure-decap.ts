import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const configPath = path.resolve('public/admin/config.yml');

const repo = process.env.DECAP_REPO || 'stevenbbrooksz/amazon-affiliate-blog';
const authBaseUrl = process.env.DECAP_AUTH_BASE_URL || 'https://amazon-affiliate-blog.pages.dev';

const original = await readFile(configPath, 'utf8');

const updated = original
  .replace(/repo:\s*.*/u, `repo: ${repo}`)
  .replace(/base_url:\s*.*/u, `base_url: ${authBaseUrl}`);

if (updated !== original) {
  await writeFile(configPath, updated);
}

console.log(`Configured Decap CMS for ${repo}.`);
