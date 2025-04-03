
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brown-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Honey Bliss Boutique</h3>
            <p className="text-gray-300 mb-4">
              Premium quality honey from the pristine valleys of Uttar Pradesh. 
              Natural, pure, and packed with goodness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-honey-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-honey-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-honey-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-honey-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-honey-400 transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-300 hover:text-honey-400 transition-colors">Honey Quiz</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-honey-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-honey-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-honey-400 mt-1 mr-2" />
                <p className="text-gray-300">
                  Vill-Shivpuri, Post-Afzalgarh, Bijnor, Uttar Pradesh
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-honey-400 mr-2" />
                <p className="text-gray-300">+91 8267062472</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-honey-400 mr-2" />
                <p className="text-gray-300">pratyakshi843@gmail.com</p>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-3">
              Subscribe to receive updates on new honey varieties and special offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 bg-brown-700 text-white rounded-l-md focus:outline-none flex-1"
              />
              <button 
                type="submit"
                className="bg-honey-600 hover:bg-honey-700 px-3 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-brown-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Honey Bliss Boutique. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-honey-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-honey-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="hover:text-honey-400 transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
