
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Extended testimonials list for the dedicated reviews page
const allTestimonials = [
  {
    name: 'Priya Sharma',
    location: 'New Delhi, Delhi',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    initials: 'PS',
    stars: 5,
    date: '2025-02-15',
    text: "I've tried many honey brands over the years, but nothing compares to the quality and taste of this honey. It's pure, rich, and perfect for my morning tea ritual!"
  },
  {
    name: 'Arjun Patel',
    location: 'Mumbai, Maharashtra',
    image: 'https://randomuser.me/api/portraits/men/53.jpg',
    initials: 'AP',
    stars: 5,
    date: '2025-01-27',
    text: "As someone who's very careful about food quality, I appreciate how transparent this company is about their beekeeping practices. The honey is exceptional and I love supporting a sustainable business."
  },
  {
    name: 'Divya Agarwal',
    location: 'Bangalore, Karnataka',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    initials: 'DA',
    stars: 4,
    date: '2025-03-02',
    text: "The manuka honey has become a staple in my home. I use it for everything from sore throats to natural skincare. Worth every penny for its quality and effectiveness."
  },
  {
    name: 'Raj Malhotra',
    location: 'Jaipur, Rajasthan',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    initials: 'RM',
    stars: 5,
    date: '2025-02-28',
    text: "I'm from a family of beekeepers, so I know quality honey when I taste it. This is the real deal - authentic, raw, and packed with flavor. I've already ordered more for my relatives."
  },
  {
    name: 'Neha Verma',
    location: 'Chandigarh, Punjab',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    initials: 'NV',
    stars: 4,
    date: '2025-03-15',
    text: "The honey arrives beautifully packaged and makes for a perfect gift. I've sent jars to several friends, and they all love it. The wildflower variety has such a distinctive and delightful taste."
  },
  {
    name: 'Vikram Desai',
    location: 'Ahmedabad, Gujarat',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    initials: 'VD',
    stars: 5,
    date: '2025-01-05',
    text: "My grandmother used to keep bees, and this honey reminds me of hers - pure, natural, and with that perfect consistency. It's become an essential part of my daily routine."
  },
  {
    name: 'Kavita Singh',
    location: 'Lucknow, Uttar Pradesh',
    image: 'https://randomuser.me/api/portraits/women/81.jpg',
    initials: 'KS',
    stars: 3,
    date: '2025-02-10',
    text: "The honey is good, but I found the packaging could be improved. The jar lid sometimes sticks, making it difficult to open. The flavor is excellent though, very authentic."
  },
  {
    name: 'Rahul Mehra',
    location: 'Pune, Maharashtra',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    initials: 'RM',
    stars: 5,
    date: '2025-03-20',
    text: "I've been using this honey in my morning smoothies and post-workout drinks. Not only does it taste amazing, but I've noticed an improvement in my energy levels throughout the day."
  },
  {
    name: 'Ananya Mishra',
    location: 'Kolkata, West Bengal',
    image: 'https://randomuser.me/api/portraits/women/91.jpg',
    initials: 'AM',
    stars: 4,
    date: '2025-01-15',
    text: "I purchased the honey sampler box as a gift for my mother, and she hasn't stopped talking about how delicious each variety is. The presentation was beautiful too. Will definitely order again!"
  }
];

