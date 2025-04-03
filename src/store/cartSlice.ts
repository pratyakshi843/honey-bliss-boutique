
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Try to load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') {
    return { items: [], isOpen: false };
  }
  
  try {
    const storedCart = localStorage.getItem('honeyCart');
    return storedCart 
      ? JSON.parse(storedCart) 
      : { items: [], isOpen: false };
  } catch (error) {
    console.error('Failed to load cart from localStorage', error);
    return { items: [], isOpen: false };
  }
};

const initialState: CartState = loadCartFromStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Save to localStorage
      localStorage.setItem('honeyCart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        } else {
          existingItem.quantity -= 1;
        }
      }
      
      // Save to localStorage
      localStorage.setItem('honeyCart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('honeyCart', JSON.stringify(state));
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    removeItemCompletely: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('honeyCart', JSON.stringify(state));
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  toggleCart, 
  closeCart,
  removeItemCompletely
} = cartSlice.actions;

export default cartSlice.reducer;
