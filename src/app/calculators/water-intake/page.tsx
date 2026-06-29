"use client";
import { useState } from 'react';
import { FaCalculator, FaWeight, FaRunning, FaTemperatureHigh, FaExclamationTriangle, FaInfoCircle, FaTint } from 'react-icons/fa';
import { FaGlassWater } from 'react-icons/fa6';

const WaterIntakePage = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [climate, setClimate] = useState('moderate');
  const [pregnant, setPregnant] = useState(false);
  const [breastfeeding, setBreastfeeding] = useState(false);
  const [results, setResults] = useState<{
    baseWater: number;
    activityAdjustment: number;
    climateAdjustment: number;
    specialAdjustment: number;
    totalWater: number;
    cups: number;
  } | null>(null);
  const [errors, setErrors] = useState<{weight?: string}>({});

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise', multiplier: 0.3 },
    { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week', multiplier: 0.35 },
    { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week', multiplier: 0.4 },
    { value: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week', multiplier: 0.45 },
    { value: 'extreme', label: 'Extremely Active', desc: 'Athlete or intense physical job', multiplier: 0.5 }
  ];

  const climates = [
    { value: 'cold', label: 'Cold Climate', desc: 'Cool temperatures', multiplier: 0 },
    { value: 'moderate', label: 'Moderate Climate', desc: 'Average temperatures', multiplier: 0.1 },
    { value: 'hot', label: 'Hot Climate', desc: 'High temperatures', multiplier: 0.2 },
    { value: 'veryHot', label: 'Very Hot Climate', desc: 'Extreme heat conditions', multiplier: 0.3 }
  ];

  const validateInputs = () => {
    const newErrors: {weight?: string} = {};
    
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

  const calculateWaterIntake = () => {
    if (!validateInputs()) return;
    
    const weightNum = Number(weight);
    
    // Base water calculation (30-35 ml per kg of body weight)
    const baseWater = weightNum * 33; // Average of 30-35 ml
    
    // Activity adjustment
    const activity = activityLevels.find(a => a.value === activityLevel);
    const activityAdjustment = baseWater * (activity?.multiplier || 0.3);
    
    // Climate adjustment
    const climateData = climates.find(c => c.value === climate);
    const climateAdjustment = baseWater * (climateData?.multiplier || 0.1);
    
    // Special conditions adjustment
    let specialAdjustment = 0;
    if (pregnant) specialAdjustment += 300; // Additional 300ml for pregnancy
    if (breastfeeding) specialAdjustment += 700; // Additional 700ml for breastfeeding
    
    // Total water calculation
    const totalWater = baseWater + activityAdjustment + climateAdjustment + specialAdjustment;
    const cups = Math.ceil(totalWater / 240); // Convert to cups (1 cup = 240ml)
    
    setResults({
      baseWater: Math.round(baseWater),
      activityAdjustment: Math.round(activityAdjustment),
      climateAdjustment: Math.round(climateAdjustment),
      specialAdjustment,
      totalWater: Math.round(totalWater),
      cups
    });
  };

  const resetForm = () => {
    setWeight('');
    setActivityLevel('sedentary');
    setClimate('moderate');
    setPregnant(false);
    setBreastfeeding(false);
    setResults(null);
    setErrors({});
  };

  const validateField = (name: string, value: string) => {
    const numValue = Number(value);
    
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
        <div className="text-center mb-12 mt-5">
          
          <h1 className="text-4xl font-bold mb-4">
            Water Intake <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Calculator</span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Calculate your optimal daily water consumption for proper hydration based on your weight, activity level, and environment.
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
                  placeholder="Enter your weight in kilograms"
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

              {/* Climate Selection */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaTemperatureHigh className="mr-2" />
                  Climate
                </label>
                <select
                  value={climate}
                  onChange={(e) => setClimate(e.target.value)}
                  className="w-full bg-gray-700 border border-purple-700 border-opacity-30 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {climates.map(climate => (
                    <option key={climate.value} value={climate.value}>
                      {climate.label} - {climate.desc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Conditions */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Special Conditions
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={pregnant}
                      onChange={(e) => setPregnant(e.target.checked)}
                      className="rounded bg-gray-700 border-purple-700 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-purple-200">Pregnant</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={breastfeeding}
                      onChange={(e) => setBreastfeeding(e.target.checked)}
                      className="rounded bg-gray-700 border-purple-700 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-purple-200">Breastfeeding</span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateWaterIntake}
                  disabled={!weight || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Water Intake
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
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">Your Hydration Plan</h2>
            
            {results ? (
              <div className="space-y-6">
                {/* Total Water Result */}
                <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Recommended Daily Water Intake</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {results.totalWater} ml
                  </div>
                  <div className="text-2xl font-semibold text-blue-300 mt-2">
                    ({results.cups} cups)
                  </div>
                  <p className="text-purple-200 mt-2 text-sm">
                    Approximately {Math.round(results.cups / 4)} large glasses or {Math.round(results.cups / 2)} medium bottles
                  </p>
                </div>

                {/* Water Breakdown */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Intake Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                      <span className="text-blue-300">Base Water Requirement</span>
                      <span className="font-semibold text-white">{results.baseWater} ml</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span className="text-green-300">Activity Adjustment</span>
                      <span className="font-semibold text-white">+{results.activityAdjustment} ml</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                      <span className="text-yellow-300">Climate Adjustment</span>
                      <span className="font-semibold text-white">+{results.climateAdjustment} ml</span>
                    </div>
                    {results.specialAdjustment > 0 && (
                      <div className="flex justify-between items-center p-3 bg-pink-500/10 rounded-lg">
                        <span className="text-pink-300">Special Conditions</span>
                        <span className="font-semibold text-white">+{results.specialAdjustment} ml</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hydration Tips */}
                <div className="bg-blue-900/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-300 mb-3">Hydration Tips</h3>
                  <ul className="text-sm text-purple-200 space-y-2">
                    <li>• Drink a glass of water first thing in the morning</li>
                    <li>• Keep a water bottle with you throughout the day</li>
                    <li>• Drink before, during, and after exercise</li>
                    <li>• Eat water-rich foods like fruits and vegetables</li>
                    <li>• Monitor your urine color - pale yellow means you're well hydrated</li>
                  </ul>
                </div>

                {/* Schedule Suggestion */}
                <div className="bg-purple-900/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Sample Water Schedule</h3>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {Array.from({ length: results.cups }, (_, i) => (
                      <div key={i} className="text-center p-2 bg-blue-500/20 rounded">
                        <div className="text-blue-300">Cup {i + 1}</div>
                        <div className="text-purple-300">{Math.round(240 * (i + 1))}ml</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-purple-200 text-xs mt-3">
                    Spread your water intake evenly throughout the day for optimal hydration.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaTint className="text-2xl text-blue-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">Your Hydration Needs</h3>
                <p className="text-purple-300">Enter your details to calculate your personalized daily water requirement.</p>
              </div>
            )}
          </div>
        </div>

        {/* Hydration Information */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">The Importance of Proper Hydration</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Why Water Matters</h4>
              <p className="text-purple-200 text-sm">
                Water is essential for nearly every bodily function, including temperature regulation, joint lubrication, and nutrient transport.
              </p>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Signs of Dehydration</h4>
              <p className="text-purple-200 text-sm">
                Thirst, dark urine, fatigue, dizziness, and dry skin can all indicate you need to drink more water.
              </p>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Beyond Water</h4>
              <p className="text-purple-200 text-sm">
                About 20% of our water intake comes from food. Fruits like watermelon and vegetables like cucumber are particularly hydrating.
              </p>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Special Considerations</h4>
              <p className="text-purple-200 text-sm">
                Illness, exercise, pregnancy, and breastfeeding all increase your fluid requirements. Listen to your body's signals.
              </p>
            </div>
          </div>
          
          <p className="text-purple-200 mt-6 text-sm">
            Remember that individual needs may vary. These calculations provide a starting point that you can adjust based on your thirst, activity level, and environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterIntakePage;