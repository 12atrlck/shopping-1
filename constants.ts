import { Product, User, UserRole, Sale } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist Watch',
    description: 'A sleek, modern timepiece for the urban professional. Features a genuine leather strap and sapphire crystal glass.',
    price: 129.99,
    category: 'Accessories',
    image: 'https://picsum.photos/id/175/400/400',
    stock: 45,
  },
  {
    id: '2',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in high-fidelity audio with active noise cancellation. 30-hour battery life.',
    price: 249.50,
    category: 'Electronics',
    image: 'https://picsum.photos/id/4/400/400',
    stock: 20,
  },
  {
    id: '3',
    name: 'Organic Cotton Hoodie',
    description: 'Sustainably sourced, ultra-soft hoodie available in earth tones. Perfect for casual wear.',
    price: 59.00,
    category: 'Apparel',
    image: 'https://picsum.photos/id/1005/400/400',
    stock: 100,
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Designed for all-day comfort with lumbar support and breathable mesh back.',
    price: 350.00,
    category: 'Furniture',
    image: 'https://picsum.photos/id/1080/400/400',
    stock: 8,
  },
  {
    id: '5',
    name: 'Ceramic Coffee Pour-Over Set',
    description: 'Hand-crafted ceramic dripper and carafe for the perfect morning brew.',
    price: 45.00,
    category: 'Home',
    image: 'https://picsum.photos/id/30/400/400',
    stock: 30,
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Sarah Admin',
    email: 'sarah@lumina.com',
    role: UserRole.ADMIN,
    avatar: 'https://i.pravatar.cc/150?u=admin',
    lastActive: new Date().toISOString(),
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: UserRole.USER,
    avatar: 'https://i.pravatar.cc/150?u=john',
    lastActive: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'user-2',
    name: 'Alice Smith',
    email: 'alice@example.com',
    role: UserRole.USER,
    avatar: 'https://i.pravatar.cc/150?u=alice',
    lastActive: new Date().toISOString(),
  }
];

// Simulate some past sales for the chart
export const INITIAL_SALES: Sale[] = [
  {
    id: 'sale-1',
    userId: 'user-1',
    userName: 'John Doe',
    items: [{ ...INITIAL_PRODUCTS[0], quantity: 1 }],
    totalAmount: 129.99,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'sale-2',
    userId: 'user-2',
    userName: 'Alice Smith',
    items: [{ ...INITIAL_PRODUCTS[2], quantity: 2 }],
    totalAmount: 118.00,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sale-3',
    userId: 'user-1',
    userName: 'John Doe',
    items: [{ ...INITIAL_PRODUCTS[1], quantity: 1 }],
    totalAmount: 249.50,
    date: new Date().toISOString(),
  }
];