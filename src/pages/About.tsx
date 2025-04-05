
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Leaf, Users, Heart, ExternalLink } from 'lucide-react';

const About = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDMW8lBhULvI4-3GpnNmAtidBGZeTvQnf4&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      // Define initMap function on window object
      window.initMap = () => {
        setMapLoaded(true);
      };
    };
    
    if (!window.google?.maps) {
      loadGoogleMapsScript();
    } else {
      setMapLoaded(true);
    }
    
    return () => {
      // Remove the global initMap function when component unmounts
      window.initMap = () => {};
    };
  }, []);
  
  useEffect(() => {
    if (mapLoaded && window.google?.maps) {
      // Initialize the map
      const mapElement = document.getElementById('farm-map');
      if (mapElement) {
        const bijnorCoordinates = { lat: 29.3723, lng: 78.1358 };
        const map = new window.google.maps.Map(mapElement, {
          center: bijnorCoordinates,
          zoom: 12,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#ede9dd" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#c3d2e0" }]
            }
          ]
        });
        
        const marker = new window.google.maps.Marker({
          position: bijnorCoordinates,
          map: map,
          title: "Our Honey Farm",
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#F59E0B",
            fillOpacity: 0.8,
            strokeWeight: 1,
            strokeColor: "#D97706",
          }
        });
        
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin-top: 0; color: #78350F; font-weight: bold;">Honey Bliss Boutique</h3>
              <p style="margin-bottom: 5px;">Vill-Shivpuri, Post-Afzalgarh, Bijnor, Uttar Pradesh</p>
              <p style="margin-bottom: 0;">Open Mon-Fri: 9am-6pm</p>
            </div>
          `
        });
        
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    }
  }, [mapLoaded]);

  return (
    <div className="bg-white">
      {/* Hero Section with parallax effect */}
      <div className="relative py-28 overflow-hidden bg-fixed bg-center bg-cover" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
          backgroundAttachment: 'fixed'
        }}>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow-lg">Our Honey Story</h1>
            <p className="text-xl text-white mb-8 text-shadow-md">
              From the pristine valleys of Uttar Pradesh to your table - a journey of passion, tradition, and pure honey goodness.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-honey-100 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100 rounded-full -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1471943311424-646960669fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGJlZWtlZXBlcnx8MHx8fHwxNzEyNDc0ODg0fDA&ixlib=rb-4.0.3&q=80&w=1080" 
                alt="Beekeepers" 
                className="rounded-lg shadow-xl w-full relative z-10"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <span className="absolute -top-10 left-0 text-8xl font-serif text-honey-100">''</span>
                <h2 className="text-4xl font-bold text-brown-800 mb-8 relative">Our Journey</h2>
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Honey Bliss Boutique was born out of a deep passion for pure, natural honey and a commitment to sustainable beekeeping. Our journey began in the small village of Shivpuri in Bijnor, Uttar Pradesh, where our family has been practicing traditional beekeeping for generations.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                What started as a small family operation has grown into a beloved honey brand, but our core values remain unchanged. We believe in maintaining the perfect balance between traditional wisdom and modern innovation, ensuring that every jar of honey we produce meets the highest standards of quality while preserving the natural goodness.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Today, we work with a network of dedicated local beekeepers who share our passion and commitment to sustainable practices. Together, we bring you the finest varieties of honey, each with its own unique flavor profile and health benefits.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="py-20 bg-gradient-to-b from-honey-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold text-brown-800 mb-6">Our Values</h2>
            <p className="text-lg text-gray-700">
              At Honey Bliss Boutique, our values guide everything we do, from how we treat our bees to how we serve our customers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex justify-center items-center w-20 h-20 rounded-full bg-honey-100 ring-8 ring-honey-50">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-brown-800 mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Our Process */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold text-brown-800 mb-6">From Hive to Jar</h2>
            <p className="text-lg text-gray-700">
              We take great care at every step of the honey production process to ensure that what reaches your table is pure, natural, and full of goodness.
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-honey-200 hidden md:block"></div>
            
            {[
              {
                title: "Responsible Beekeeping",
                description: "Our beekeepers practice methods that prioritize bee health and welfare, ensuring strong, thriving colonies.",
                image: "/lovable-uploads/9th one to responsible beekeeping in about us"
              },
              {
                title: "Careful Harvesting",
                description: "Honey is harvested at the peak of ripeness, ensuring optimal flavor and nutritional content.",
                image: "/lovable-uploads/10th one to careful harvesting"
              },
              {
                title: "Minimal Processing",
                description: "We use minimal processing techniques to preserve the natural enzymes, antioxidants, and beneficial compounds in our honey.",
                image: "/lovable-uploads/11th to minimal processing"
              },
              {
                title: "Quality Control",
                description: "Every batch of honey undergoes rigorous testing to ensure purity, quality, and compliance with the highest standards.",
                image: "/lovable-uploads/12th in quality control"
              },
              {
                title: "Eco-Friendly Packaging",
                description: "We use sustainable, eco-friendly packaging materials to minimize our environmental footprint.",
                image: "/lovable-uploads/556cb51a-a447-4020-ac8e-a9541eff5d5a.png"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-20 md:mb-32 ${
                  index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                }`}
              >
                <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="md:w-1/2">
                    <div className="flex items-center mb-4">
                      <div className={`relative z-10 md:absolute ${
                        index % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'
                      }`}>
                        <div className="flex items-center justify-center w-16 h-16 bg-honey-500 text-white rounded-full font-bold text-xl shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className={`text-2xl font-semibold text-brown-800 ${
                        index % 2 === 0 ? 'md:mr-16' : 'md:ml-4'
                      }`}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-8 text-lg">{step.description}</p>
                    <div className="overflow-hidden rounded-xl shadow-xl transform transition-transform hover:scale-105">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-80 object-cover hover:scale-110 transition-transform duration-1000"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="py-16 bg-honey-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-brown-800 mb-4">Visit Our Farm</h2>
            <p className="text-gray-700 mb-8">
              We welcome visitors to our honey farm by appointment. Come see how our honey is made and meet the bees!
            </p>
            <a 
              href="https://maps.app.goo.gl/eaj8JyQUcptNwHrb6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-honey-600 hover:text-honey-700 font-medium"
            >
              Get Directions <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
          
          <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
            <div id="farm-map" className="h-96 w-full bg-gray-100">
              {!mapLoaded && (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-honey-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-honey-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">Experience the Difference</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-10 text-xl">
              Taste the pure, authentic goodness of our natural honey varieties. Each jar carries the essence of the beautiful Uttar Pradesh countryside.
            </p>
            <a 
              href="/shop" 
              className="inline-block bg-white text-honey-700 font-semibold px-8 py-4 rounded-full hover:bg-honey-50 transition-colors text-lg transform hover:scale-105 transition-transform"
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
