
// This file is kept for backward compatibility but is no longer needed
// All components now directly import from the specific store files
// e.g., useCartStore, useFavoritesStore, etc.

import { useCartStore } from './useCartStore';
import { useFavoritesStore } from './useFavoritesStore';
import { useAuthStore } from './useAuthStore';
import { useQuizStore } from './useQuizStore';

// Re-export for backward compatibility
export { useCartStore, useFavoritesStore, useAuthStore, useQuizStore };
