
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Droplet, Shield, Battery, Zap } from 'lucide-react';

const benefitsList = [
  {
    icon: Heart,
    title: 'Heart Health',
    description: 'Natural antioxidants in honey help improve cholesterol levels and may reduce the risk of heart disease.',
  },
  {
    icon: Brain,
    title: 'Cognitive Function',
    description: 'Rich in antioxidants that may help protect your brain and boost memory and concentration.',
  },
  {
    icon: Shield,
    title: 'Immune Support',
    description: 'Antibacterial and anti-inflammatory properties help strengthen your immune system and fight infections.',
  },
  {
    icon: Droplet,
    title: 'Skin Health',
    description: 'Natural humectant properties make honey excellent for skin health, wound healing, and natural skincare.',
  },
  {
    icon: Battery,
    title: 'Energy Boost',
    description: 'Natural sugars provide an immediate energy boost, perfect for pre-workout or afternoon fatigue.',
  },
  {
    icon: Zap,
    title: 'Digestive Health',
    description: 'Soothes digestive issues and can help balance gut bacteria for better digestive health.',
  },
];

const HoneyBenefits = () => {
  return (
    <section className="py-16 bg-honey-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">The Natural Benefits of Honey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Honey is more than just a natural sweetener. It's a remarkable substance with numerous health benefits
            that have been recognized for thousands of years.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsList.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="bg-honey-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <benefit.icon className="text-honey-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-brown-700 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 bg-honey-100 rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:pr-8 mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold text-brown-800 mb-4">Daily Honey Recommendation</h3>
              <p className="text-gray-700 mb-4">
                For optimal health benefits, experts recommend consuming 1-2 tablespoons (21-42 grams) of honey daily. 
                Incorporate it into your tea, drizzle it on yogurt, or spread it on toast for a delicious and nutritious boost.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Note:</strong> Honey should not be given to infants under 12 months due to the risk of botulism.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center shadow-md">
                <div className="text-center">
                  <p className="text-3xl font-bold text-honey-600">1-2</p>
                  <p className="text-xs text-gray-500">tbsp daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoneyBenefits;
