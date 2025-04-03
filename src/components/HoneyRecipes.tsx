
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const recipes = [
  {
    id: 'honey-lemon-tea',
    name: 'Soothing Honey Lemon Tea',
    description: 'A comforting hot beverage perfect for sore throats and cold days.',
    ingredients: ['1 cup hot water', '1 tbsp honey', '1/2 lemon, juiced', 'Optional: small piece of ginger'],
    instructions: 'Heat water until hot but not boiling. Add honey and stir until dissolved. Add fresh lemon juice and ginger if using. Stir well and enjoy while warm.',
    difficulty: 'Easy',
    prepTime: '5 minutes',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGhvbmV5JTIwdGVhfHwwfHx8fDE3MTI1NDc2Njl8MA&ixlib=rb-4.0.3&q=80&w=1080',
    category: 'Beverages'
  },
  {
    id: 'honey-granola',
    name: 'Homemade Honey Granola',
    description: 'Crunchy, sweet granola that makes the perfect breakfast or snack.',
    ingredients: ['3 cups rolled oats', '1 cup mixed nuts and seeds', '1/2 cup honey', '1/4 cup coconut oil', '1 tsp vanilla extract', '1 tsp cinnamon', 'Pinch of salt', '1/2 cup dried fruits'],
    instructions: 'Preheat oven to 150°C. Mix oats, nuts, and seeds. Warm honey and coconut oil, add vanilla. Combine wet and dry ingredients. Spread on baking sheet. Bake for 20-25 minutes, stirring occasionally. Cool completely before adding dried fruits. Store in airtight container.',
    difficulty: 'Medium',
    prepTime: '35 minutes',
    image: 'https://images.unsplash.com/photo-1517093157656-b9eccef01cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGdyYW5vbGF8fDB8fHx8MTcxMjU0NzcwNHww&ixlib=rb-4.0.3&q=80&w=1080',
    category: 'Breakfast'
  },
  {
    id: 'honey-glazed-carrots',
    name: 'Honey Glazed Carrots',
    description: 'Sweet and savory side dish that complements any meal.',
    ingredients: ['500g carrots, peeled and sliced', '2 tbsp butter', '3 tbsp honey', '1 tbsp fresh thyme leaves', 'Salt and pepper to taste'],
    instructions: 'Boil carrots until tender-crisp. In a pan, melt butter, add honey and thyme. Add drained carrots and cook until glazed. Season with salt and pepper. Serve hot.',
    difficulty: 'Easy',
    prepTime: '20 minutes',
    image: 'https://images.unsplash.com/photo-1533321942807-08e4008b2025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y2Fycm90c3x8MHx8fHwxNzEyNTQ3NzMwfDA&ixlib=rb-4.0.3&q=80&w=1080',
    category: 'Side Dishes'
  }
];

const uses = [
  {
    id: 'beauty',
    title: 'Beauty & Skincare',
    description: 'Honey is a natural humectant, drawing moisture to the skin and keeping it hydrated.',
    applications: [
      'Face mask: Mix honey with yogurt for a hydrating face mask',
      'Hair conditioner: Apply raw honey to damp hair, leave for 30 minutes',
      'Lip balm: Apply a small amount to chapped lips',
      'Bath soak: Add 1/4 cup to warm bath water for silky skin'
    ],
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZmFjZSUyMG1hc2t8fDB8fHx8MTcxMjU0Nzc1OXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    description: 'Honey has natural antibacterial and anti-inflammatory properties that support health.',
    applications: [
      'Sore throat remedy: Mix with warm water and lemon',
      'Cough suppressant: Take a spoonful before bed',
      'Natural energy booster: Add to morning smoothies',
      'Wound healing: Apply a thin layer to minor cuts and burns'
    ],
    image: 'https://images.unsplash.com/photo-1577039544285-5f5f03c7aebe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8aG9uZXklMjBoZWFsdGh8fDB8fHx8MTcxMjU0Nzc4M3ww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'home',
    title: 'Home Uses',
    description: 'Beyond food and health, honey has practical applications around the home.',
    applications: [
      'Natural preservative: Extends shelf life of baked goods',
      'Metal polish: Apply to brass or silver, then buff',
      'Candle making: Create beeswax and honey candles',
      'Furniture polish: Mix with olive oil for wood furniture'
    ],
    image: 'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y2FuZGxlfHwwfHx8fDE3MTI1NDc4MDV8MA&ixlib=rb-4.0.3&q=80&w=1080'
  }
];

const HoneyRecipes = () => {
  const [activeRecipe, setActiveRecipe] = useState(recipes[0].id);
  const [activeUse, setActiveUse] = useState(uses[0].id);
  
  return (
    <div className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">Honey in Your Daily Life</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover creative and delicious ways to incorporate the goodness of honey into your daily routine.
          </p>
        </div>
        
        <Tabs defaultValue="recipes" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-honey-100">
              <TabsTrigger value="recipes" className="data-[state=active]:bg-honey-500 data-[state=active]:text-white">
                Honey Recipes
              </TabsTrigger>
              <TabsTrigger value="uses" className="data-[state=active]:bg-honey-500 data-[state=active]:text-white">
                Beneficial Uses
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recipes" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xl font-semibold text-brown-800 mb-4">Our Favorite Recipes</h3>
                {recipes.map((recipe) => (
                  <Card 
                    key={recipe.id} 
                    className={`cursor-pointer transition-all ${activeRecipe === recipe.id ? 'border-honey-500 shadow-md' : 'border-transparent'}`}
                    onClick={() => setActiveRecipe(recipe.id)}
                  >
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">{recipe.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {recipes.map((recipe) => recipe.id === activeRecipe && (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <div className="md:flex">
                          <div className="md:w-2/5 h-64 overflow-hidden">
                            <img 
                              src={recipe.image} 
                              alt={recipe.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="md:w-3/5">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <CardTitle>{recipe.name}</CardTitle>
                                <Badge className="bg-honey-500">{recipe.category}</Badge>
                              </div>
                              <div className="flex space-x-4 text-sm text-gray-500">
                                <span>Difficulty: {recipe.difficulty}</span>
                                <span>Time: {recipe.prepTime}</span>
                              </div>
                              <CardDescription>{recipe.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Ingredients:</h4>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                  {recipe.ingredients.map((ingredient, idx) => (
                                    <li key={idx}>{ingredient}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm mb-1">Instructions:</h4>
                                <p className="text-sm">{recipe.instructions}</p>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="text-honey-700 border-honey-500 hover:bg-honey-50">
                                Print Recipe
                              </Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="uses" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xl font-semibold text-brown-800 mb-4">Honey Beyond Food</h3>
                {uses.map((use) => (
                  <Card 
                    key={use.id} 
                    className={`cursor-pointer transition-all ${activeUse === use.id ? 'border-honey-500 shadow-md' : 'border-transparent'}`}
                    onClick={() => setActiveUse(use.id)}
                  >
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">{use.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{use.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {uses.map((use) => use.id === activeUse && (
                    <motion.div
                      key={use.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <div className="md:flex">
                          <div className="md:w-2/5 h-64 overflow-hidden">
                            <img 
                              src={use.image} 
                              alt={use.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="md:w-3/5">
                            <CardHeader>
                              <CardTitle>{use.title}</CardTitle>
                              <CardDescription>{use.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <h4 className="font-semibold text-sm mb-2">Applications:</h4>
                              <ul className="space-y-3">
                                {use.applications.map((app, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="bg-honey-200 text-honey-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <span className="text-sm">{app}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="text-honey-700 border-honey-500 hover:bg-honey-50">
                                Learn More
                              </Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HoneyRecipes;
