
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroBanner = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-honey-100 min-h-[90vh] flex items-center">
      {/* Animated honey drips */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 animate-honey-drip" 
            style={{ 
              left: `${(i + 1) * 15}%`, 
              animationDelay: `${i * 0.5}s`,
              opacity: 0.3
            }}
          >
            <div className="w-4 h-32 bg-honey-500 rounded-b-full"></div>
          </div>
        ))}
      </div>
      
      {/* Honeycomb pattern */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/honeycomb.png")',
        backgroundSize: '300px'
      }}></div>
      
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-brown-800">
            <span className="block">Pure, Natural Honey</span>
            <span className="text-honey-600">From Our Hives to Your Home</span>
          </h1>
          <p className="text-xl text-brown-600 mb-8 max-w-lg">
            Experience the rich flavors of our 100% natural, ethically harvested honey.
            Each jar is filled with the essence of nature's most perfect sweetener.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Button 
              className="bg-honey-600 hover:bg-brown-700 text-white font-semibold py-3 px-8 text-lg"
              onClick={scrollToProducts}
            >
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              className="border-honey-600 text-honey-700 hover:bg-honey-50 font-semibold py-3 px-8 text-lg"
              asChild
            >
              <a href="/quiz">Find Your Perfect Honey</a>
            </Button>
          </div>
          
          {/* Stats counter */}
          <div className="flex justify-around mt-12 gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-honey-700">100%</div>
              <div className="text-sm text-brown-600">Natural</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-honey-700">50+</div>
              <div className="text-sm text-brown-600">Bee Hives</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-honey-700">10+</div>
              <div className="text-sm text-brown-600">Varieties</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <img 
              src="/lovable-uploads/fb2c6a24-62ea-4089-91c0-1a30b9b93156.png" 
              alt="Premium Honey Jar with Honey Dipper" 
              className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-float">
              <p className="text-brown-800 font-medium">
                "Our honey is 100% pure, unpasteurized, and packed with natural enzymes and antioxidants."
              </p>
            </div>
            <div className="absolute -top-4 -left-4 bg-honey-500 text-white rounded-full h-24 w-24 flex items-center justify-center text-center p-2 shadow-lg animate-pulse-gentle">
              <span className="font-bold">Eco-Friendly Packaging</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer transition-opacity duration-300 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={scrollToProducts}
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-brown-600 mb-2">Discover Our Products</span>
          <ChevronDown className="w-6 h-6 text-honey-600" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
