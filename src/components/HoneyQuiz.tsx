
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { 
  setSelectedOption, 
  nextStep, 
  prevStep, 
  resetQuiz 
} from '../store/quizSlice';
import { Button } from './ui/button';
import { getRecommendedProducts } from '../data/products';
import ProductCard from './ProductCard';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HoneyQuiz = () => {
  const dispatch = useAppDispatch();
  const { currentStep, questions, completed, result, recommendedProducts } = useAppSelector(
    (state) => state.quiz
  );

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + (completed ? 1 : 0)) / questions.length) * 100;
  
  const handleOptionSelect = (option: string) => {
    dispatch(setSelectedOption({ questionId: currentQuestion.id, option }));
  };
  
  const handleNext = () => {
    dispatch(nextStep());
  };
  
  const handlePrev = () => {
    dispatch(prevStep());
  };
  
  const handleReset = () => {
    dispatch(resetQuiz());
  };
  
  const recommendedProductsData = getRecommendedProducts(recommendedProducts);
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-honey-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-brown-800">
              {currentQuestion.question}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option) => (
                <div
                  key={option}
                  className={`quiz-option ${
                    currentQuestion.selectedOption === option ? 'active' : ''
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  <span className="block text-brown-800">{option}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              {currentStep > 0 ? (
                <Button
                  onClick={handlePrev}
                  variant="outline"
                  className="border-honey-500 text-honey-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button
                onClick={handleNext}
                className="bg-honey-600 hover:bg-honey-700"
                disabled={!currentQuestion.selectedOption}
              >
                {currentStep === questions.length - 1 ? "Finish" : "Next"}
                {currentStep !== questions.length - 1 && (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-honey-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🍯</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 text-center text-brown-800">
              Your Perfect Match: {result}
            </h2>
            
            <p className="text-gray-600 text-center mb-8 max-w-lg">
              Based on your preferences, we recommend {result} as your perfect honey match. 
              Here are some options you might enjoy:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {recommendedProductsData.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-honey-500 text-honey-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HoneyQuiz;
