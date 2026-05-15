export interface BountyPromotion {
  id: string;
  title: string;
  subtitle: string;
  points: string[];
  cta: string;
  url: string;
  icon: string;
  benefit: string;
  imageUrl?: string;
}

export const bountyPromotions: BountyPromotion[] = [
  {
    id: 'amazon-prime',
    title: 'Amazon Prime',
    subtitle: 'Free 30-Day Trial',
    points: [
      'Unlimited fast, free shipping on millions of items',
      'Access thousands of popular movies and TV shows',
      'Ad-free music and exclusive deals',
      'Unlimited photo storage'
    ],
    cta: 'Start Free Trial',
    url: 'https://amzn.to/prime-trial',
    icon: 'Zap',
    benefit: 'Fast & Free Shipping',
    imageUrl: 'https://m.media-amazon.com/images/I/51IiESUZAaL.png'
  },
  {
    id: 'audible',
    title: 'Audible Plus',
    subtitle: 'Free Audiobook Trial',
    points: [
      'Listen to thousands of audiobooks and podcasts',
      '1 credit per month for any title (yours to keep)',
      'Unlimited access to the Plus Catalog',
      'Audible Originals and exclusive content'
    ],
    cta: 'Claim Free Book',
    url: 'https://amzn.to/audible-trial',
    icon: 'Headphones',
    benefit: '2 Free Audiobooks',
    imageUrl: 'https://m.media-amazon.com/images/G/01/Audible/en_US/images/creative/test/audible_logo_subnav_427x100._CB451112634_.jpg'
  },
  {
    id: 'kindle-unlimited',
    title: 'Kindle Unlimited',
    subtitle: 'Read for Free',
    points: [
      'Over 4 million digital books and audiobooks',
      'Thousands of current magazines',
      'Discover bestsellers and indie gems',
      'Read on any device with the Kindle app'
    ],
    cta: 'Get Started',
    url: 'https://amzn.to/kindle-unlimited',
    icon: 'BookOpen',
    benefit: 'Unlimited Reading',
    imageUrl: 'https://m.media-amazon.com/images/G/01/kindle/ku/ku-logo-orange-white._CB485932490_.png'
  },
  {
    id: 'prime-video',
    title: 'Prime Video',
    subtitle: 'Stream Anywhere',
    points: [
      'Award-winning Amazon Originals',
      'Latest movies and TV shows',
      'Watch on TV, laptop, phone, or tablet',
      'Download and watch offline'
    ],
    cta: 'Watch Now',
    url: 'https://amzn.to/prime-video',
    icon: 'PlayCircle',
    benefit: 'Award-Winning Originals',
    imageUrl: 'https://m.media-amazon.com/images/I/417jywf7ZAL.png'
  }
];
