
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Settings } from 'lucide-react';
import { useCartStore, useFavoritesStore, useAuthStore } from '../store/hooks';
import { Button } from './ui/button';
import CartDrawer from './CartDrawer';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Use Zustand stores directly
  const cartItems = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const favorites = useFavoritesStore((state) => state.items);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openCart = () => {
    toggleCart();
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-honey-700 border-b-2 border-honey-500' : '';
  };

  return (
    <>
      <nav className="bg-white dark:bg-card shadow-md py-4 sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-honey-500 rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-white text-2xl font-bold">RH</span>
              <div className="absolute -top-4 left-0 w-full h-full bg-honey-400 opacity-30 animate-honey-drip"></div>
            </div>
            <span className="text-2xl font-bold text-brown-800 dark:text-honey-300">Rohit's Honey</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className={`font-medium hover:text-honey-600 transition-colors dark:hover:text-honey-400 dark:text-gray-200 ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/shop" className={`font-medium hover:text-honey-600 transition-colors dark:hover:text-honey-400 dark:text-gray-200 ${isActive('/shop')}`}>
              Shop
            </Link>
            <Link to="/quiz" className={`font-medium hover:text-honey-600 transition-colors dark:hover:text-honey-400 dark:text-gray-200 ${isActive('/quiz')}`}>
              Honey Quiz
            </Link>
            <Link to="/about" className={`font-medium hover:text-honey-600 transition-colors dark:hover:text-honey-400 dark:text-gray-200 ${isActive('/about')}`}>
              About Us
            </Link>
            <Link to="/contact" className={`font-medium hover:text-honey-600 transition-colors dark:hover:text-honey-400 dark:text-gray-200 ${isActive('/contact')}`}>
              Contact
            </Link>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <Link to="/settings" className="p-2 hover:bg-honey-100 dark:hover:bg-honey-900/30 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            
            <ThemeSwitcher variant="ghost" />
            
            <Link to="/favorites" className="relative p-2 hover:bg-honey-100 dark:hover:bg-honey-900/30 rounded-full transition-colors">
              <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-honey-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <button 
              onClick={openCart}
              className="relative p-2 hover:bg-honey-100 dark:hover:bg-honey-900/30 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-honey-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <Link to={isAuthenticated ? "/account" : "/login"}>
              <Button variant="outline" className="border-honey-500 text-honey-700 hover:bg-honey-50 dark:border-honey-700 dark:text-honey-400 dark:hover:bg-honey-900/30">
                <User className="w-5 h-5 mr-1" />
                {isAuthenticated ? "Account" : "Login"}
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-honey-100 dark:hover:bg-honey-900/30 rounded-full transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white dark:bg-card border-t dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`px-4 py-2 font-medium hover:bg-honey-100 dark:hover:bg-honey-900/30 dark:text-gray-200 rounded-md transition-colors ${isActive('/')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className={`px-4 py-2 font-medium hover:bg-honey-100 dark:hover:bg-honey-900/30 dark:text-gray-200 rounded-md transition-colors ${isActive('/shop')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/quiz" 
                className={`px-4 py-2 font-medium hover:bg-honey-100 dark:hover:bg-honey-900/30 dark:text-gray-200 rounded-md transition-colors ${isActive('/quiz')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Honey Quiz
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 font-medium hover:bg-honey-100 dark:hover:bg-honey-900/30 dark:text-gray-200 rounded-md transition-colors ${isActive('/about')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-2 font-medium hover:bg-honey-100 dark:hover:bg-honey-900/30 dark:text-gray-200 rounded-md transition-colors ${isActive('/contact')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/settings" 
                className={`px-4 py-2 font-medium hover:bg-honey-100 dark:hover:bg-honey-900/30 dark:text-gray-200 rounded-md transition-colors ${isActive('/settings')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      <CartDrawer />
    </>
  );
};

export default Navbar;
