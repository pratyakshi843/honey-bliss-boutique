
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Try to load auth state from localStorage
const loadAuthFromStorage = (): AuthState => {
  if (typeof window === 'undefined') {
    return { user: null, isAuthenticated: false };
  }
  
  try {
    const storedAuth = localStorage.getItem('honeyAuth');
    return storedAuth 
      ? JSON.parse(storedAuth) 
      : { user: null, isAuthenticated: false };
  } catch (error) {
    console.error('Failed to load auth from localStorage', error);
    return { user: null, isAuthenticated: false };
  }
};

const initialState: AuthState = loadAuthFromStorage();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      
      // Save to localStorage
      localStorage.setItem('honeyAuth', JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      // Clear from localStorage
      localStorage.setItem('honeyAuth', JSON.stringify(state));
    }
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
