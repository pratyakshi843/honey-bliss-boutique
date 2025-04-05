import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
    notes: '',
  });
  
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const shippingFee = totalAmount >= 999 ? 0 : 100;
  const finalAmount = totalAmount + shippingFee;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      console.log('Saving order data:', {
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        orderDetails: {
          items: items,
          totalAmount: totalAmount,
          shippingFee: shippingFee,
          finalAmount: finalAmount,
          paymentMethod: formData.paymentMethod,
          notes: formData.notes,
        },
        timestamp: new Date().toISOString(),
        status: 'pending',
      });
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-success');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-brown-800 mb-6">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart before proceeding to checkout.</p>
          <Button 
            onClick={() => navigate('/shop')}
            className="bg-honey-600 hover:bg-honey-700"
          >
            Browse Products
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-brown-800 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your order by providing your shipping and payment details</p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-brown-800 mb-6">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="pincode">PIN Code <span className="text-red-500">*</span></Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <h2 className="text-xl font-semibold text-brown-800 mb-6">Payment Method</h2>
            
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={handleRadioChange}
              className="space-y-4 mb-6"
            >
              <div className="flex items-center space-x-3 border p-4 rounded-md">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI / QR Payment</Label>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-bold">
                    P
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 border p-4 rounded-md">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                <div className="w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center">
                  ₹
                </div>
              </div>
            </RadioGroup>
            
            {formData.paymentMethod === 'upi' && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-sm text-gray-700 mb-4">
                  Please scan the QR code below to complete your payment via UPI.
                </p>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg border inline-block shadow-md">
                    <img 
                      src="/lovable-uploads/69d2da0a-d1dc-40cc-8937-e8c2180124d1.png" 
                      alt="UPI QR Code" 
                      className="w-64 h-64 object-contain"
                    />
                  </div>
                  <p className="mt-4 text-xs text-center text-gray-500 max-w-xs">
                    After scanning the QR code, please enter your UPI PIN to complete the payment. 
                    Your order will be processed once payment is confirmed.
                  </p>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions for delivery?"
                rows={3}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-honey-600 hover:bg-honey-700 text-lg py-6"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Place Order
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-semibold text-brown-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.weight} x {item.quantity}</p>
                  </div>
                  <div className="text-honey-700 font-medium">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold mt-4">
                <span>Total</span>
                <span className="text-honey-700">₹{finalAmount.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-honey-50 rounded-lg">
              <p className="text-sm text-gray-700">
                {shippingFee === 0 ? (
                  "You've qualified for free shipping!"
                ) : (
                  `Add ₹${999 - totalAmount} more to your cart to qualify for free shipping.`
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
