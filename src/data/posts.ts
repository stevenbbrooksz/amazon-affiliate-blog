import { Post } from '../types';

export const posts: Post[] = [
  {
    id: '1',
    title: 'Transform Your Home Office with These 5 Essential Smart Gadgets',
    excerpt: 'Elevate your productivity and comfort with the latest smart office technology recommended by experts.',
    date: '2024-05-10',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office1/1200/600',
    content: `
# Transform Your Home Office

Working from home has become the new normal, but are you making the most of your space? A productive home office is more than just a desk and a chair. It's about creating an environment that supports your focus and health.

## Why Smart Gadgets?

Smart gadgets can automate repetitive tasks, improve lighting, and even remind you to stay active. Here are our top picks for this season.

### 1. Smart Standing Desk
A standing desk is essential for long-term health. The ability to switch between sitting and standing keeps your energy levels high.

### 2. Ergonomic Chair
Don't skimp on where you sit. A high-quality ergonomic chair is an investment in your back.

### 3. Noise-Canceling Headphones
Block out the distractions of a busy household with premium ANC headphones.

... and more!
    `,
    recommendedProducts: [
      {
        id: 'p1',
        name: 'Sony WH-1000XM5 Wireless Headphones',
        description: 'Industry-leading noise canceling with Auto NC Optimizer.',
        price: '$348.00',
        rating: 4.8,
        imageUrl: 'https://picsum.photos/seed/sony-xm5/400/400',
        affiliateUrl: 'https://www.amazon.com/dp/B09XS7JWHH',
        category: 'Audio'
      },
      {
        id: 'p2',
        name: 'Logitech MX Master 3S',
        description: 'Ultrafast scrolling, 8K DPI track-on-glass sensor.',
        price: '$99.00',
        rating: 4.9,
        imageUrl: 'https://picsum.photos/seed/mx-master/400/400',
        affiliateUrl: 'https://www.amazon.com/dp/B09HM94VDS',
        category: 'Peripherals'
      }
    ]
  },
  {
    id: '4',
    title: 'Mastering Cable Management: 10 Tips for a Clean Desk',
    excerpt: 'Say goodbye to cable spaghetti with these simple and effective organization strategies.',
    date: '2024-05-15',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office2/1200/600',
    content: '# Cable Management Guide...',
    recommendedProducts: []
  },
  {
    id: '5',
    title: 'Best Ergonomic Keyboards for Typing Comfort in 2024',
    excerpt: 'Reduce wrist strain and type faster with our top-rated split and curved keyboards.',
    date: '2024-05-16',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office3/1200/600',
    content: '# Ergonomic Keyboards...',
    recommendedProducts: []
  },
  {
    id: '6',
    title: 'Monitor Arms 101: How to Save Desk Space and Improve Posture',
    excerpt: 'Lifting your screen can change the way you work. Find the best mount for your setup.',
    date: '2024-05-17',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office4/1200/600',
    content: '# Monitor Arms...',
    recommendedProducts: []
  },
  {
    id: '7',
    title: 'The Best Desk Lamps for Eyesight and Focus',
    excerpt: 'Lighting is often overlooked but critical for deep work. Explore our favorite screen bars.',
    date: '2024-05-18',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office5/1200/600',
    content: '# Desk Lighting...',
    recommendedProducts: []
  },
  {
    id: '8',
    title: 'Ultrawide vs. Dual Monitors: Which is Better for Productivity?',
    excerpt: 'We break down the pros and cons of single large displays versus multi-monitor setups.',
    date: '2024-05-19',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office6/1200/600',
    content: '# Monitor Setup...',
    recommendedProducts: []
  },
  {
    id: '9',
    title: 'Essential Desk Accessories Every Professional Needs',
    excerpt: 'From desk mats to headphone stands, small details make a big difference.',
    date: '2024-05-20',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office7/1200/600',
    content: '# Desk Accessories...',
    recommendedProducts: []
  },
  {
    id: '10',
    title: 'Noise-Canceling for Your Whole Room: Simple Soundproofing Tips',
    excerpt: 'Create a quiet sanctuary even in a noisy house with these simple acoustic treatments.',
    date: '2024-05-21',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office8/1200/600',
    content: '# Soundproofing...',
    recommendedProducts: []
  },
  {
    id: '11',
    title: 'Top 5 Vertical Mice for Preventing Carpal Tunnel',
    excerpt: 'Change your grip and save your wrist. We test the best vertical mice on the market.',
    date: '2024-05-22',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office9/1200/600',
    content: '# Ergonomic Mice...',
    recommendedProducts: []
  },
  {
    id: '12',
    title: 'Minimalist Desk Setup: Less is More for Focus',
    excerpt: 'Clear your desk, clear your mind. A guide to the perfect minimalist workspace.',
    date: '2024-05-23',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office10/1200/600',
    content: '# Minimalism...',
    recommendedProducts: []
  },
  {
    id: '13',
    title: 'Standing Desk Treadmills: Staying Active While You Work',
    excerpt: 'Get your steps in during meetings with our review of the best under-desk treadmills.',
    date: '2024-05-24',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office11/1200/600',
    content: '# Walking Desks...',
    recommendedProducts: []
  },
  {
    id: '14',
    title: 'The Best Productivity Apps to Pair with Your Hardware',
    excerpt: 'Software meets hardware. The best tools to keep you organized and on track.',
    date: '2024-05-25',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office12/1200/600',
    content: '# Productivity Apps...',
    recommendedProducts: []
  },
  {
    id: '15',
    title: 'Home Office Plants: Boost Your Mood and Air Quality',
    excerpt: 'The best low-maintenance plants to bring some green into your digital life.',
    date: '2024-05-26',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office13/1200/600',
    content: '# Office Plants...',
    recommendedProducts: []
  },
  {
    id: '16',
    title: 'Professional Lighting for Video Calls: Look Your Best',
    excerpt: 'No more grainy faces. Guide to ring lights and natural lighting for Zoom professionals.',
    date: '2024-05-27',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office14/1200/600',
    content: '# Video Lighting...',
    recommendedProducts: []
  },
  {
    id: '17',
    title: 'The Ultimate Web Docking Station Comparison',
    excerpt: 'Connect everything with a single cable. We find the best docks for Mac and PC.',
    date: '2024-05-28',
    author: 'Alex Chen',
    category: 'Office Setup',
    headerImage: 'https://picsum.photos/seed/office15/1200/600',
    content: '# Docking Stations...',
    recommendedProducts: []
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Outdoor Camping Gear for 2024',
    excerpt: 'Gear up for your next adventure with our comprehensive review of the best camping essentials.',
    date: '2024-05-12',
    author: 'Sarah Rogers',
    category: 'Outdoor Gear',
    headerImage: 'https://picsum.photos/seed/camping1/1200/600',
    content: `
# Ultimate Camping Gear Guide

Whether you are a seasoned camper or a weekend warrior, having the right gear makes all the difference when you are out in the wilderness.

## Essential Camping List

1. **A Reliable Tent**: Look for weather resistance and easy setup.
2. **Compact Cooking Set**: Portability is key.
3. **High-Performance Sleeping Bag**: Rated for the temperatures you expect.

...
    `,
    recommendedProducts: [
      {
        id: 'p3',
        name: 'Coleman Skydome Camping Tent',
        description: 'Quick setup in under 5 minutes with pre-attached poles.',
        price: '$129.99',
        rating: 4.5,
        imageUrl: 'https://picsum.photos/seed/tent/400/400',
        affiliateUrl: 'https://www.amazon.com/dp/B0851MG324',
        category: 'Camping'
      }
    ]
  },
  {
    id: '3',
    title: '5 Smart Home Devices That Will Save You Money on Energy Bills',
    excerpt: 'Efficiency is the name of the game. See how these smart devices pay for themselves over time.',
    date: '2024-05-14',
    author: 'Michael Smith',
    category: 'Smart Home',
    headerImage: 'https://picsum.photos/seed/smarthome1/1200/600',
    content: `
# Save Money with Smart Home Tech

Energy bills can be a major expense, but modern technology offers several ways to optimize your home's consumption.

## Top Energy Saving Devices

- **Smart Thermostat**: Learns your habits and adjusts accordingly.
- **Smart Plugs**: Turn off devices that draw "phantom power".
- **LED Smart Bulbs**: Highly efficient and controllable.
    `,
    recommendedProducts: [
      {
        id: 'p4',
        name: 'Google Nest Learning Thermostat',
        description: 'Stainless Steel thermostat that learns your schedule.',
        price: '$199.99',
        rating: 4.7,
        imageUrl: 'https://picsum.photos/seed/nest/400/400',
        affiliateUrl: 'https://www.amazon.com/dp/B0131RNYIQ',
        category: 'HVAC'
      }
    ]
  }
];
