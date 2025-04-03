
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Question {
  id: number;
  question: string;
  options: string[];
  selectedOption: string | null;
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
    question: "What's your preferred sweetness level?",
    options: ["Very Sweet", "Moderately Sweet", "Subtle Sweetness", "Rich but not too sweet"],
    selectedOption: null
  },
  {
    id: 2,
    question: "How do you plan to use your honey?",
    options: ["Baking", "Tea/Coffee", "Directly as spread", "Cooking", "Health benefits"],
    selectedOption: null
  },
  {
    id: 3,
    question: "Do you prefer a specific flavor profile?",
    options: ["Floral", "Fruity", "Woody/Earthy", "Spicy", "Neutral"],
    selectedOption: null
  },
  {
    id: 4,
    question: "How important is organic certification to you?",
    options: ["Very important", "Somewhat important", "Not important"],
    selectedOption: null
  },
  {
    id: 5,
    question: "Do you have any specific health concerns you're addressing?",
    options: ["Immune support", "Digestive health", "Energy boost", "Allergy relief", "None specifically"],
    selectedOption: null
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
          const sweetness = state.questions[0].selectedOption;
          const usage = state.questions[1].selectedOption;
          const flavor = state.questions[2].selectedOption;
          
          // Simple recommendation logic
          let result = "Wildflower Honey";
          let recommendedProducts = ["wildflower", "manuka", "forest"];
          
          if (sweetness === "Very Sweet" && flavor === "Floral") {
            result = "Clover Honey";
            recommendedProducts = ["clover", "wildflower", "orange-blossom"];
          } else if (sweetness === "Moderately Sweet" && (flavor === "Woody/Earthy" || flavor === "Spicy")) {
            result = "Forest Honey";
            recommendedProducts = ["forest", "buckwheat", "manuka"];
          } else if (sweetness === "Subtle Sweetness" && usage === "Health benefits") {
            result = "Manuka Honey";
            recommendedProducts = ["manuka", "raw", "acacia"];
          } else if (flavor === "Fruity") {
            result = "Orange Blossom Honey";
            recommendedProducts = ["orange-blossom", "apple-blossom", "wildflower"];
          } else if (usage === "Baking") {
            result = "Wildflower Honey";
            recommendedProducts = ["wildflower", "clover", "acacia"];
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
