
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-honey-50 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/honeycomb.png")',
            backgroundSize: '300px'
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-brown-800 mb-6">Contact Us</h1>
            <p className="text-xl text-brown-600">
              Have a question, feedback, or inquiry? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Contact Info & Form */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-brown-800 mb-6">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                We're here to help and answer any questions you might have. We look forward to hearing from you!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-honey-100 p-3 rounded-full mr-4">
                    <MapPin className="text-honey-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      Vill-Shivpuri, Post-Afzalgarh, Bijnor, Uttar Pradesh
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-honey-100 p-3 rounded-full mr-4">
                    <Phone className="text-honey-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-1">Phone Number</h3>
                    <p className="text-gray-600">+91 8267062472</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-honey-100 p-3 rounded-full mr-4">
                    <Mail className="text-honey-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-1">Email Address</h3>
                    <p className="text-gray-600">pratyakshi843@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-honey-100 p-3 rounded-full mr-4">
                    <Clock className="text-honey-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-brown-800 mb-4">Payment Options</h3>
                <div className="bg-white p-6 border rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-4">Scan the QR code to make a payment:</p>
                  <div className="bg-white p-3 rounded-lg border inline-block">
                    {/* Replace with actual QR code image */}
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">QR Code for Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                <h2 className="text-2xl font-bold text-brown-800 mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Your Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Your Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-honey-600 hover:bg-honey-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>
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
            <p className="text-gray-700">
              We welcome visitors to our honey farm by appointment. Come see how our honey is made and meet the bees!
            </p>
          </motion.div>
          
          <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
            {/* Embed an iframe for Google Maps here or use a static map image */}
            <div className="h-80 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Map Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
