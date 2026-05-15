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

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  headerImage: string;
  recommendedProducts: Product[];
}
