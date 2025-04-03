
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuizState {
  currentStep: number;
  questions: {
    id: number;
    question: string;
    options: string[];
    selectedOption: string | null;
  }[];
  result: string | null;
  recommendedProducts: string[];
  completed: boolean;
}

// Load quiz progress from localStorage if available
const loadQuizFromStorage = (): QuizState => {
  if (typeof window === 'undefined') {
    return {
      currentStep: 0,
      questions: [
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
      ],
      result: null,
      recommendedProducts: [],
      completed: false
    };
  }
  
  try {
    const storedQuiz = localStorage.getItem('honeyQuiz');
    return storedQuiz 
      ? JSON.parse(storedQuiz) 
      : {
          currentStep: 0,
          questions: [
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
          ],
          result: null,
          recommendedProducts: [],
          completed: false
        };
  } catch (error) {
    console.error('Failed to load quiz from localStorage', error);
    return {
      currentStep: 0,
      questions: [
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
      ],
      result: null,
      recommendedProducts: [],
      completed: false
    };
  }
};

const initialState: QuizState = loadQuizFromStorage();

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<{ questionId: number; option: string }>) => {
      const question = state.questions.find(q => q.id === action.payload.questionId);
      if (question) {
        question.selectedOption = action.payload.option;
      }
      
      // Save to localStorage
      localStorage.setItem('honeyQuiz', JSON.stringify(state));
    },
    nextStep: (state) => {
      if (state.currentStep < state.questions.length) {
        state.currentStep += 1;
      }
      
      // Check if quiz is completed
      if (state.currentStep === state.questions.length) {
        state.completed = true;
        
        // Determine result and recommended products based on answers
        const sweetness = state.questions[0].selectedOption;
        const usage = state.questions[1].selectedOption;
        const flavor = state.questions[2].selectedOption;
        
        // Simple recommendation logic
        if (sweetness === "Very Sweet" && flavor === "Floral") {
          state.result = "Clover Honey";
          state.recommendedProducts = ["clover", "wildflower", "orange-blossom"];
        } else if (sweetness === "Moderately Sweet" && (flavor === "Woody/Earthy" || flavor === "Spicy")) {
          state.result = "Forest Honey";
          state.recommendedProducts = ["forest", "buckwheat", "manuka"];
        } else if (sweetness === "Subtle Sweetness" && usage === "Health benefits") {
          state.result = "Manuka Honey";
          state.recommendedProducts = ["manuka", "raw", "acacia"];
        } else if (flavor === "Fruity") {
          state.result = "Orange Blossom Honey";
          state.recommendedProducts = ["orange-blossom", "apple-blossom", "wildflower"];
        } else if (usage === "Baking") {
          state.result = "Wildflower Honey";
          state.recommendedProducts = ["wildflower", "clover", "acacia"];
        } else {
          state.result = "Wildflower Honey";
          state.recommendedProducts = ["wildflower", "manuka", "forest"];
        }
      }
      
      // Save to localStorage
      localStorage.setItem('honeyQuiz', JSON.stringify(state));
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
      
      // Save to localStorage
      localStorage.setItem('honeyQuiz', JSON.stringify(state));
    },
    resetQuiz: (state) => {
      state.currentStep = 0;
      state.questions.forEach(question => {
        question.selectedOption = null;
      });
      state.result = null;
      state.recommendedProducts = [];
      state.completed = false;
      
      // Save to localStorage
      localStorage.setItem('honeyQuiz', JSON.stringify(state));
    }
  },
});

export const { 
  setSelectedOption, 
  nextStep, 
  prevStep, 
  resetQuiz 
} = quizSlice.actions;

export default quizSlice.reducer;
