import { GENERATED_GUIDE_INDEX } from './generated/guides.index.generated';
import type { PostIndex } from './types';

export const posts: PostIndex[] = GENERATED_GUIDE_INDEX;

export function guidePath(slug: string) {
  return `/guides/${slug}`;
}

export function categoryPath(category: string) {
  return `/category/${encodeURIComponent(category)}`;
}

export function getGuide(slug: string) {
  return posts.find((post) => post.id === slug);
}
