
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  weight: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

// Try to load favorites from localStorage
const loadFavoritesFromStorage = (): FavoritesState => {
  if (typeof window === 'undefined') {
    return { items: [] };
  }
  
  try {
    const storedFavorites = localStorage.getItem('honeyFavorites');
    return storedFavorites 
      ? JSON.parse(storedFavorites) 
      : { items: [] };
  } catch (error) {
    console.error('Failed to load favorites from localStorage', error);
    return { items: [] };
  }
};

const initialState: FavoritesState = loadFavoritesFromStorage();

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      
      if (index >= 0) {
        // Remove from favorites
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        // Add to favorites
        state.items.push(action.payload);
      }
      
      // Save to localStorage
      localStorage.setItem('honeyFavorites', JSON.stringify(state));
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.setItem('honeyFavorites', JSON.stringify(state));
    }
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
