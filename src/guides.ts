import { GENERATED_GUIDES } from './generated/guides.generated';
import type { Post } from './types';

export const posts: Post[] = GENERATED_GUIDES;

export function guidePath(slug: string) {
  return `/guides/${slug}`;
}

export function categoryPath(category: string) {
  return `/category/${encodeURIComponent(category)}`;
}

export function getGuide(slug: string) {
  return posts.find((post) => post.id === slug);
}
