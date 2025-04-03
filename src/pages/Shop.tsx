
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/ProductCard';
import { products, Product } from '@/data/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<{
    premium: boolean;
    organic: boolean;
    rawHoney: boolean;
  }>({
    premium: false,
    organic: false,
    rawHoney: false,
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Categories
  const categories = [...new Set(products.map((product) => product.category))];
  
  // Effect for filtering products
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (activeCategory) {
      result = result.filter((product) => product.category === activeCategory);
    }
    
    // Apply other filters
    if (activeFilters.premium) {
      result = result.filter((product) => product.premium);
    }
    
    if (activeFilters.organic) {
      result = result.filter((product) => product.organic);
    }
    
    if (activeFilters.rawHoney) {
      result = result.filter((product) => product.rawHoney);
    }
    
    setFilteredProducts(result);
  }, [activeCategory, activeFilters]);
  
  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };
  
  const handleFilterChange = (filter: keyof typeof activeFilters) => {
    setActiveFilters({
      ...activeFilters,
      [filter]: !activeFilters[filter],
    });
  };
  
  const clearFilters = () => {
    setActiveCategory(null);
    setActiveFilters({
      premium: false,
      organic: false,
      rawHoney: false,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-brown-800 mb-6">Our Honey Collection</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filters Button */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <Button
            variant="outline"
            className="flex items-center border-honey-500 text-honey-700"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          
          <div className="text-sm text-gray-500">
            {filteredProducts.length} products
          </div>
        </div>
        
        {/* Sidebar Filters */}
        <div className={`
          md:w-64 space-y-6 bg-white p-4 rounded-lg shadow-md
          ${filtersOpen ? 'block' : 'hidden'} md:block
          fixed md:static top-0 left-0 h-full md:h-auto z-40 w-72 md:w-64
        `}>
          <div className="flex justify-between items-center md:hidden">
            <h3 className="font-semibold">Filters</h3>
            <button 
              onClick={() => setFiltersOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              <div>
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`block w-full text-left px-2 py-1 rounded-md ${
                    activeCategory === null
                      ? 'bg-honey-100 text-honey-700 font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
              </div>
              
              {categories.map((category) => (
                <div key={category}>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full text-left px-2 py-1 rounded-md ${
                      activeCategory === category
                        ? 'bg-honey-100 text-honey-700 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-3">Filter By</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="premium"
                  checked={activeFilters.premium}
                  onCheckedChange={() => handleFilterChange('premium')}
                />
                <Label htmlFor="premium">Premium Honey</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="organic"
                  checked={activeFilters.organic}
                  onCheckedChange={() => handleFilterChange('organic')}
                />
                <Label htmlFor="organic">Organic</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raw"
                  checked={activeFilters.rawHoney}
                  onCheckedChange={() => handleFilterChange('rawHoney')}
                />
                <Label htmlFor="raw">Raw Honey</Label>
              </div>
            </div>
          </div>
          
          {(activeCategory || activeFilters.premium || activeFilters.organic || activeFilters.rawHoney) && (
            <>
              <Separator />
              <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </>
          )}
        </div>
        
        {/* Backdrop for mobile filter */}
        {filtersOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setFiltersOpen(false)}
          ></div>
        )}
        
        {/* Products Grid */}
        <div className="flex-1">
          <div className="hidden md:flex justify-between items-center mb-6">
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-gray-500">
                  {filteredProducts.length} products
                </div>
              </div>
              
              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-6">
                <div className="space-y-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 sm:w-2/3">
                          <h3 className="text-xl font-semibold mb-2 text-brown-800">{product.name}</h3>
                          <p className="text-honey-700 font-bold mb-2">₹{product.price.toLocaleString()}</p>
                          <p className="text-gray-600 mb-4">{product.description}</p>
                          <div className="flex space-x-2 mb-4">
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
                          <Button className="bg-honey-600 hover:bg-honey-700">Add to Cart</Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Mobile Product Grid */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="bg-honey-50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2 text-brown-800">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or browse our entire collection.</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
