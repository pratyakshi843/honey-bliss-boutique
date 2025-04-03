import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore, useFavoritesStore } from '../store/hooks';
import { toast } from 'sonner';
import { getProductById } from '../data/products';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  ArrowLeft,
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Star 
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [rotateY, setRotateY] = useState(0);
  
  const addToCart = useCartStore((state) => state.addToCart);
  const favorites = useFavoritesStore((state) => state.items);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const product = getProductById(id || '');
  const isFavorite = favorites.some(item => item.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        weight: product.weight,
      });
    }
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
    });
    
    if (isFavorite) {
      toast.info(`${product.name} removed from favorites`);
    } else {
      toast.success(`${product.name} added to favorites`);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const rotationDegree = ((x / width) - 0.5) * 20;
    setRotateY(rotationDegree);
  };
  
  const handleMouseLeave = () => {
    setRotateY(0);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/shop" className="flex items-center text-honey-600 hover:text-honey-700 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div 
            className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md"
            style={{
              perspective: '1000px'
            }}
          >
            <div 
              className="overflow-hidden rounded-lg relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateY(${rotateY}deg)`,
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d'
              }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover transform transition-transform duration-500"
              />
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent opacity-60 pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {product.premium && (
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                Premium
              </span>
            )}
            {product.organic && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Organic
              </span>
            )}
            {product.rawHoney && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Raw
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-brown-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn("w-5 h-5", i < 4 ? "fill-current" : "")} 
                />
              ))}
            </div>
            <span className="ml-2 text-gray-500 text-sm">4.0 (12 reviews)</span>
          </div>
          
          <div className="text-2xl font-bold text-honey-700 mb-6">
            ₹{product.price.toLocaleString()}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-start mb-3">
              <div className="text-gray-700 w-24">Origin:</div>
              <div>{product.origin}</div>
            </div>
            <div className="flex items-start mb-3">
              <div className="text-gray-700 w-24">Flavor:</div>
              <div>{product.flavor}</div>
            </div>
            <div className="flex items-start">
              <div className="text-gray-700 w-24">Best For:</div>
              <div>
                {product.bestFor.map((use, index) => (
                  <span key={index}>
                    {use}
                    {index < product.bestFor.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center border rounded-md">
              <button
                onClick={decreaseQuantity}
                className="p-2 focus:outline-none"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="p-2 focus:outline-none"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="ml-4 text-gray-500">{product.weight}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              className="flex-1 bg-honey-600 hover:bg-honey-700"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className={cn(
                "border-honey-600 transition-all duration-300",
                isFavorite 
                  ? "bg-honey-50 text-honey-700" 
                  : "text-honey-700 hover:bg-honey-50"
              )}
              onClick={handleToggleFavorite}
            >
              <Heart className={cn("mr-2 h-5 w-5", isFavorite && "fill-honey-600")} />
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <Truck className="text-honey-600 mr-2 h-5 w-5" />
              <span>Free shipping for orders over ₹999</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="text-honey-600 mr-2 h-5 w-5" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center">
              <RefreshCw className="text-honey-600 mr-2 h-5 w-5" />
              <span>Easy returns within 15 days</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full border-b grid grid-cols-3 rounded-none bg-transparent">
            <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-honey-600 rounded-none data-[state=active]:text-honey-700 bg-transparent">
              Product Details
            </TabsTrigger>
            <TabsTrigger value="benefits" className="data-[state=active]:border-b-2 data-[state=active]:border-honey-600 rounded-none data-[state=active]:text-honey-700 bg-transparent">
              Health Benefits
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-honey-600 rounded-none data-[state=active]:text-honey-700 bg-transparent">
              Reviews (12)
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-brown-800">Product Specifications</h3>
                <div className="space-y-2">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Net Weight</span>
                    <span>{product.weight}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Consistency</span>
                    <span>Thick & Smooth</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Color</span>
                    <span>Amber</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Shelf Life</span>
                    <span>24 Months</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Storage</span>
                    <span>Cool, Dry Place</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-3 text-brown-800">About {product.name}</h3>
                <p className="text-gray-700 mb-4">
                  Our {product.name} is sourced from the pristine valleys of {product.origin}. It is harvested using traditional methods to ensure the highest quality and purity.
                </p>
                <p className="text-gray-700 mb-4">
                  This honey variety is known for its {product.flavor.toLowerCase()} flavor profile, making it perfect for {product.bestFor.map(use => use.toLowerCase()).join(', ')}.
                </p>
                <p className="text-gray-700">
                  All our honey is 100% pure and natural, with no added sugars, preservatives, or artificial ingredients. We are committed to sustainable beekeeping practices that protect bees and their natural habitats.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-brown-800">Health Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-honey-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-honey-500 rounded-full w-2 h-2"></div>
                    </div>
                    <p>Rich in antioxidants that help protect your body from cell damage due to free radicals</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-honey-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-honey-500 rounded-full w-2 h-2"></div>
                    </div>
                    <p>Contains antibacterial and antifungal properties, helping to fight infections</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-honey-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-honey-500 rounded-full w-2 h-2"></div>
                    </div>
                    <p>May help soothe a sore throat and suppress cough</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-honey-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-honey-500 rounded-full w-2 h-2"></div>
                    </div>
                    <p>Provides a natural source of energy with its natural sugars</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-honey-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-honey-500 rounded-full w-2 h-2"></div>
                    </div>
                    <p>May help improve cholesterol levels and lower risk factors for heart disease</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-brown-800">Nutritional Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-3">Nutritional values per 100g</p>
                  <div className="space-y-2">
                    <div className="flex justify-between pb-2 border-b">
                      <span>Energy</span>
                      <span>304 kcal</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Carbohydrates</span>
                      <span>82.4 g</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Sugars</span>
                      <span>82.1 g</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Fat</span>
                      <span>0 g</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Protein</span>
                      <span>0.3 g</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Salt</span>
                      <span>0.01 g</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Recommended Usage</h4>
                  <p className="text-gray-700">
                    For maximum health benefits, consume 1-2 tablespoons daily. Can be added to warm water, tea, or enjoyed directly.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/4 text-center mb-6 md:mb-0">
                  <div className="text-5xl font-bold text-honey-600">4.0</div>
                  <div className="flex justify-center text-amber-500 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn("w-5 h-5", i < 4 ? "fill-current" : "")} 
                      />
                    ))}
                  </div>
                  <div className="text-gray-500 text-sm">Based on 12 reviews</div>
                </div>
                
                <div className="md:w-3/4 md:pl-8">
                  <div className="space-y-2">
                    {[
                      { stars: 5, percentage: 65 },
                      { stars: 4, percentage: 20 },
                      { stars: 3, percentage: 10 },
                      { stars: 2, percentage: 5 },
                      { stars: 1, percentage: 0 }
                    ].map((rating) => (
                      <div key={rating.stars} className="flex items-center">
                        <div className="w-12 text-sm">{rating.stars} stars</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mx-4">
                          <div 
                            className="bg-honey-500 h-2 rounded-full" 
                            style={{ width: `${rating.percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-right text-sm">{rating.percentage}%</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center md:text-left">
                    <Button 
                      variant="outline" 
                      className="border-honey-600 text-honey-700 hover:bg-honey-50"
                    >
                      Write a Review
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    name: "Ankit Sharma",
                    date: "March 15, 2025",
                    rating: 5,
                    title: "Excellent quality honey!",
                    review: "This honey has a wonderful aroma and taste. It's very smooth and has a perfect consistency. I use it in my morning tea and it dissolves quickly. Will definitely purchase again!"
                  },
                  {
                    name: "Priya Patel",
                    date: "February 28, 2025",
                    rating: 4,
                    title: "Great honey, but packaging could be improved",
                    review: "The honey itself is excellent - pure, natural, and delicious. My only issue is with the packaging. The lid is a bit difficult to open, especially if some honey gets on it. But the product itself is worth it."
                  },
                  {
                    name: "Rahul Kapoor",
                    date: "January 10, 2025",
                    rating: 5,
                    title: "Best honey I've ever tasted",
                    review: "I've tried many honey brands over the years, but this one stands out. The flavor is rich and complex, and you can really taste the difference compared to mass-produced honey. Highly recommended!"
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-honey-200 rounded-full flex items-center justify-center text-honey-700 font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex text-amber-500 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn("w-4 h-4", i < review.rating ? "fill-current" : "")} 
                        />
                      ))}
                    </div>
                    
                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
