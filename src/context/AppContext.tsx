import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, Product, CartItem } from '../types';
import { dummyProducts } from '../data/products';

const initialState: AppState = {
  products: dummyProducts,
  cart: {
    items: [],
    totalQty: 0,
    totalPrice: 0
  },
  user: null,
  loading: false,
  alerts: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
      
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.items.find(item => item.id === product.id);
      
      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = state.cart.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...state.cart.items, {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity
        }];
      }
      
      const totalQty = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: { items: updatedItems, totalQty, totalPrice }
      };
    }
    
    case 'UPDATE_CART_ITEM': {
      const { id, quantity } = action.payload;
      const updatedItems = quantity > 0
        ? state.cart.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        : state.cart.items.filter(item => item.id !== id);
      
      const totalQty = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: { items: updatedItems, totalQty, totalPrice }
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.cart.items.filter(item => item.id !== action.payload);
      const totalQty = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: { items: updatedItems, totalQty, totalPrice }
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: { items: [], totalQty: 0, totalPrice: 0 }
      };
      
    case 'SET_USER':
      return { ...state, user: action.payload };
      
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
      
    case 'ADD_ALERT': {
      const alert = { ...action.payload, id: Date.now().toString() };
      return { ...state, alerts: [...state.alerts, alert] };
    }
    
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload)
      };
      
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}