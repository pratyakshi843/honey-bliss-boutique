
import { motion } from 'framer-motion';
import { Award, Leaf, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-honey-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/honeycomb.png")',
          backgroundSize: '300px'
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-brown-800 mb-6">Our Honey Story</h1>
            <p className="text-xl text-brown-600 mb-8">
              From the pristine valleys of Uttar Pradesh to your table - a journey of passion, tradition, and pure honey goodness.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1471943311424-646960669fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGJlZWtlZXBlcnx8MHx8fHwxNzEyNDc0ODg0fDA&ixlib=rb-4.0.3&q=80&w=1080" 
                alt="Beekeepers" 
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-brown-800 mb-6">Our Journey</h2>
              <p className="text-gray-700 mb-4">
                Honey Bliss Boutique was born out of a deep passion for pure, natural honey and a commitment to sustainable beekeeping. Our journey began in the small village of Shivpuri in Bijnor, Uttar Pradesh, where our family has been practicing traditional beekeeping for generations.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small family operation has grown into a beloved honey brand, but our core values remain unchanged. We believe in maintaining the perfect balance between traditional wisdom and modern innovation, ensuring that every jar of honey we produce meets the highest standards of quality while preserving the natural goodness.
              </p>
              <p className="text-gray-700">
                Today, we work with a network of dedicated local beekeepers who share our passion and commitment to sustainable practices. Together, we bring you the finest varieties of honey, each with its own unique flavor profile and health benefits.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="py-16 bg-honey-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-brown-800 mb-6">Our Values</h2>
            <p className="text-gray-700">
              At Honey Bliss Boutique, our values guide everything we do, from how we treat our bees to how we serve our customers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12 text-honey-600" />,
                title: "Quality",
                description: "We never compromise on quality. Every batch of honey is carefully harvested, processed minimally, and tested to ensure purity and excellence."
              },
              {
                icon: <Leaf className="w-12 h-12 text-honey-600" />,
                title: "Sustainability",
                description: "We practice eco-friendly beekeeping methods that protect bees, preserve their natural habitats, and promote biodiversity."
              },
              {
                icon: <Users className="w-12 h-12 text-honey-600" />,
                title: "Community",
                description: "We support local beekeepers and rural communities, creating sustainable livelihoods and preserving traditional knowledge."
              },
              {
                icon: <Heart className="w-12 h-12 text-honey-600" />,
                title: "Authenticity",
                description: "We believe in transparency and honesty in everything we do, from our production methods to how we communicate with our customers."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="mb-4 inline-flex justify-center items-center w-16 h-16 rounded-full bg-honey-100">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-brown-800 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Our Process */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-brown-800 mb-6">From Hive to Jar</h2>
            <p className="text-gray-700">
              We take great care at every step of the honey production process to ensure that what reaches your table is pure, natural, and full of goodness.
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-honey-200 hidden md:block"></div>
            
            {[
              {
                title: "Responsible Beekeeping",
                description: "Our beekeepers practice methods that prioritize bee health and welfare, ensuring strong, thriving colonies.",
                image: "https://images.unsplash.com/photo-1473973916745-60839aebf06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8YmVla2VlcGVyfHwwfHx8fDE3MTI0NzQ5ODB8MA&ixlib=rb-4.0.3&q=80&w=1080"
              },
              {
                title: "Careful Harvesting",
                description: "Honey is harvested at the peak of ripeness, ensuring optimal flavor and nutritional content.",
                image: "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8aGFydmVzdGluZyUyMGhvbmV5fHwwfHx8fDE3MTI0NzUwMTR8MA&ixlib=rb-4.0.3&q=80&w=1080"
              },
              {
                title: "Minimal Processing",
                description: "We use minimal processing techniques to preserve the natural enzymes, antioxidants, and beneficial compounds in our honey.",
                image: "https://images.unsplash.com/photo-1679679008383-6f778fe07cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGhvbmV5JTIwcHJvY2Vzc2luZ3x8MHx8fHwxNzEyNDc1MDU0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              },
              {
                title: "Quality Control",
                description: "Every batch of honey undergoes rigorous testing to ensure purity, quality, and compliance with the highest standards.",
                image: "https://images.unsplash.com/photo-1652016382526-d9bdeb1803cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8aG9uZXklMjB0ZXN0aW5nfHwwfHx8fDE3MTI0NzUwODR8MA&ixlib=rb-4.0.3&q=80&w=1080"
              },
              {
                title: "Eco-Friendly Packaging",
                description: "We use sustainable, eco-friendly packaging materials to minimize our environmental footprint.",
                image: "https://images.unsplash.com/photo-1574283073530-b9253f10c606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGhvbmV5JTIwcGFja2FnaW5nfHwwfHx8fDE3MTI0NzUxMDV8MA&ixlib=rb-4.0.3&q=80&w=1080"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-12 md:mb-24 ${
                  index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                }`}
              >
                <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="md:w-1/2">
                    <div className="flex items-center mb-4">
                      <div className={`relative z-10 md:absolute ${
                        index % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'
                      }`}>
                        <div className="flex items-center justify-center w-12 h-12 bg-honey-500 text-white rounded-full font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className={`text-xl font-semibold text-brown-800 ${
                        index % 2 === 0 ? 'md:mr-16' : 'md:ml-4'
                      }`}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-6">{step.description}</p>
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="rounded-lg shadow-md w-full h-60 object-cover"
                    />
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Experience the Difference</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Taste the pure, authentic goodness of our natural honey varieties. Each jar carries the essence of the beautiful Uttar Pradesh countryside.
            </p>
            <a 
              href="/shop" 
              className="inline-block bg-white text-honey-700 font-semibold px-8 py-3 rounded-md hover:bg-honey-50 transition-colors"
            >
              Shop Our Collection
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
