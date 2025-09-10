"use client";
import { useState } from 'react';
import { FaCalculator, FaBalanceScale, FaRulerVertical, FaUser, FaVenusMars, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const IdealWeightPage = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [frameSize, setFrameSize] = useState('medium');
  const [results, setResults] = useState<{
    peterson: string;
    devine: string;
    hamwi: string;
    robinson: string;
    miller: string;
  } | null>(null);
  const [errors, setErrors] = useState<{height?: string; age?: string}>({});

  const validateInputs = () => {
    const newErrors: {height?: string; age?: string} = {};
    
    // Height validation (100-250 cm)
    if (!height) {
      newErrors.height = 'Height is required';
    } else {
      const heightNum = Number(height);
      if (heightNum < 100 || heightNum > 250) {
        newErrors.height = 'Height must be between 100cm and 250cm';
      }
    }
    
    // Age validation (18-80 years, optional)
    if (age) {
      const ageNum = Number(age);
      if (ageNum < 18 || ageNum > 80) {
        newErrors.age = 'Age must be between 18 and 80 years';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateIdealWeight = () => {
    if (!validateInputs()) return;
    
    const heightNum = Number(height);
    
    // Different formulas for ideal weight calculation
    const peterson = 50 + 0.9 * (heightNum - 152); // Peterson formula (kg)
    const devine = gender === 'male' 
      ? 50 + 0.9 * (heightNum - 152.4) 
      : 45.5 + 0.9 * (heightNum - 152.4); // Devine formula
    const hamwi = gender === 'male' 
      ? 48 + 1.1 * (heightNum - 152.4) 
      : 45.4 + 0.9 * (heightNum - 152.4); // Hamwi formula
    const robinson = gender === 'male' 
      ? 52 + 0.75 * (heightNum - 152.4) 
      : 49 + 0.67 * (heightNum - 152.4); // Robinson formula
    const miller = gender === 'male' 
      ? 56.2 + 1.1 * (heightNum - 152.4) 
      : 53.1 + 0.85 * (heightNum - 152.4); // Miller formula

    // Adjust for frame size
    const frameMultiplier = frameSize === 'small' ? 0.9 : frameSize === 'large' ? 1.1 : 1;
    
    setResults({
      peterson: (peterson * frameMultiplier).toFixed(1),
      devine: (devine * frameMultiplier).toFixed(1),
      hamwi: (hamwi * frameMultiplier).toFixed(1),
      robinson: (robinson * frameMultiplier).toFixed(1),
      miller: (miller * frameMultiplier).toFixed(1)
    });
  };

  const resetForm = () => {
    setHeight('');
    setGender('male');
    setAge('');
    setFrameSize('medium');
    setResults(null);
    setErrors({});
  };

  const validateField = (name: string, value: string) => {
    const numValue = Number(value);
    
    if (name === 'height') {
      if (!value) {
        setErrors(prev => ({...prev, height: 'Height is required'}));
      } else if (numValue < 100 || numValue > 250) {
        setErrors(prev => ({...prev, height: 'Height must be between 100cm and 250cm'}));
      } else {
        setErrors(prev => ({...prev, height: undefined}));
      }
    }
    
    if (name === 'age' && value) {
      if (numValue < 18 || numValue > 80) {
        setErrors(prev => ({...prev, age: 'Age must be between 18 and 80 years'}));
      } else {
        setErrors(prev => ({...prev, age: undefined}));
      }
    }
  };

  const getAverageWeight = () => {
    if (!results) return null;
    const values = Object.values(results).map(val => parseFloat(val));
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    return average.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mb-4">
            <FaBalanceScale className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Ideal Weight <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Calculator</span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Discover your ideal weight based on height, gender, and body frame size. 
            This calculator uses multiple scientific formulas to give you a comprehensive range.
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
                  placeholder="Enter your height in centimeters"
                  min="100"
                  max="250"
                />
                {errors.height && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.height}
                  </p>
                )}
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaVenusMars className="mr-2" />
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

              {/* Age Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaUser className="mr-2" />
                  Age (years) - Optional
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
                  placeholder="Enter your age (optional)"
                  min="18"
                  max="80"
                />
                {errors.age && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.age}
                  </p>
                )}
              </div>

              {/* Frame Size Selection */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Body Frame Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setFrameSize('small')}
                    className={`py-3 px-4 rounded-lg transition-all duration-300 ${
                      frameSize === 'small'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                        : 'bg-gray-700 text-purple-200 hover:bg-gray-600'
                    }`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => setFrameSize('medium')}
                    className={`py-3 px-4 rounded-lg transition-all duration-300 ${
                      frameSize === 'medium'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                        : 'bg-gray-700 text-purple-200 hover:bg-gray-600'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setFrameSize('large')}
                    className={`py-3 px-4 rounded-lg transition-all duration-300 ${
                      frameSize === 'large'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                        : 'bg-gray-700 text-purple-200 hover:bg-gray-600'
                    }`}
                  >
                    Large
                  </button>
                </div>
                <p className="text-purple-300 text-xs mt-2">
                  Based on wrist circumference: Small (&lt;15cm), Medium (15-17cm), Large (&gt;17cm)
                </p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateIdealWeight}
                  disabled={!height || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Ideal Weight
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
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">Your Ideal Weight Results</h2>
            
            {results ? (
              <div className="space-y-6">
                {/* Average Result */}
                <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Recommended Ideal Weight</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {getAverageWeight()} kg
                  </div>
                  <p className="text-purple-200 mt-2 text-sm">
                    Based on {gender === 'male' ? 'male' : 'female'} physiology and {frameSize} frame size
                  </p>
                </div>

                {/* Formula Results */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Results by Different Formulas</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Peterson Formula</span>
                      <span className="font-semibold text-white">{results.peterson} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Devine Formula</span>
                      <span className="font-semibold text-white">{results.devine} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Hamwi Formula</span>
                      <span className="font-semibold text-white">{results.hamwi} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Robinson Formula</span>
                      <span className="font-semibold text-white">{results.robinson} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Miller Formula</span>
                      <span className="font-semibold text-white">{results.miller} kg</span>
                    </div>
                  </div>
                </div>

                {/* Health Information */}
                <div className="bg-purple-900/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Understanding Your Results</h3>
                  <ul className="text-sm text-purple-200 space-y-2">
                    <li>• Ideal weight is an estimate and may vary based on muscle mass and body composition</li>
                    <li>• These formulas don't account for age, which can affect ideal weight ranges</li>
                    <li>• Frame size adjustments: Small (-10%), Medium (no change), Large (+10%)</li>
                    <li>• For a more accurate assessment, consider body fat percentage measurements</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaBalanceScale className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">Your Ideal Weight Range</h3>
                <p className="text-purple-300">Enter your details to calculate your ideal weight based on multiple scientific formulas.</p>
              </div>
            )}
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">About Ideal Weight Formulas</h2>
          <p className="text-purple-200 mb-4">
            Ideal weight calculations are estimates based on statistical data and various formulas developed by researchers. 
            Each formula has slightly different approaches:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Peterson Formula</h4>
              <p className="text-purple-200 text-sm">
                A modern formula that aims to be more accurate for a wider range of heights.
              </p>
            </div>
            
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Devine Formula</h4>
              <p className="text-purple-200 text-sm">
                Originally developed for medical dosage calculations, now widely used for ideal weight.
              </p>
            </div>
            
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Hamwi Formula</h4>
              <p className="text-purple-200 text-sm">
                Developed by Dr. G.J. Hamwi in 1964 as a quick estimation method for ideal body weight.
              </p>
            </div>
            
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Robinson Formula</h4>
              <p className="text-purple-200 text-sm">
                A modification of the Devine formula, developed by Dr. J.D. Robinson in 1983.
              </p>
            </div>
          </div>
          
          <p className="text-purple-200 mt-6 text-sm">
            Remember that these formulas provide estimates. Individual factors like muscle mass, 
            bone density, and overall body composition can affect your healthy weight range.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdealWeightPage;