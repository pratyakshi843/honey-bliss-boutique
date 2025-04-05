
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { products } from '@/data/products';

const FeaturedProducts = () => {
  // Get only 4 featured products for the homepage
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  
  return (
    <section id="featured-products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">Our Featured Honey Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular honey varieties sourced from pristine locations around the world.
            Each jar contains nature's liquid gold with unique flavors and benefits.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="transform transition-all duration-300"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a 
            href="/shop" 
            className="inline-block bg-honey-600 hover:bg-honey-700 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300"
          >
            View All Products
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
