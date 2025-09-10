"use client";
import { useState } from 'react';
import { FaCalculator, FaAppleAlt, FaDrumstickBite, FaEgg, FaWeight, FaRulerVertical, FaRunning, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const MacroPage = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [dietType, setDietType] = useState('balanced');
  const [results, setResults] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  } | null>(null);
  const [errors, setErrors] = useState<{age?: string; height?: string; weight?: string}>({});

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise', multiplier: 1.2 },
    { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week', multiplier: 1.375 },
    { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week', multiplier: 1.55 },
    { value: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week', multiplier: 1.725 },
    { value: 'extreme', label: 'Extremely Active', desc: 'Very hard exercise & physical job', multiplier: 1.9 }
  ];

  const goals = [
    { value: 'cutting', label: 'Weight Loss', calorieChange: -500, proteinMultiplier: 2.2 },
    { value: 'maintain', label: 'Maintain Weight', calorieChange: 0, proteinMultiplier: 1.8 },
    { value: 'bulking', label: 'Muscle Gain', calorieChange: 500, proteinMultiplier: 2.2 }
  ];

  const dietTypes = [
    { value: 'balanced', label: 'Balanced', carbs: 40, protein: 30, fat: 30 },
    { value: 'highProtein', label: 'High Protein', carbs: 30, protein: 40, fat: 30 },
    { value: 'lowCarb', label: 'Low Carb', carbs: 20, protein: 35, fat: 45 },
    { value: 'highCarb', label: 'High Carb', carbs: 50, protein: 25, fat: 25 }
  ];

  const validateInputs = () => {
    const newErrors: {age?: string; height?: string; weight?: string} = {};
    
    // Age validation (15-80 years)
    if (age) {
      const ageNum = Number(age);
      if (ageNum < 15 || ageNum > 80) {
        newErrors.age = 'Age must be between 15 and 80 years';
      }
    } else {
      newErrors.age = 'Age is required';
    }
    
    // Height validation (100-250 cm)
    if (!height) {
      newErrors.height = 'Height is required';
    } else {
      const heightNum = Number(height);
      if (heightNum < 100 || heightNum > 250) {
        newErrors.height = 'Height must be between 100cm and 250cm';
      }
    }
    
    // Weight validation (30-200 kg)
    if (!weight) {
      newErrors.weight = 'Weight is required';
    } else {
      const weightNum = Number(weight);
      if (weightNum < 30 || weightNum > 200) {
        newErrors.weight = 'Weight must be between 30kg and 200kg';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMacros = () => {
    if (!validateInputs()) return;
    
    const heightNum = Number(height);
    const weightNum = Number(weight);
    const ageNum = Number(age);
    
    // Calculate BMR (Mifflin-St Jeor Formula)
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }
    
    // Apply activity multiplier
    const activity = activityLevels.find(a => a.value === activityLevel);
    const tdee = bmr * (activity?.multiplier || 1.2);
    
    // Apply goal adjustment
    const goalData = goals.find(g => g.value === goal);
    const targetCalories = tdee + (goalData?.calorieChange || 0);
    
    // Get diet type ratios
    const diet = dietTypes.find(d => d.value === dietType);
    
    // Calculate macros in grams
    const proteinMultiplier = goalData?.proteinMultiplier || 1.8;
    const proteinGrams = weightNum * proteinMultiplier;
    const proteinCalories = proteinGrams * 4;
    
    // Calculate remaining calories for carbs and fat
    const remainingCalories = targetCalories - proteinCalories;
    const carbsPercentage = diet?.carbs || 40;
    const fatPercentage = diet?.fat || 30;
    const totalPercentage = carbsPercentage + fatPercentage;
    
    const carbsCalories = (carbsPercentage / totalPercentage) * remainingCalories;
    const fatCalories = (fatPercentage / totalPercentage) * remainingCalories;
    
    const carbsGrams = carbsCalories / 4;
    const fatGrams = fatCalories / 9;
    
    setResults({
      calories: Math.round(targetCalories),
      protein: Math.round((proteinCalories / targetCalories) * 100),
      carbs: Math.round((carbsCalories / targetCalories) * 100),
      fat: Math.round((fatCalories / targetCalories) * 100),
      proteinGrams: Math.round(proteinGrams),
      carbsGrams: Math.round(carbsGrams),
      fatGrams: Math.round(fatGrams)
    });
  };

  const resetForm = () => {
    setAge('');
    setGender('male');
    setHeight('');
    setWeight('');
    setActivityLevel('sedentary');
    setGoal('maintain');
    setDietType('balanced');
    setResults(null);
    setErrors({});
  };

  const validateField = (name: string, value: string) => {
    const numValue = Number(value);
    
    if (name === 'age') {
      if (!value) {
        setErrors(prev => ({...prev, age: 'Age is required'}));
      } else if (numValue < 15 || numValue > 80) {
        setErrors(prev => ({...prev, age: 'Age must be between 15 and 80 years'}));
      } else {
        setErrors(prev => ({...prev, age: undefined}));
      }
    }
    
    if (name === 'height') {
      if (!value) {
        setErrors(prev => ({...prev, height: 'Height is required'}));
      } else if (numValue < 100 || numValue > 250) {
        setErrors(prev => ({...prev, height: 'Height must be between 100cm and 250cm'}));
      } else {
        setErrors(prev => ({...prev, height: undefined}));
      }
    }
    
    if (name === 'weight') {
      if (!value) {
        setErrors(prev => ({...prev, weight: 'Weight is required'}));
      } else if (numValue < 30 || numValue > 200) {
        setErrors(prev => ({...prev, weight: 'Weight must be between 30kg and 200kg'}));
      } else {
        setErrors(prev => ({...prev, weight: undefined}));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mb-4">
            <FaAppleAlt className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Macro Nutrient <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Calculator</span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Calculate your optimal protein, carbs, and fat intake based on your body composition, activity level, and fitness goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-purple-400" />
              Your Information
            </h2>
            
            <div className="space-y-6">
              {/* Age Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  onBlur={() => validateField('age', age)}
                  className={`w-full bg-gray-700 border ${
                    errors.age ? 'border-red-500' : 'border-purple-700 border-opacity-30'
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.age ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  placeholder="Enter your age (15-80)"
                  min="15"
                  max="80"
                />
                {errors.age && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.age}
                  </p>
                )}
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Gender
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                      gender === 'male'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                        : 'bg-gray-700 text-purple-200 hover:bg-gray-600'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                      gender === 'female'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                        : 'bg-gray-700 text-purple-200 hover:bg-gray-600'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaRulerVertical className="mr-2" />
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  onBlur={() => validateField('height', height)}
                  className={`w-full bg-gray-700 border ${
                    errors.height ? 'border-red-500' : 'border-purple-700 border-opacity-30'
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.height ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  placeholder="Enter height in centimeters (100-250)"
                  min="100"
                  max="250"
                />
                {errors.height && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.height}
                  </p>
                )}
              </div>

              {/* Weight Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaWeight className="mr-2" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onBlur={() => validateField('weight', weight)}
                  className={`w-full bg-gray-700 border ${
                    errors.weight ? 'border-red-500' : 'border-purple-700 border-opacity-30'
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.weight ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  placeholder="Enter weight in kilograms (30-200)"
                  min="30"
                  max="200"
                />
                {errors.weight && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.weight}
                  </p>
                )}
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaRunning className="mr-2" />
                  Activity Level
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full bg-gray-700 border border-purple-700 border-opacity-30 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {activityLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.desc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal Selection */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-gray-700 border border-purple-700 border-opacity-30 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {goals.map(goal => (
                    <option key={goal.value} value={goal.value}>
                      {goal.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Diet Type Selection */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaAppleAlt className="mr-2" />
                  Diet Preference
                </label>
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                  className="w-full bg-gray-700 border border-purple-700 border-opacity-30 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {dietTypes.map(diet => (
                    <option key={diet.value} value={diet.value}>
                      {diet.label} ({diet.carbs}C/{diet.protein}P/{diet.fat}F)
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateMacros}
                  disabled={!age || !height || !weight || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Macros
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-purple-500 text-purple-300 hover:bg-purple-950 rounded-lg transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">Your Macro Results</h2>
            
            {results ? (
              <div className="space-y-6">
                {/* Total Calories */}
                <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Daily Calorie Target</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {results.calories} calories
                  </div>
                  <p className="text-purple-200 mt-2 text-sm">
                    {goal === 'cutting' ? 'Calorie deficit for weight loss' : 
                     goal === 'bulking' ? 'Calorie surplus for muscle gain' : 
                     'Maintenance calories for current weight'}
                  </p>
                </div>

                {/* Macro Breakdown */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Macronutrient Distribution</h3>
                  
                  {/* Macro Ratio */}
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <div className="text-xl font-bold text-blue-400">Protein</div>
                      <div className="text-lg font-semibold">{results.protein}%</div>
                      <div className="text-xs text-purple-300">{results.proteinGrams}g</div>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <div className="text-xl font-bold text-green-400">Carbs</div>
                      <div className="text-lg font-semibold">{results.carbs}%</div>
                      <div className="text-xs text-purple-300">{results.carbsGrams}g</div>
                    </div>
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <div className="text-xl font-bold text-yellow-400">Fats</div>
                      <div className="text-lg font-semibold">{results.fat}%</div>
                      <div className="text-xs text-purple-300">{results.fatGrams}g</div>
                    </div>
                  </div>

                  {/* Daily Targets */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <div className="flex items-center">
                        <FaDrumstickBite className="text-blue-400 mr-2" />
                        <span className="text-purple-200">Protein Daily Target</span>
                      </div>
                      <span className="font-semibold text-white">{results.proteinGrams}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <div className="flex items-center">
                        <FaAppleAlt className="text-green-400 mr-2" />
                        <span className="text-purple-200">Carbs Daily Target</span>
                      </div>
                      <span className="font-semibold text-white">{results.carbsGrams}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <div className="flex items-center">
                        <FaEgg className="text-yellow-400 mr-2" />
                        <span className="text-purple-200">Fat Daily Target</span>
                      </div>
                      <span className="font-semibold text-white">{results.fatGrams}g</span>
                    </div>
                  </div>
                </div>

                {/* Meal Planning Tips */}
                <div className="bg-purple-900/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Meal Planning Guidance</h3>
                  <ul className="text-sm text-purple-200 space-y-2">
                    <li>• Distribute protein evenly across 3-4 meals for optimal muscle synthesis</li>
                    <li>• Time carbohydrates around workouts for energy and recovery</li>
                    <li>• Include healthy fats with each meal for hormone production and satiety</li>
                    <li>• Adjust portions based on hunger and progress, these are starting guidelines</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaAppleAlt className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">Your Macro Breakdown</h3>
                <p className="text-purple-300">Enter your details to calculate your optimal macronutrient distribution.</p>
              </div>
            )}
          </div>
        </div>

        {/* Macro Information */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">Understanding Macros</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                <FaDrumstickBite className="mr-2" />
                Protein (4 cal/g)
              </h4>
              <p className="text-purple-200 text-sm">
                Essential for muscle repair, immune function, and hormone production. Aim for 1.6-2.2g per kg of body weight.
              </p>
            </div>
            
            <div className="bg-green-500/10 p-4 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center">
                <FaAppleAlt className="mr-2" />
                Carbohydrates (4 cal/g)
              </h4>
              <p className="text-purple-200 text-sm">
                Primary energy source for your body and brain. Focus on complex carbs like whole grains, fruits, and vegetables.
              </p>
            </div>
            
            <div className="bg-yellow-500/10 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2 flex items-center">
                <FaEgg className="mr-2" />
                Fats (9 cal/g)
              </h4>
              <p className="text-purple-200 text-sm">
                Important for hormone production, nutrient absorption, and cell function. Prioritize unsaturated fats from nuts, avocados, and olive oil.
              </p>
            </div>
          </div>
          
          <p className="text-purple-200 mt-6 text-sm">
            Remember that individual needs may vary. These calculations provide a starting point that you can adjust based on your progress and how your body responds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MacroPage;