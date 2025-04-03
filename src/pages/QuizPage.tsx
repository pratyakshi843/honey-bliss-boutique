
import HoneyQuiz from '@/components/HoneyQuiz';
import { motion } from 'framer-motion';

const QuizPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">Find Your Perfect Honey</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take our quick quiz to discover which honey variety best matches your tastes and needs. 
          We'll recommend the perfect options just for you.
        </p>
      </motion.div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <HoneyQuiz />
      </div>
    </div>
  );
};

export default QuizPage;
