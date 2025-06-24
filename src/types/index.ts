export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  ingredients: string;
  stock: number;
  rating: number;
  reviewCount: number;
  sku: string;
  featured: boolean;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AppState {
  products: Product[];
  cart: {
    items: CartItem[];
    totalQty: number;
    totalPrice: number;
  };
  user: User | null;
  loading: boolean;
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_ALERT'; payload: Omit<Alert, 'id'> }
  | { type: 'REMOVE_ALERT'; payload: string };