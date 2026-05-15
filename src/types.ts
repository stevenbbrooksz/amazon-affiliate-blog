export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  imageUrl: string;
  affiliateUrl: string;
  category: string;
}

export interface PostIndex {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  headerImage: string;
}

export interface PostDetailData extends PostIndex {
  content: string;
  recommendedProducts: Product[];
}

export type Post = PostDetailData;
