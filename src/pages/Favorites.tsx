
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Favorites = () => {
  const items = useFavoritesStore((state) => state.items);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const addToCart = useCartStore((state) => state.addToCart);
  
  const handleRemoveFromFavorites = (id: string, name: string) => {
    toggleFavorite({
      id,
      name,
      price: 0,
      image: '',
      weight: '',
    });
    toast.info(`${name} removed from favorites`);
  };
  
  const handleAddToCart = (item: typeof items[0]) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };
  
  const handleClearFavorites = () => {
    if (items.length === 0) return;
    
    clearFavorites();
    toast.info('Favorites cleared');
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-honey-600 hover:text-honey-700 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brown-800">Your Favorites</h1>
        
        {items.length > 0 && (
          <Button 
            variant="outline" 
            className="text-red-500 border-red-500 hover:bg-red-50"
            onClick={handleClearFavorites}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>
      
      {items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 p-12 rounded-lg text-center"
        >
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your favorites list is empty</h2>
          <p className="text-gray-500 mb-6">Add items to your favorites to see them here.</p>
          <Link to="/shop">
            <Button className="bg-honey-600 hover:bg-honey-700">
              Browse Our Products
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <Link to={`/product/${item.id}`} className="block overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              
              <div className="p-4 flex-1 flex flex-col">
                <Link to={`/product/${item.id}`} className="block">
                  <h3 className="text-xl font-semibold text-brown-800 mb-2">{item.name}</h3>
                </Link>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-honey-700 font-bold">₹{item.price.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm">{item.weight}</span>
                </div>
                
                <div className="mt-auto flex flex-col sm:flex-row gap-2">
                  <Button 
                    className="flex-1 bg-honey-600 hover:bg-honey-700"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => handleRemoveFromFavorites(item.id, item.name)}
                  >
                    <Heart className="w-4 h-4 mr-2 fill-current" />
                    Remove
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
