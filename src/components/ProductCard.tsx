
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { toggleFavorite } from '../store/favoritesSlice';
import { toast } from 'sonner';
import { Product } from '../data/products';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  
  const isFavorite = favorites.some(item => item.id === product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
    }));
    toast.success(`${product.name} added to cart`);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
    }));
    
    if (isFavorite) {
      toast.info(`${product.name} removed from favorites`);
    } else {
      toast.success(`${product.name} added to favorites`);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        to={`/product/${product.id}`}
        className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {product.premium && (
            <div className="absolute top-0 left-0 bg-amber-600 text-white px-2 py-1 text-xs font-semibold">
              Premium
            </div>
          )}
          
          {product.organic && (
            <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 text-xs font-semibold">
              Organic
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-white font-semibold text-lg">{product.name}</h3>
            <p className="text-white/90 text-sm">{product.weight}</p>
          </div>
          
          <button 
            onClick={handleToggleFavorite}
            className={cn(
              "absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors",
              isFavorite ? "text-red-500" : "text-gray-500"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-honey-700 font-bold text-lg">₹{product.price}</span>
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4" />
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-honey-600 hover:bg-honey-700 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
