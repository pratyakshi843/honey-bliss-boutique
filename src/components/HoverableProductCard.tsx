
import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';

interface HoverableProductCardProps {
  product: Product;
}

const HoverableProductCard = ({ product }: HoverableProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          <ProductCard product={product} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 bg-white/95 backdrop-blur-sm border border-honey-200 shadow-lg">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-lg text-brown-800">{product.name}</h4>
            <Badge variant="outline" className="bg-honey-100 text-honey-800 border-honey-300">
              {product.category}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-600">Origin: <span className="text-brown-700">{product.origin}</span></div>
            <div className="text-sm font-medium text-gray-600">Flavor: <span className="text-brown-700">{product.flavor}</span></div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-600">Best used for:</h5>
            <div className="flex flex-wrap gap-1 mt-1">
              {product.bestFor.map((use, idx) => (
                <Badge key={idx} variant="secondary" className="bg-honey-50 text-honey-700 text-xs">
                  {use}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 italic">
            "Hover to explore, click to discover more about this honey variety!"
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverableProductCard;
