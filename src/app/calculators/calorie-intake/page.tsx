"use client";
import { useState } from 'react';
import { FaCalculator, FaFire, FaRunning, FaBalanceScale, FaRulerVertical, FaWeight, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const TDEEPage = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [tdeeResult, setTdeeResult] = useState<number | null>(null);
  const [goalCalories, setGoalCalories] = useState<number | null>(null);
  const [errors, setErrors] = useState<{age?: string; height?: string; weight?: string}>({});

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    { value: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
    { value: 'extreme', label: 'Extremely Active', desc: 'Very hard exercise & physical job' }
  ];

  const goals = [
    { value: 'lose', label: 'Weight Loss', deficit: 500 },
    { value: 'lose_mild', label: 'Mild Weight Loss', deficit: 250 },
    { value: 'maintain', label: 'Maintain Weight', deficit: 0 },
    { value: 'gain_mild', label: 'Mild Weight Gain', deficit: -250 },
    { value: 'gain', label: 'Weight Gain', deficit: -500 }
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

  const calculateTDEE = () => {
    if (!validateInputs()) return;
    
    const heightNum = Number(height);
    const weightNum = Number(weight);
    const ageNum = Number(age);
    
    // Mifflin-St Jeor Formula (most accurate for TDEE)
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }
    
    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9
    };
    
    const tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    const selectedGoal = goals.find(g => g.value === goal);
    const goalCal = tdee - (selectedGoal?.deficit || 0);
    
    setTdeeResult(Math.round(tdee));
    setGoalCalories(Math.round(goalCal));
  };

  const resetForm = () => {
    setAge('');
    setGender('male');
    setHeight('');
    setWeight('');
    setActivityLevel('sedentary');
    setGoal('maintain');
    setTdeeResult(null);
    setGoalCalories(null);
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
            <FaFire className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Calorie & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">TDEE Calculator</span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Calculate your Total Daily Energy Expenditure (TDEE) and optimal calorie intake based on your goals.
            TDEE represents the total calories you burn daily, including physical activity.
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
                  <FaBalanceScale className="mr-2" />
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

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateTDEE}
                  disabled={!age || !height || !weight || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Calories
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
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">Your Calorie Results</h2>
            
            {tdeeResult && goalCalories ? (
              <div className="space-y-6">
                {/* TDEE Result */}
                <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Total Daily Energy Expenditure (TDEE)</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {tdeeResult} calories
                  </div>
                  <p className="text-purple-200 mt-2 text-sm">
                    This is how many calories you burn daily based on your activity level
                  </p>
                </div>

                {/* Goal Calories */}
                <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    Recommended Daily Intake for {goals.find(g => g.value === goal)?.label}
                  </h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {goalCalories} calories
                  </div>
                  <p className="text-purple-200 mt-2 text-sm">
                    {goal === 'maintain' 
                      ? 'Maintain your current weight'
                      : goal.includes('lose')
                      ? `Lose approximately ${Math.abs(goals.find(g => g.value === goal)?.deficit || 0) / 500 * 0.45}kg per week`
                      : `Gain approximately ${Math.abs(goals.find(g => g.value === goal)?.deficit || 0) / 500 * 0.45}kg per week`
                    }
                  </p>
                </div>

                {/* Macronutrient Breakdown */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Macronutrient Distribution</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-purple-800/30 rounded-lg">
                      <div className="text-xl font-bold text-blue-400">Protein</div>
                      <div className="text-lg font-semibold">{Math.round(goalCalories * 0.3 / 4)}g</div>
                      <div className="text-xs text-purple-300">30% of calories</div>
                    </div>
                    <div className="p-3 bg-purple-800/30 rounded-lg">
                      <div className="text-xl font-bold text-green-400">Carbs</div>
                      <div className="text-lg font-semibold">{Math.round(goalCalories * 0.4 / 4)}g</div>
                      <div className="text-xs text-purple-300">40% of calories</div>
                    </div>
                    <div className="p-3 bg-purple-800/30 rounded-lg">
                      <div className="text-xl font-bold text-yellow-400">Fats</div>
                      <div className="text-lg font-semibold">{Math.round(goalCalories * 0.3 / 9)}g</div>
                      <div className="text-xs text-purple-300">30% of calories</div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-purple-900/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Nutrition Tips</h3>
                  <ul className="text-sm text-purple-200 space-y-2">
                    <li>• Focus on whole foods: lean proteins, complex carbs, and healthy fats</li>
                    <li>• Stay hydrated with at least 2-3 liters of water daily</li>
                    <li>• Include fiber-rich foods for better digestion and satiety</li>
                    <li>• Consider tracking your intake for the first few weeks</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaFire className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">Your Calorie Needs</h3>
                <p className="text-purple-300">Enter your details to calculate your personalized calorie requirements.</p>
              </div>
            )}
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">How TDEE is Calculated</h2>
          <p className="text-purple-200 mb-4">
            Your Total Daily Energy Expenditure (TDEE) is calculated using the Mifflin-St Jeor formula, which is considered the most accurate:
          </p>
          <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
            <code className="text-lg font-mono text-purple-300">
              {gender === 'male' 
                ? 'BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5'
                : 'BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161'
              }
            </code>
          </div>
          <p className="text-purple-200 mb-2">Then we apply an activity multiplier:</p>
          <ul className="text-purple-200 text-sm list-disc list-inside space-y-1 mb-4">
            <li>Sedentary (little exercise): BMR × 1.2</li>
            <li>Lightly active (light exercise 1-3 days/week): BMR × 1.375</li>
            <li>Moderately active (moderate exercise 3-5 days/week): BMR × 1.55</li>
            <li>Very active (hard exercise 6-7 days/week): BMR × 1.725</li>
            <li>Extremely active (very hard exercise & physical job): BMR × 1.9</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TDEEPage;