
// This file now re-exports Zustand store hooks for backward compatibility
// This allows components that previously used Redux to work with Zustand

import { useCartStore } from './useCartStore';
import { useFavoritesStore } from './useFavoritesStore';
import { useAuthStore } from './useAuthStore';
import { useQuizStore } from './useQuizStore';

// Re-export for backward compatibility
export { useCartStore, useFavoritesStore, useAuthStore, useQuizStore };

// Helper functions to mimic Redux patterns
export const useAppSelector = (selector: any) => {
  // This is a compatibility layer to help transition from Redux to Zustand
  // It allows components to continue using the useAppSelector pattern 
  // by forwarding the selector to the appropriate store
  
  // For cart state
  if (selector.toString().includes('cart')) {
    return selector(useCartStore.getState());
  }
  
  // For favorites state
  if (selector.toString().includes('favorites')) {
    return selector(useFavoritesStore.getState());
  }
  
  // For auth state
  if (selector.toString().includes('auth')) {
    return selector(useAuthStore.getState());
  }
  
  // For quiz state
  if (selector.toString().includes('quiz')) {
    return selector(useQuizStore.getState());
  }
  
  // Default case
  console.warn('useAppSelector called with unknown selector:', selector);
  return undefined;
};

// Mock dispatch function that doesn't do anything
// Components should migrate to using the direct Zustand store actions
export const useAppDispatch = () => {
  return (action: any) => {
    console.warn('useAppDispatch is deprecated. Use Zustand store actions directly.');
    
    // Handle different action types based on the type property
    switch (action.type) {
      case 'cart/toggleCart':
        useCartStore.getState().toggleCart();
        break;
      case 'cart/closeCart':
        useCartStore.getState().closeCart();
        break;
      case 'cart/addToCart':
        useCartStore.getState().addToCart(action.payload);
        break;
      case 'cart/removeFromCart':
        useCartStore.getState().removeFromCart(action.payload);
        break;
      case 'cart/removeItemCompletely':
        useCartStore.getState().removeItemCompletely(action.payload);
        break;
      case 'cart/clearCart':
        useCartStore.getState().clearCart();
        break;
      case 'favorites/toggleFavorite':
        useFavoritesStore.getState().toggleFavorite(action.payload);
        break;
      default:
        // If action is a function (thunk), execute it
        if (typeof action === 'function') {
          action(useAppDispatch());
        } else if (!action.type) {
          // If action doesn't have a type, assume it's a direct store action
          // This handles the case where we pass a Zustand action directly
          action();
        } else {
          console.warn('Unknown action type:', action.type);
        }
    }
  };
};

// For backward compatibility - mimic Redux action creators
export const cartSlice = {
  toggleCart: () => ({ type: 'cart/toggleCart' }),
  closeCart: () => ({ type: 'cart/closeCart' }),
  addToCart: (payload: any) => ({ type: 'cart/addToCart', payload }),
  removeFromCart: (payload: any) => ({ type: 'cart/removeFromCart', payload }),
  removeItemCompletely: (payload: any) => ({ type: 'cart/removeItemCompletely', payload }),
  clearCart: () => ({ type: 'cart/clearCart' })
};

export const favoritesSlice = {
  toggleFavorite: (payload: any) => ({ type: 'favorites/toggleFavorite', payload })
};
