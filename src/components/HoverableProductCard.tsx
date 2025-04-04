
import { useState } from 'react';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface HoverableProductCardProps {
  product: Product;
}

const HoverableProductCard = ({ product }: HoverableProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProductCard product={product} />
      
      {/* Overlay with product details on hover */}
      <motion.div 
        className="absolute inset-0 bg-honey-800/50 backdrop-blur-sm rounded-lg p-4 flex flex-col justify-between overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-lg text-white">{product.name}</h4>
            <Badge variant="outline" className="bg-honey-100 text-honey-800 border-honey-300">
              {product.category}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm font-medium text-white/80">Origin: <span className="text-white">{product.origin}</span></div>
            <div className="text-sm font-medium text-white/80">Flavor: <span className="text-white">{product.flavor}</span></div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-white/80">Best used for:</h5>
            <div className="flex flex-wrap gap-1 mt-1">
              {product.bestFor.map((use, idx) => (
                <Badge key={idx} variant="secondary" className="bg-honey-50 text-honey-700 text-xs">
                  {use}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-white/90 italic mt-2">
          "Click to discover more about this honey variety!"
        </div>
      </motion.div>
    </div>
  );
};

export default HoverableProductCard;
