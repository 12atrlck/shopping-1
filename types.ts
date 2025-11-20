export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  lastActive: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  date: string; // ISO string
}

export interface SalesStats {
  totalRevenue: number;
  totalOrders: number;
  topProduct: string;
}