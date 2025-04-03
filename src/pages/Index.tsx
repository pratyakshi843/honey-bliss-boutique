
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Shield, Leaf, Truck } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const featuredRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const featuredInView = useInView(featuredRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 });
  
  return (
    <div className="min-h-screen">
      <HeroBanner />
      
      {/* Featured Products */}
      <div 
        ref={featuredRef} 
        id="featured-products"
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">Our Premium Honey Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our selection of pure, natural honey varieties, each with its own unique flavor profile and health benefits.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/shop">
              <Button 
                variant="outline" 
                className="border-honey-600 text-honey-700 hover:bg-honey-50 text-lg"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div 
        ref={benefitsRef}
        className="py-16 bg-honey-50"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">Why Choose Our Honey?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We take pride in offering only the highest quality honey, produced with care for both our customers and the environment.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-10 h-10 text-honey-600" />,
                title: "Premium Quality",
                description: "Our honey is harvested with care to ensure the highest quality and purity."
              },
              {
                icon: <Shield className="w-10 h-10 text-honey-600" />,
                title: "100% Natural",
                description: "No additives, preservatives, or artificial ingredients – just pure natural honey."
              },
              {
                icon: <Leaf className="w-10 h-10 text-honey-600" />,
                title: "Eco-Friendly",
                description: "We use sustainable practices that protect bees and preserve their natural habitats."
              },
              {
                icon: <Truck className="w-10 h-10 text-honey-600" />,
                title: "Fast Delivery",
                description: "We ship directly to your doorstep to ensure freshness and convenience."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-brown-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div 
        ref={testimonialsRef}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it, hear from our satisfied customers who have experienced the quality of our honey.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The Wildflower Honey is absolutely delicious! It has a rich, complex flavor that makes my morning tea extra special.",
                name: "Priya Sharma",
                title: "Food Enthusiast"
              },
              {
                quote: "I've been using the Manuka Honey for my sore throat, and it works wonders. Plus, it tastes amazing!",
                name: "Rajat Singh",
                title: "Health Coach"
              },
              {
                quote: "Their commitment to eco-friendly packaging shows they care about the environment as much as they care about quality.",
                name: "Ananya Patel",
                title: "Environmental Advocate"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-honey-50 p-6 rounded-lg shadow-md relative"
              >
                <div className="text-honey-500 text-5xl absolute top-4 left-4 opacity-20">"</div>
                <p className="text-gray-700 mb-6 relative z-10">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-honey-200 rounded-full flex items-center justify-center text-honey-700 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-brown-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-honey-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Find Your Perfect Honey Match</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Take our quick quiz to discover which honey variety best suits your taste preferences and needs.
          </p>
          <Link to="/quiz">
            <Button className="bg-white text-honey-700 hover:bg-honey-50 text-lg py-6 px-8">
              Take the Honey Quiz
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
