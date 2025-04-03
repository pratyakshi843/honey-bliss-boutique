
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Question {
  id: number;
  question: string;
  options: string[];
  selectedOption: string | null;
  imageUrl?: string;
}

interface QuizState {
  currentStep: number;
  questions: Question[];
  result: string | null;
  recommendedProducts: string[];
  completed: boolean;
  setSelectedOption: (questionId: number, option: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetQuiz: () => void;
}

const initialQuestions = [
  {
    id: 1,
    question: "What flavor profile makes your taste buds dance?",
    options: ["Bold & Rich", "Light & Delicate", "Floral & Aromatic", "Spicy & Warm", "Fruity & Sweet"],
    selectedOption: null,
    imageUrl: "https://images.unsplash.com/photo-1563225409-127c18758bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8aG9uZXklMjBkaXBwZXJ8fDB8fHx8MTcxMjU0ODA3NHww&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    id: 2,
    question: "How do you plan to incorporate honey into your daily routine?",
    options: ["Morning tea or coffee companion", "Baking delicious treats", "Natural sweetener for everything", "Health and wellness boost", "Part of my skincare regimen"],
    selectedOption: null,
    imageUrl: "https://images.unsplash.com/photo-1566313411120-2952f9086ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MzZ8fGhvbmV5JTIwdGVhfHwwfHx8fDE3MTI1NDgxMzZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    id: 3,
    question: "When you think of the perfect honey consistency, what comes to mind?",
    options: ["Thick and creamy", "Smooth and runny", "Slightly crystallized", "Whipped and spreadable", "I enjoy variety"],
    selectedOption: null,
    imageUrl: "https://images.unsplash.com/photo-1631985037442-34615734824e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mjh8fGhvbmV5JTIwamFyfHwwfHx8fDE3MTI1NDgxNzV8MA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    id: 4,
    question: "Which of these qualities matters most to you when selecting honey?",
    options: ["Organic certification", "Raw and unfiltered", "Local sourcing", "Unique flavor profiles", "Medicinal properties"],
    selectedOption: null,
    imageUrl: "https://images.unsplash.com/photo-1519218274327-b43572146216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MzZ8fG9yZ2FuaWMlMjBmb29kfHwwfHx8fDE3MTI1NDgyMDB8MA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    id: 5,
    question: "Which specific benefit are you hoping to get from your honey?",
    options: ["Immune system support", "Energy boost", "Seasonal allergy relief", "Better skin and hair", "Simply enjoying the taste"],
    selectedOption: null,
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGhlYWx0aHl8fDB8fHx8MTcxMjU0ODIzMHww&ixlib=rb-4.0.3&q=80&w=1080"
  }
];

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      questions: initialQuestions,
      result: null,
      recommendedProducts: [],
      completed: false,
      
      setSelectedOption: (questionId, option) => set((state) => ({
        questions: state.questions.map((q) => 
          q.id === questionId ? { ...q, selectedOption: option } : q
        )
      })),
      
      nextStep: () => set((state) => {
        if (state.currentStep >= state.questions.length - 1) {
          // Quiz is completed
          const flavorProfile = state.questions[0].selectedOption;
          const usage = state.questions[1].selectedOption;
          const consistency = state.questions[2].selectedOption;
          const quality = state.questions[3].selectedOption;
          const benefit = state.questions[4].selectedOption;
          
          // Enhanced recommendation logic
          let result = "";
          let recommendedProducts: string[] = [];
          
          // Analyze flavor profile preferences
          if (flavorProfile === "Bold & Rich") {
            result = "Forest Honey";
            recommendedProducts.push("forest", "buckwheat", "raw");
          } else if (flavorProfile === "Light & Delicate") {
            result = "Acacia Honey";
            recommendedProducts.push("acacia", "clover");
          } else if (flavorProfile === "Floral & Aromatic") {
            result = "Wildflower Honey";
            recommendedProducts.push("wildflower", "lavender");
          } else if (flavorProfile === "Spicy & Warm") {
            result = "Cinnamon Infused Honey";
            recommendedProducts.push("cinnamon", "ginger");
          } else if (flavorProfile === "Fruity & Sweet") {
            result = "Orange Blossom Honey";
            recommendedProducts.push("orange-blossom", "apple-blossom");
          }
          
          // Adjust based on usage
          if (usage === "Health and wellness boost") {
            if (!recommendedProducts.includes("manuka")) {
              recommendedProducts.push("manuka");
            }
          } else if (usage === "Baking delicious treats") {
            if (!recommendedProducts.includes("clover")) {
              recommendedProducts.push("clover");
            }
          }
          
          // Adjust based on desired benefits
          if (benefit === "Immune system support" && !recommendedProducts.includes("manuka")) {
            recommendedProducts.push("manuka");
          } else if (benefit === "Seasonal allergy relief" && !recommendedProducts.includes("wildflower")) {
            recommendedProducts.push("wildflower");
          }
          
          // Make sure we have at least 3 recommendations
          if (recommendedProducts.length < 3) {
            const additionalOptions = ["wildflower", "manuka", "forest", "raw", "orange-blossom"]
              .filter(id => !recommendedProducts.includes(id));
            
            while (recommendedProducts.length < 3 && additionalOptions.length > 0) {
              const randomIndex = Math.floor(Math.random() * additionalOptions.length);
              recommendedProducts.push(additionalOptions[randomIndex]);
              additionalOptions.splice(randomIndex, 1);
            }
          }
          
          // Limit to 3 recommendations
          if (recommendedProducts.length > 3) {
            recommendedProducts = recommendedProducts.slice(0, 3);
          }
          
          return {
            currentStep: state.currentStep + 1,
            completed: true,
            result,
            recommendedProducts
          };
        }
        
        return {
          currentStep: state.currentStep + 1
        };
      }),
      
      prevStep: () => set((state) => ({
        currentStep: Math.max(0, state.currentStep - 1)
      })),
      
      resetQuiz: () => set({
        currentStep: 0,
        questions: initialQuestions,
        result: null,
        recommendedProducts: [],
        completed: false
      }),
    }),
    {
      name: 'honey-quiz',
    }
  )
);
