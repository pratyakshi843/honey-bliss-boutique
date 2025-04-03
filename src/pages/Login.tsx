
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-honey-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link to="/" className="inline-block">
            <div className="relative w-16 h-16 bg-honey-500 rounded-full overflow-hidden flex items-center justify-center mx-auto">
              <span className="text-white text-2xl font-bold">HB</span>
              <div className="absolute -top-4 left-0 w-full h-full bg-honey-400 opacity-30 animate-honey-drip"></div>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-brown-800">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-honey-600 hover:text-honey-500">
              create a new account
            </Link>
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
