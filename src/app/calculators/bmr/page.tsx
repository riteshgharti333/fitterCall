"use client";
import { useState } from 'react';
import { FaCalculator, FaUser, FaVenusMars, FaRulerVertical, FaWeight, FaExclamationTriangle } from 'react-icons/fa';

const BMRPage = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmrResult, setBmrResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{age?: string; height?: string; weight?: string}>({});

  const validateInputs = () => {
    const newErrors: {age?: string; height?: string; weight?: string} = {};

    // Age validation
    if (age) {
      const ageNum = Number(age);
      if (ageNum < 2 || ageNum > 120) {
        newErrors.age = 'Age must be between 2 and 120 years';
      }
    }

    // Height validation
    if (!height) {
      newErrors.height = 'Height is required';
    } else {
      const heightNum = Number(height);
      if (heightNum < 50 || heightNum > 250) {
        newErrors.height = 'Height must be between 50cm and 250cm';
      }
    }

    // Weight validation
    if (!weight) {
      newErrors.weight = 'Weight is required';
    } else {
      const weightNum = Number(weight);
      if (weightNum < 2 || weightNum > 300) {
        newErrors.weight = 'Weight must be between 2kg and 300kg';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMR = () => {
    if (!validateInputs()) return;

    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);
    let bmr = 0;

    if (gender === 'male') {
      // Mifflin-St Jeor Equation for men
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      // Mifflin-St Jeor Equation for women
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    setBmrResult(parseFloat(bmr.toFixed(1)));
  };

  const resetForm = () => {
    setAge('');
    setGender('male');
    setHeight('');
    setWeight('');
    setBmrResult(null);
    setErrors({});
  };

  const validateField = (name: string, value: string) => {
    const numValue = Number(value);

    if (name === 'age' && value) {
      if (numValue < 2 || numValue > 120) {
        setErrors(prev => ({...prev, age: 'Age must be between 2 and 120 years'}));
      } else {
        setErrors(prev => ({...prev, age: undefined}));
      }
    }

    if (name === 'height' && value) {
      if (numValue < 50 || numValue > 250) {
        setErrors(prev => ({...prev, height: 'Height must be between 50cm and 250cm'}));
      } else {
        setErrors(prev => ({...prev, height: undefined}));
      }
    }

    if (name === 'weight' && value) {
      if (numValue < 2 || numValue > 300) {
        setErrors(prev => ({...prev, weight: 'Weight must be between 2kg and 300kg'}));
      } else {
        setErrors(prev => ({...prev, weight: undefined}));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mb-4">
            <FaCalculator className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            BMR <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Calculator</span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Basal Metabolic Rate (BMR) estimates the number of calories your body burns at rest. 
            Enter your details to find out your daily calorie needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-purple-400" />
              Enter Your Details
            </h2>
            
            <div className="space-y-6">
              {/* Age Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaUser className="mr-2" />
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
                  placeholder="Enter your age (2-120)"
                  min="2"
                  max="120"
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
                  placeholder="Enter height in centimeters (50-250)"
                  min="50"
                  max="250"
                  required
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
                  placeholder="Enter weight in kilograms (2-300)"
                  min="2"
                  max="300"
                  required
                />
                {errors.weight && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.weight}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateBMR}
                  disabled={!height || !weight || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate BMR
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
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">Your Results</h2>
            
            {bmrResult ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-6 rounded-full mb-6 bg-green-500/20">
                  <span className="text-4xl font-bold">{bmrResult} kcal/day</span>
                </div>
                <p className="text-purple-200">
                  This is the estimated number of calories your body burns at rest per day.
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaCalculator className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">Your BMR Result</h3>
                <p className="text-purple-300">Enter your details and click "Calculate BMR" to see your results.</p>
              </div>
            )}
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">How BMR is Calculated</h2>
          <p className="text-purple-200 mb-4">
            BMR is estimated using the Mifflin-St Jeor Equation:
          </p>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <code className="text-lg font-mono text-purple-300">
              Male: BMR = 10 × weight (kg) + 6.25 × height (cm) - 5 × age + 5
            </code>
            <br />
            <code className="text-lg font-mono text-purple-300">
              Female: BMR = 10 × weight (kg) + 6.25 × height (cm) - 5 × age - 161
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMRPage;
