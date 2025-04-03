
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-brown-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We've received your order and will process it right away.
          </p>
          
          <div className="bg-honey-50 p-6 rounded-lg mb-8">
            <div className="flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-honey-600 mr-3" />
              <h3 className="text-xl font-semibold text-brown-800">Order Details</h3>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">#HB{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">UPI / Cash on Delivery</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">3-5 Business Days</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-8">
            We've sent an order confirmation to your email. You can also track your order status in your account dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-honey-600 hover:bg-honey-700"
              asChild
            >
              <Link to="/">
                Continue Shopping
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-honey-600 text-honey-700 hover:bg-honey-50"
              asChild
            >
              <Link to="/account">
                View Your Orders
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
