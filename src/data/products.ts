
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  weight: string;
  category: string;
  flavor: string;
  origin: string;
  bestFor: string[];
  featured?: boolean;
  premium?: boolean;
  organic?: boolean;
  rawHoney?: boolean;
  flavored?: boolean;
}

export const products: Product[] = [
  {
    id: "wildflower",
    name: "Wildflower Honey",
    description: "Our Wildflower Honey is a delightful blend of nectar collected from various seasonal flowers. Its flavor profile changes subtly throughout the year, creating a diverse tasting experience.",
    price: 450,
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8d2lsZGZsb3dlciUyMGhvbmV5fHwwfHx8fDE3MTI0NzMxNTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    weight: "500g",
    category: "Classic",
    flavor: "Sweet with floral notes",
    origin: "Uttar Pradesh Foothills",
    bestFor: ["Tea", "Baking", "Direct consumption"],
    featured: true,
    organic: true,
    rawHoney: true
  },
  {
    id: "clover",
    name: "Clover Honey",
    description: "Clover honey is known for its mild, sweet taste and light golden color. It's a classic favorite and works well in almost any application.",
    price: 380,
    image: "/lovable-uploads/1a63b582-2b89-4502-81ee-bb22791ff1ff.png",
    weight: "500g",
    category: "Classic",
    flavor: "Mild and sweet",
    origin: "Himalayan Valleys",
    bestFor: ["Tea", "Coffee", "Pancakes"],
    featured: true,
    organic: true
  },
  {
    id: "manuka",
    name: "Manuka Honey",
    description: "A premium honey known for its therapeutic properties and rich, distinctive taste. Manuka honey comes from the nectar of the Manuka tree flower.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1628634113229-103b9f7a75e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bWFudWthJTIwaG9uZXl8fDB8fHx8MTcxMjQ3MzI2NHww&ixlib=rb-4.0.3&q=80&w=1080",
    weight: "250g",
    category: "Premium",
    flavor: "Rich and distinctive",
    origin: "Imported",
    bestFor: ["Health purposes", "Medicinal use", "Direct consumption"],
    premium: true,
    rawHoney: true
  },
  {
    id: "acacia",
    name: "Acacia Honey",
    description: "This nearly transparent honey is extremely mild in flavor with hints of vanilla. It's slow to crystallize and perfect for those who prefer a subtle honey taste.",
    price: 520,
    image: "https://images.unsplash.com/photo-1645437235293-35e31de6aefa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YWNhY2lhJTIwaG9uZXl8fDB8fHx8MTcxMjQ3MzMxM3ww&ixlib=rb-4.0.3&q=80&w=1080",
    weight: "500g",
    category: "Specialty",
    flavor: "Mild with vanilla hints",
    origin: "Northern India",
    bestFor: ["Tea", "Drizzling over desserts", "Delicate dishes"],
    organic: true
  },
  {
    id: "orange-blossom",
    name: "Orange Blossom Honey",
    description: "With its distinctive citrus aroma and fruity taste, this honey carries the essence of orange groves. Medium-sweet with a fresh finish.",
    price: 480,
    image: "/lovable-uploads/7633e79e-8464-4ab4-bd41-f4659b89cc94.png",
    weight: "500g",
    category: "Specialty",
    flavor: "Citrusy with mild sweetness",
    origin: "Western India",
    bestFor: ["Breakfast", "Yogurt", "Marinades"],
    featured: true
  },
  {
    id: "buckwheat",
    name: "Buckwheat Honey",
    description: "Dark and robust, buckwheat honey has a strong, distinctive flavor reminiscent of blackstrap molasses. Rich in antioxidants and perfect for savory applications.",
    price: 550,
    image: "/lovable-uploads/de3f4879-7d34-4211-b176-a9b945b32dea.png",
    weight: "500g",
    category: "Specialty",
    flavor: "Strong and robust",
    origin: "Punjab Region",
    bestFor: ["Savory dishes", "Immune support", "Direct consumption"],
    rawHoney: true
  },
  {
    id: "forest",
    name: "Forest Honey",
    description: "Collected from the dense forests, this honey has a deep, complex flavor with woody notes and a rich amber color.",
    price: 580,
    image: "https://images.unsplash.com/photo-1586043826933-07e800e16b3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGhvbmV5fHwwfHx8fDE3MTI0NzM0ODh8MA&ixlib=rb-4.0.3&q=80&w=1080",
    weight: "500g",
    category: "Premium",
    flavor: "Complex with woody notes",
    origin: "Himalayan Forests",
    bestFor: ["Cheese pairing", "Sauces", "Direct consumption"],
    premium: true,
    organic: true
  },
  {
    id: "raw",
    name: "Raw Unfiltered Honey",
    description: "Completely unprocessed and unpasteurized, our raw honey retains all natural enzymes, vitamins, and beneficial properties. Minimally filtered to remove only the largest particles.",
    price: 650,
    image: "https://images.unsplash.com/photo-1594941950947-0a68614c9193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cmF3JTIwaG9uZXl8fDB8fHx8MTcxMjQ3MzUzN3ww&ixlib=rb-4.0.3&q=80&w=1080",
    weight: "500g",
    category: "Premium",
    flavor: "Bold and natural",
    origin: "Bijnor Region",
    bestFor: ["Health benefits", "Direct consumption", "Immune support"],
    premium: true,
    organic: true,
    rawHoney: true
  },
  {
    id: "apple-blossom",
    name: "Apple Blossom Honey",
    description: "Light and fruity with a subtle apple undertone. This seasonal honey has a beautiful light amber color and delicate flavor.",
    price: 490,
    image: "https://images.unsplash.com/photo-1644478015042-ad2b84eb2080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8aG9uZXklMjBqYXJ8fDB8fHx8MTcxMjQ3MzU3NXww&ixlib=rb-4.0.3&q=80&w=1080",
    weight: "500g",
    category: "Specialty",
    flavor: "Light with apple undertones",
    origin: "Kashmir Valleys",
    bestFor: ["Tea", "Baking", "Yogurt"],
    organic: true
  },
  // Changed from cinnamon to litchi honey
  {
    id: "litchi",
    name: "Litchi Honey",
    description: "Sweet and aromatic honey with the delicate flavor of litchi fruit. A unique tropical taste that adds a special touch to your beverages and desserts.",
    price: 550,
    image: "/lovable-uploads/67f52412-30b6-4623-a4ee-e712f3195212.png",
    weight: "250g",
    category: "Flavored",
    flavor: "Sweet and fruity",
    origin: "Bihar Litchi Orchards",
    bestFor: ["Desserts", "Tea", "Fruit salads", "Yogurt"],
    featured: true,
    flavored: true
  },
  {
    id: "lavender",
    name: "Lavender Honey",
    description: "Delicate floral honey with distinctive lavender notes. Harvested from bees that primarily feed on lavender blooms.",
    price: 580,
    image: "https://images.unsplash.com/photo-1528827166428-2bcdbf804cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bGF2ZW5kZXJ8fDB8fHx8MTcxMjU0NzI4N3ww&ixlib=rb-4.0.3&q=80&w=1080",
    weight: "250g",
    category: "Flavored",
    flavor: "Floral and aromatic",
    origin: "Kashmir Valleys",
    bestFor: ["Desserts", "Herbal teas", "Cheese pairings"],
    organic: true,
    flavored: true
  },
  {
    id: "ginger",
    name: "Ginger Honey",
    description: "A zesty infusion of fresh ginger in our premium honey. Excellent for soothing sore throats and adding a warming kick to beverages.",
    price: 520,
    image: "https://images.unsplash.com/photo-1573414404855-1164c952dba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Z2luZ2VyfHwwfHx8fDE3MTI1NDczMDl8MA&ixlib=rb-4.0.3&q=80&w=1080",
    weight: "250g",
    category: "Flavored",
    flavor: "Spicy and warming",
    origin: "Himalayan honey with local ginger",
    bestFor: ["Teas", "Immune support", "Sore throat remedy"],
    flavored: true,
    premium: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRecommendedProducts = (ids: string[]): Product[] => {
  return products.filter(product => ids.includes(product.id));
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getPremiumProducts = (): Product[] => {
  return products.filter(product => product.premium);
};

export const getOrganicProducts = (): Product[] => {
  return products.filter(product => product.organic);
};

export const getRawHoney = (): Product[] => {
  return products.filter(product => product.rawHoney);
};

export const getFlavoredHoney = (): Product[] => {
  return products.filter(product => product.flavored);
};
