
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'New Delhi, Delhi',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    stars: 5,
    text: "I've tried many honey brands over the years, but nothing compares to the quality and taste of this honey. It's pure, rich, and perfect for my morning tea ritual!"
  },
  {
    name: 'Arjun Patel',
    location: 'Mumbai, Maharashtra',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    stars: 5,
    text: "As someone who's very careful about food quality, I appreciate how transparent this company is about their beekeeping practices. The honey is exceptional and I love supporting a sustainable business."
  },
  {
    name: 'Divya Agarwal',
    location: 'Bangalore, Karnataka',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    stars: 4,
    text: "The manuka honey has become a staple in my home. I use it for everything from sore throats to natural skincare. Worth every penny for its quality and effectiveness."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our satisfied customers have to say about our honey products.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 relative"
            >
              <div className="absolute -top-4 -left-4 bg-honey-500 rounded-full p-2">
                <Quote className="text-white h-4 w-4" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.stars ? 'fill-honey-500 text-honey-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full object-cover border-2 border-honey-200"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-brown-700">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a 
            href="/about" 
            className="text-honey-600 hover:text-honey-700 font-medium underline underline-offset-4"
          >
            Read more customer stories
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
