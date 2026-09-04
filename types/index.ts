export type ProductCategory = 'sunglasses' | 'eyeglasses' | 'sports' | 'fashion';
export type FrameShape = 'round' | 'square' | 'cat-eye' | 'aviator' | 'rectangle' | 'oval';
export type FrameStyle = 'vintage' | 'casual' | 'sport' | 'luxury' | 'minimalist';
export type Gender = 'men' | 'women' | 'unisex';
export type UserRole = 'customer' | 'staff' | 'admin';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  frameShape: FrameShape;
  frameStyle: FrameStyle;
  frameMaterial: string;
  lensType: string;
  colors: string[];
  gender: Gender;
  stock: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isSale?: boolean;
  warrantyMonths: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
