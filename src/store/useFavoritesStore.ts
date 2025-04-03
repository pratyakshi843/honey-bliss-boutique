
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  weight: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      items: [],
      toggleFavorite: (item) => set((state) => {
        const index = state.items.findIndex((i) => i.id === item.id);
        
        if (index >= 0) {
          return {
            items: state.items.filter((i) => i.id !== item.id),
          };
        } else {
          return {
            items: [...state.items, item],
          };
        }
      }),
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'honey-favorites',
    }
  )
);
