"use client";
import { useState } from 'react';
import { FaCalculator, FaWeight, FaRunning, FaCalendarAlt, FaExclamationTriangle, FaInfoCircle, FaBullseye } from 'react-icons/fa';

const WeightLossPage = () => {
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('female');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [deficitType, setDeficitType] = useState('moderate');
  const [results, setResults] = useState<{
    tdee: number;
    targetCalories: number;
    dailyDeficit: number;
    weeksToGoal: number;
    safeDate: string;
    weightToLose: number;
    minWeeks: number;
    maxWeeks: number;
  } | null>(null);
  const [errors, setErrors] = useState<{currentWeight?: string; goalWeight?: string; height?: string; age?: string}>({});

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise', multiplier: 1.2 },
    { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week', multiplier: 1.375 },
    { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week', multiplier: 1.55 },
    { value: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week', multiplier: 1.725 },
    { value: 'extreme', label: 'Extremely Active', desc: 'Very hard exercise & physical job', multiplier: 1.9 }
  ];

  const deficitOptions = [
    { value: 'mild', label: 'Mild Deficit (250 cal/day)', deficit: 250, lossPerWeek: 0.25 },
    { value: 'moderate', label: 'Moderate Deficit (500 cal/day)', deficit: 500, lossPerWeek: 0.5 },
    { value: 'aggressive', label: 'Aggressive Deficit (750 cal/day)', deficit: 750, lossPerWeek: 0.75 },
    { value: 'extreme', label: 'Extreme Deficit (1000 cal/day)', deficit: 1000, lossPerWeek: 1.0 }
  ];

  const validateInputs = () => {
    const newErrors: {currentWeight?: string; goalWeight?: string; height?: string; age?: string} = {};
    
    // Current weight validation (30-200 kg)
    if (!currentWeight) {
      newErrors.currentWeight = 'Current weight is required';
    } else {
      const weightNum = Number(currentWeight);
      if (weightNum < 30 || weightNum > 200) {
        newErrors.currentWeight = 'Current weight must be between 30kg and 200kg';
      }
    }
    
    // Goal weight validation (30-200 kg)
    if (!goalWeight) {
      newErrors.goalWeight = 'Goal weight is required';
    } else {
      const weightNum = Number(goalWeight);
      if (weightNum < 30 || weightNum > 200) {
        newErrors.goalWeight = 'Goal weight must be between 30kg and 200kg';
      }
    }
    
    // Check if goal weight is less than current weight
    if (currentWeight && goalWeight && Number(goalWeight) >= Number(currentWeight)) {
      newErrors.goalWeight = 'Goal weight must be less than current weight';
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
    
    // Age validation (15-80 years)
    if (!age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = Number(age);
      if (ageNum < 15 || ageNum > 80) {
        newErrors.age = 'Age must be between 15 and 80 years';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateWeightLoss = () => {
    if (!validateInputs()) return;
    
    const currentWeightNum = Number(currentWeight);
    const goalWeightNum = Number(goalWeight);
    const heightNum = Number(height);
    const ageNum = Number(age);
    const weightToLose = currentWeightNum - goalWeightNum;
    
    // Calculate BMR (Mifflin-St Jeor Formula)
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * currentWeightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * currentWeightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }
    
    // Apply activity multiplier
    const activity = activityLevels.find(a => a.value === activityLevel);
    const tdee = bmr * (activity?.multiplier || 1.2);
    
    // Get deficit information
    const deficit = deficitOptions.find(d => d.value === deficitType);
    const dailyDeficit = deficit?.deficit || 500;
    const targetCalories = tdee - dailyDeficit;
    
    // Calculate time to goal (1kg ≈ 7700 calories)
    const totalDeficitNeeded = weightToLose * 7700;
    const daysToGoal = totalDeficitNeeded / dailyDeficit;
    const weeksToGoal = daysToGoal / 7;
    
    // Calculate safe date range (accounting for potential plateaus)
    const minWeeks = weeksToGoal * 0.8; // 20% faster in best case
    const maxWeeks = weeksToGoal * 1.5; // 50% slower in worst case (accounting for plateaus)
    
    // Calculate projected date
    const today = new Date();
    const safeDate = new Date();
    safeDate.setDate(today.getDate() + daysToGoal);
    
    setResults({
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      dailyDeficit,
      weeksToGoal,
      safeDate: safeDate.toLocaleDateString(),
      weightToLose,
      minWeeks: Math.round(minWeeks * 10) / 10,
      maxWeeks: Math.round(maxWeeks * 10) / 10
    });
  };

  const resetForm = () => {
    setCurrentWeight('');
    setGoalWeight('');
    setHeight('');
    setAge('');
    setGender('female');
    setActivityLevel('sedentary');
    setDeficitType('moderate');
    setResults(null);
    setErrors({});
  };

  const validateField = (name: string, value: string) => {
    const numValue = Number(value);
    
    if (name === 'currentWeight') {
      if (!value) {
        setErrors(prev => ({...prev, currentWeight: 'Current weight is required'}));
      } else if (numValue < 30 || numValue > 200) {
        setErrors(prev => ({...prev, currentWeight: 'Current weight must be between 30kg and 200kg'}));
      } else if (goalWeight && numValue <= Number(goalWeight)) {
        setErrors(prev => ({...prev, currentWeight: 'Current weight must be greater than goal weight'}));
      } else {
        setErrors(prev => ({...prev, currentWeight: undefined}));
      }
    }
    
    if (name === 'goalWeight') {
      if (!value) {
        setErrors(prev => ({...prev, goalWeight: 'Goal weight is required'}));
      } else if (numValue < 30 || numValue > 200) {
        setErrors(prev => ({...prev, goalWeight: 'Goal weight must be between 30kg and 200kg'}));
      } else if (currentWeight && numValue >= Number(currentWeight)) {
        setErrors(prev => ({...prev, goalWeight: 'Goal weight must be less than current weight'}));
      } else {
        setErrors(prev => ({...prev, goalWeight: undefined}));
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
    
    if (name === 'age') {
      if (!value) {
        setErrors(prev => ({...prev, age: 'Age is required'}));
      } else if (numValue < 15 || numValue > 80) {
        setErrors(prev => ({...prev, age: 'Age must be between 15 and 80 years'}));
      } else {
        setErrors(prev => ({...prev, age: undefined}));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mb-4">
            <FaBullseye className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Weight Loss Goal <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Calculator</span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Calculate how long it will take to reach your weight loss goal safely based on your calorie deficit and activity level.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-purple-400" />
              Your Weight Loss Plan
            </h2>
            
            <div className="space-y-6">
              {/* Current Weight Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaWeight className="mr-2" />
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  onBlur={() => validateField('currentWeight', currentWeight)}
                  className={`w-full bg-gray-700 border ${
                    errors.currentWeight ? 'border-red-500' : 'border-purple-700 border-opacity-30'
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.currentWeight ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  placeholder="Enter your current weight"
                  min="30"
                  max="200"
                />
                {errors.currentWeight && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.currentWeight}
                  </p>
                )}
              </div>

              {/* Goal Weight Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaBullseye className="mr-2" />
                  Goal Weight (kg)
                </label>
                <input
                  type="number"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                  onBlur={() => validateField('goalWeight', goalWeight)}
                  className={`w-full bg-gray-700 border ${
                    errors.goalWeight ? 'border-red-500' : 'border-purple-700 border-opacity-30'
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.goalWeight ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  placeholder="Enter your goal weight"
                  min="30"
                  max="200"
                />
                {errors.goalWeight && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.goalWeight}
                  </p>
                )}
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
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
                  placeholder="Enter your height"
                  min="100"
                  max="250"
                />
                {errors.height && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.height}
                  </p>
                )}
              </div>

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
                  placeholder="Enter your age"
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

              {/* Deficit Type Selection */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Calorie Deficit
                </label>
                <select
                  value={deficitType}
                  onChange={(e) => setDeficitType(e.target.value)}
                  className="w-full bg-gray-700 border border-purple-700 border-opacity-30 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {deficitOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} (~{option.lossPerWeek}kg/week)
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateWeightLoss}
                  disabled={!currentWeight || !goalWeight || !height || !age || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Timeline
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
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">Your Weight Loss Timeline</h2>
            
            {results ? (
              <div className="space-y-6">
                {/* Timeline Result */}
                <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Estimated Time to Reach Goal</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {Math.round(results.weeksToGoal)} weeks
                  </div>
                  <p className="text-purple-200 mt-2 text-sm">
                    Projected date: {results.safeDate}
                  </p>
                  <p className="text-purple-300 text-xs mt-2">
                    Realistic range: {results.minWeeks} to {results.maxWeeks} weeks
                  </p>
                </div>

                {/* Weight Loss Details */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Weight Loss Plan</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Weight to lose</span>
                      <span className="font-semibold text-white">{results.weightToLose} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Daily calorie deficit</span>
                      <span className="font-semibold text-white">{results.dailyDeficit} calories</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Weekly weight loss</span>
                      <span className="font-semibold text-white">~{(results.dailyDeficit * 7 / 7700).toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Maintenance calories</span>
                      <span className="font-semibold text-white">{results.tdee} calories</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Target daily intake</span>
                      <span className="font-semibold text-white">{results.targetCalories} calories</span>
                    </div>
                  </div>
                </div>

                {/* Progress Visualization */}
                <div className="bg-purple-900/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Expected Progress</h3>
                  <div className="w-full bg-gray-700 h-4 rounded-full mb-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-purple-300">
                    <span>Start: {currentWeight}kg</span>
                    <span>Goal: {goalWeight}kg</span>
                  </div>
                  <p className="text-purple-200 text-xs mt-3">
                    You'll reach halfway in approximately {Math.round(results.weeksToGoal / 2)} weeks
                  </p>
                </div>

                {/* Tips for Success */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Success Strategies</h3>
                  <ul className="text-sm text-purple-200 space-y-2">
                    <li>• Be consistent with your calorie target</li>
                    <li>• Incorporate both cardio and strength training</li>
                    <li>• Prioritize protein intake to preserve muscle mass</li>
                    <li>• Be patient - weight loss isn't always linear</li>
                    <li>• Adjust your plan if you hit a plateau for more than 2 weeks</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaCalendarAlt className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">Your Weight Loss Timeline</h3>
                <p className="text-purple-300">Enter your details to calculate how long it will take to reach your goal weight safely.</p>
              </div>
            )}
          </div>
        </div>

        {/* Weight Loss Information */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">Safe and Sustainable Weight Loss</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Why Slow and Steady Wins</h4>
              <p className="text-purple-200 text-sm">
                Losing 0.5-1kg per week is considered safe and sustainable. Rapid weight loss can lead to muscle loss, nutrient deficiencies, and rebound weight gain.
              </p>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Plateaus Are Normal</h4>
              <p className="text-purple-200 text-sm">
                Weight loss isn't linear. Expect plateaus where scale doesn't move despite your efforts. This is normal - stay consistent.
              </p>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Adjust As You Go</h4>
              <p className="text-purple-200 text-sm">
                As you lose weight, your calorie needs decrease. Recalculate your needs every 4-5kg lost for continued progress.
              </p>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Non-Scale Victories</h4>
              <p className="text-purple-200 text-sm">
                Pay attention to how clothes fit, energy levels, and measurements - not just the number on the scale.
              </p>
            </div>
          </div>
          
          <p className="text-purple-200 mt-6 text-sm">
            Remember that these calculations are estimates. Individual results may vary based on metabolism, hormone levels, 
            medication, and other factors. Consult with a healthcare provider before starting any weight loss program.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeightLossPage;