
import { useState } from 'react';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';

interface HoverableProductCardProps {
  product: Product;
}

const HoverableProductCard = ({ product }: HoverableProductCardProps) => {
  return (
    <div className="relative">
      <ProductCard product={product} />
    </div>
  );
};

export default HoverableProductCard;