type FilterOption = 'all' | 5 | 4 | 3 | 2 | 1;
type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const Reviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  
  // Apply filters and sorting
  const filteredReviews = allTestimonials
    .filter(review => filterBy === 'all' || review.stars === filterBy)
    // For demo purposes, we'll consider the first 6 reviews as "verified purchases"
    .filter(review => !verifiedOnly || allTestimonials.indexOf(review) < 6)
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.stars - a.stars;
        case 'lowest':
          return a.stars - b.stars;
        default:
          return 0;
      }
    });
  
  const visibleTestimonials = filteredReviews.slice(0, visibleReviews);
  const hasMore = visibleReviews < filteredReviews.length;
  
  const loadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, filteredReviews.length));
  };
  
  const loadLess = () => {
    setVisibleReviews(prev => Math.max(prev - 3, 6));
  };
  
  // Calculate average rating
  const averageRating = allTestimonials.reduce((acc, curr) => acc + curr.stars, 0) / allTestimonials.length;
  
  // Count reviews by rating
  const ratingCounts = {} as Record<number, number>;
  allTestimonials.forEach(review => {
    ratingCounts[review.stars] = (ratingCounts[review.stars] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-brown-900 dark:to-brown-800">
      <div className="container mx-auto py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center text-brown-800 dark:text-honey-100 mb-4">Customer Reviews</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            See what our customers have to say about their experience with our honey products.
          </p>
        </motion.div>
        
        {/* Rating summary */}
        <div className="bg-white dark:bg-brown-700 rounded-xl shadow-lg p-6 md:p-8 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-brown-800 dark:text-honey-100 mb-2">Average Rating</h2>
              <div className="flex items-center justify-center md:justify-start">
                <span className="text-4xl font-bold text-honey-600 dark:text-honey-400">{averageRating.toFixed(1)}</span>
                <div className="flex ml-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star}
                      className={`h-6 w-6 ${star <= Math.round(averageRating) ? 'fill-honey-500 text-honey-500' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Based on {allTestimonials.length} reviews</p>
            </div>
            
            <div className="w-full md:w-auto">
              <h3 className="text-center md:text-left text-lg font-medium text-brown-700 dark:text-brown-100 mb-3">Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center mb-2">
                  <div className="flex items-center w-16">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{rating} stars</span>
                  </div>
                  <div className="relative w-48 h-3 mx-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div 
                      className="absolute top-0 left-0 h-full bg-honey-500 rounded-full"
                      style={{ width: `${((ratingCounts[rating] || 0) / allTestimonials.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{ratingCounts[rating] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filters and sorting */}
        <div className="mb-8 bg-white dark:bg-brown-700 rounded-lg shadow p-4 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Filter by rating:</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={filterBy === 'all' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterBy('all')}
                  className={filterBy === 'all' ? "bg-honey-500 hover:bg-honey-600" : ""}
                >
                  All
                </Button>
                {[5, 4, 3, 2, 1].map(rating => (
                  <Button
                    key={rating}
                    variant={filterBy === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterBy(rating as FilterOption)}
                    className={filterBy === rating ? "bg-honey-500 hover:bg-honey-600" : ""}
                  >
                    {rating} Stars
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sort by:</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-brown-600 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-honey-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                id="verified" 
                checked={verifiedOnly}
                onCheckedChange={setVerifiedOnly}
              />
              <Label htmlFor="verified">Verified purchases only</Label>
            </div>
          </div>
        </div>
        
        {/* Reviews list */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-brown-700 rounded-lg shadow-md p-6 relative"
              >
                <div className="absolute -top-4 -left-4 bg-honey-500 rounded-full p-2">
                  <Quote className="text-white h-4 w-4" />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.stars ? 'fill-honey-500 text-honey-500' : 'text-gray-300 dark:text-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(testimonial.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-200 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 border-2 border-honey-200 dark:border-honey-700">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-honey-200 text-honey-700 dark:bg-honey-700 dark:text-honey-200">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="font-semibold text-brown-700 dark:text-brown-100">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                  
                  {/* Verified badge - just for demo purposes */}
                  {allTestimonials.indexOf(testimonial) < 6 && (
                    <div className="ml-auto bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No reviews match your current filters.</p>
            <Button 
              variant="default" 
              className="mt-4 bg-honey-500 hover:bg-honey-600"
              onClick={() => {
                setFilterBy('all');
                setSortBy('newest');
                setVerifiedOnly(false);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Load more/less buttons */}
        {filteredReviews.length > 0 && (
          <div className="mt-10 text-center">
            {hasMore && (
              <Button 
                variant="outline"
                onClick={loadMore}
                className="flex items-center mx-auto"
              >
                Load More <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            )}
            
            {visibleReviews > 6 && (
              <Button 
                variant="link"
                onClick={loadLess}
                className="flex items-center mx-auto mt-2 text-honey-600 dark:text-honey-400"
              >
                Show Less <ChevronUp className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
