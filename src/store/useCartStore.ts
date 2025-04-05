
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from '@/hooks/use-toast';

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
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  removeItemCompletely: (id: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          const newState = existingItem
            ? {
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              }
            : {
                items: [...state.items, { ...item, quantity: 1 }],
              };
          
          // Show toast notification
          toast({
            title: item.price >= 500 ? "Free Shipping Eligible!" : "Added to Cart",
            description: `${item.name} has been added to your cart${item.price >= 500 ? " with free shipping!" : "."}`,
            duration: 3000,
            variant: item.price >= 500 ? "default" : "default",
            position: "bottom-center",
          });
          
          return newState;
        });
      },
      removeFromCart: (id) => set((state) => {
        const existingItem = state.items.find((i) => i.id === id);
        
        if (existingItem && existingItem.quantity > 1) {
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        } else {
          return {
            items: state.items.filter((i) => i.id !== id),
          };
        }
      }),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
      removeItemCompletely: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
    }),
    {
      name: 'honey-cart',
    }
  )
);
