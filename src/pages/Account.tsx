
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { User, ShoppingBag, Heart, LogOut, Settings, Edit2 } from 'lucide-react';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Simulate loading user data
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Simulate fetching user data
    const timer = setTimeout(() => {
      // Simulate fetching user profile details from API
      setProfileData({
        name: user?.name || 'Pratyakshi Chauhan',
        email: user?.email || 'pratyakshimoni@gmail.com',
        phone: '+91 8267062472',
        address: 'Vill-Shivpuri, Post-Afzalgarh',
        city: 'Bijnor',
        state: 'Uttar Pradesh',
        pincode: '246746',
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      toast.success('Profile updated successfully');
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
  };

  // Order history data (sample)
  const orderHistory = [
    {
      id: 'ORD-2025-0451',
      date: '2025-03-28',
      status: 'Delivered',
      total: 1850,
      items: [
        { name: 'Manuka Honey', quantity: 1, price: 1200 },
        { name: 'Forest Honey', quantity: 1, price: 650 },
      ],
    },
    {
      id: 'ORD-2025-0287',
      date: '2025-02-15',
      status: 'Delivered',
      total: 950,
      items: [
        { name: 'Acacia Honey', quantity: 1, price: 550 },
        { name: 'Raw Unfiltered Honey', quantity: 1, price: 400 },
      ],
    },
  ];

  return (
    <div className="bg-honey-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center text-honey-600 text-2xl font-bold">
                    {profileData.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown-800">{profileData.name}</h3>
                    <p className="text-sm text-gray-500">{profileData.email}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <nav className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/account')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/account?tab=orders')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Order History
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/favorites')}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/account?tab=settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-brown-800">My Profile</h2>
                      <Button 
                        size="sm" 
                        variant={isEditing ? "default" : "outline"}
                        onClick={handleEditToggle}
                      >
                        {isEditing ? 'Save Changes' : (
                          <>
                            <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {loading ? (
                      <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-honey-600"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            disabled={true}
                            className="bg-gray-50"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={profileData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={profileData.state}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            value={profileData.pincode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="orders">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-brown-800 mb-2">Order History</h2>
                      <p className="text-gray-600">Track and view your order history</p>
                    </div>
                    
                    {loading ? (
                      <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-honey-600"></div>
                      </div>
                    ) : orderHistory.length > 0 ? (
                      <div className="space-y-6">
                        {orderHistory.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex flex-wrap justify-between items-center mb-4">
                              <div>
                                <h3 className="font-semibold">{order.id}</h3>
                                <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-amber-100 text-amber-800'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            
                            <Separator className="my-3" />
                            
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between py-2">
                                <span>{item.name} × {item.quantity}</span>
                                <span>₹{item.price}</span>
                              </div>
                            ))}
                            
                            <Separator className="my-3" />
                            
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span>₹{order.total}</span>
                            </div>
                            
                            <div className="mt-4 text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-honey-600 border-honey-600 hover:bg-honey-50"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                        <Button
                          onClick={() => navigate('/shop')}
                          className="bg-honey-600 hover:bg-honey-700"
                        >
                          Start Shopping
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="settings">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-brown-800 mb-2">Account Settings</h2>
                      <p className="text-gray-600">Manage your account preferences</p>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Order Updates</p>
                              <p className="text-sm text-gray-500">Receive updates on your order status</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-honey-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-honey-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Promotions & Offers</p>
                              <p className="text-sm text-gray-500">Receive updates on sales and special offers</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-honey-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-honey-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Newsletter</p>
                              <p className="text-sm text-gray-500">Receive our monthly newsletter with honey tips</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-honey-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-honey-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Password</h3>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;
