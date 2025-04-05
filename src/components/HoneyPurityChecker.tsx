
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const HoneyPurityChecker = () => {
  const [selectedTest, setSelectedTest] = useState<string>('water');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isPerformingTest, setIsPerformingTest] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  const purityTests = [
    { 
      id: 'water', 
      name: 'Water Test', 
      description: 'Pure honey doesn\'t mix easily with water. When dropped in a glass of water, it should sink to the bottom and form a solid lump.',
      instructions: 'Fill a glass with water. Add a spoonful of honey. Pure honey will sink and stay at the bottom without dissolving quickly.'
    },
    { 
      id: 'flame', 
      name: 'Flame Test', 
      description: 'Pure honey will burn due to its low moisture content. Adulterated honey with added water or sugar syrup might not burn well.',
      instructions: 'Dip a cotton swab in your honey. Light it with a match or lighter. Pure honey will burn, while adulterated honey may not.'
    },
    { 
      id: 'thread', 
      name: 'Thread Formation Test', 
      description: 'Pure honey forms continuous threads when dropped from a height due to its high viscosity.',
      instructions: 'Take a spoonful of honey. Lift it above the jar and let it flow down. Pure honey should form a continuous thread without breaking immediately.'
    },
    { 
      id: 'paper', 
      name: 'Paper Test', 
      description: 'Pure honey is thick and doesn\'t get absorbed by paper, while adulterated honey might get absorbed.',
      instructions: 'Place a drop of honey on absorbent paper. Pure honey will stay in place without getting absorbed or leaving wet marks.'
    }
  ];

  const selectedTestInfo = purityTests.find(test => test.id === selectedTest);
  
  const performTest = () => {
    if (!userInput.trim()) {
      toast.error('Please describe your observations first');
      return;
    }
    
    setIsPerformingTest(true);
    
    // Simulate analysis time
    setTimeout(() => {
      // Simple keyword analysis of user input
      const inputLowerCase = userInput.toLowerCase();
      let result = '';
      
      if (selectedTest === 'water') {
        if (inputLowerCase.includes('sink') || inputLowerCase.includes('bottom') || inputLowerCase.includes('lump')) {
          result = 'Your honey shows signs of purity! It behaves like pure honey in the water test.';
        } else if (inputLowerCase.includes('dissolve') || inputLowerCase.includes('mix') || inputLowerCase.includes('float')) {
          result = 'Your honey may be adulterated. Pure honey should sink to the bottom without dissolving quickly.';
        } else {
          result = 'Results inconclusive. Try being more specific about how the honey behaved in water.';
        }
      } else if (selectedTest === 'flame') {
        if (inputLowerCase.includes('burn') || inputLowerCase.includes('flame')) {
          result = 'Your honey shows signs of purity! Pure honey should burn due to its low moisture content.';
        } else if (inputLowerCase.includes('not burn') || inputLowerCase.includes('won\'t burn')) {
          result = 'Your honey may be adulterated. Pure honey should burn when lit.';
        } else {
          result = 'Results inconclusive. Try being more specific about whether the honey burned or not.';
        }
      } else if (selectedTest === 'thread') {
        if (inputLowerCase.includes('thread') || inputLowerCase.includes('continuous') || inputLowerCase.includes('stream')) {
          result = 'Your honey shows signs of purity! Pure honey forms continuous threads when poured.';
        } else if (inputLowerCase.includes('break') || inputLowerCase.includes('discontinuous')) {
          result = 'Your honey may be adulterated. Pure honey should form continuous threads without breaking immediately.';
        } else {
          result = 'Results inconclusive. Try being more specific about how the honey flowed when poured.';
        }
      } else if (selectedTest === 'paper') {
        if (inputLowerCase.includes('not absorb') || inputLowerCase.includes('stay') || inputLowerCase.includes('no wet')) {
          result = 'Your honey shows signs of purity! Pure honey shouldn\'t be absorbed by paper.';
        } else if (inputLowerCase.includes('absorb') || inputLowerCase.includes('wet') || inputLowerCase.includes('soak')) {
          result = 'Your honey may be adulterated. Pure honey shouldn\'t be absorbed by paper or leave wet marks.';
        } else {
          result = 'Results inconclusive. Try being more specific about how the honey behaved on paper.';
        }
      }
      
      setTestResult(result);
      setIsPerformingTest(false);
      
      // Save user test data to backend (simulation)
      console.log('Saving user test data:', {
        testType: selectedTest,
        userObservation: userInput,
        result: result,
        timestamp: new Date().toISOString()
      });
    }, 2000);
  };
  
  const resetTest = () => {
    setUserInput('');
    setTestResult(null);
  };
  
  return (
    <div className="bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">Check Your Honey's Purity</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple at-home tests you can perform to check if your honey is pure and natural.
            Select a test, follow the instructions, and enter your observations below.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-8">
            <h3 className="font-semibold text-xl mb-4">Select a Test Method:</h3>
            <RadioGroup
              value={selectedTest}
              onValueChange={setSelectedTest}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {purityTests.map((test) => (
                <div key={test.id} className="flex items-start space-x-2 bg-amber-50 p-4 rounded-md border border-amber-100">
                  <RadioGroupItem value={test.id} id={test.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={test.id} className="text-lg font-medium cursor-pointer block mb-1">{test.name}</Label>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {selectedTestInfo && (
            <motion.div 
              key={selectedTest}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-honey-50 p-5 rounded-lg mb-6"
            >
              <h4 className="font-semibold mb-2">Test Instructions:</h4>
              <p className="mb-4">{selectedTestInfo.instructions}</p>
              
              <div className="mb-4">
                <Label htmlFor="observation" className="block mb-2">Enter your observations:</Label>
                <div className="flex gap-2">
                  <Input
                    id="observation"
                    placeholder="Describe what you observed during the test..."
                    className="flex-1"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <Button 
                    onClick={performTest} 
                    className="bg-honey-600 hover:bg-honey-700"
                    disabled={isPerformingTest}
                  >
                    {isPerformingTest ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </div>
              </div>
              
              {testResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-lg bg-white border border-honey-200"
                >
                  <h4 className="font-semibold mb-2">Analysis Result:</h4>
                  <p className="text-gray-800">{testResult}</p>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      className="text-honey-700 border-honey-500 hover:bg-honey-50"
                      onClick={resetTest}
                    >
                      Try Another Observation
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
          
          <div className="bg-amber-100 p-4 rounded-md mt-4">
            <p className="text-sm text-brown-700">
              <strong>Note:</strong> While these simple tests can give you an indication of honey quality, they are not 100% conclusive.
              For absolute certainty, laboratory testing is recommended. Our honey products undergo rigorous quality testing 
              to ensure purity and quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoneyPurityChecker;
