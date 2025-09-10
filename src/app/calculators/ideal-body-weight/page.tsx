"use client";
import { useState } from 'react';
import { FaCalculator, FaBalanceScale, FaRulerVertical, FaVenusMars, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const IdealBodyWeightPage = () => {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [frameSize, setFrameSize] = useState('medium');
  const [results, setResults] = useState<{
    hamwi: number;
    devine: number;
    adjustedHamwi: number;
    adjustedDevin: number;
    average: number;
    range: string;
  } | null>(null);
  const [errors, setErrors] = useState<{height?: string}>({});

  const validateInputs = () => {
    const newErrors: {height?: string} = {};
    
    // Height validation (147-213 cm)
    if (!height) {
      newErrors.height = 'Height is required';
    } else {
      const heightNum = Number(height);
      if (heightNum < 147 || heightNum > 213) {
        newErrors.height = 'Height must be between 147cm and 213cm (4\'10" to 7\')';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateIBW = () => {
    if (!validateInputs()) return;
    
    const heightNum = Number(height);
    const heightInches = heightNum / 2.54; // Convert cm to inches
    
    // Hamwi Formula (1964)
    let hamwi: number;
    if (gender === 'male') {
      hamwi = 48 + 2.7 * (heightInches - 60); // 106 lb for first 5 ft + 6 lb per inch over
    } else {
      hamwi = 45.5 + 2.2 * (heightInches - 60); // 100 lb for first 5 ft + 5 lb per inch over
    }
    
    // Convert to kg (1 lb = 0.453592 kg)
    hamwi = hamwi * 0.453592;
    
    // Devine Formula (1974)
    let devine: number;
    if (gender === 'male') {
      devine = 50 + 2.3 * (heightInches - 60); // 110 lb for first 5 ft + 5 lb per inch over
    } else {
      devine = 45.5 + 2.3 * (heightInches - 60); // 100 lb for first 5 ft + 5 lb per inch over
    }
    
    // Convert to kg (1 lb = 0.453592 kg)
    devine = devine * 0.453592;
    
    // Adjust for frame size
    const frameMultiplier = frameSize === 'small' ? 0.9 : frameSize === 'large' ? 1.1 : 1;
    const adjustedHamwi = hamwi * frameMultiplier;
    const adjustedDevin = devine * frameMultiplier;
    
    // Calculate average and range
    const average = (adjustedHamwi + adjustedDevin) / 2;
    const range = `± ${Math.round(Math.abs(adjustedHamwi - adjustedDevin) / 2 * 10) / 10} kg`;
    
    setResults({
      hamwi: Math.round(hamwi * 10) / 10,
      devine: Math.round(devine * 10) / 10,
      adjustedHamwi: Math.round(adjustedHamwi * 10) / 10,
      adjustedDevin: Math.round(adjustedDevin * 10) / 10,
      average: Math.round(average * 10) / 10,
      range
    });
  };

  const resetForm = () => {
    setGender('male');
    setHeight('');
    setFrameSize('medium');
    setResults(null);
    setErrors({});
  };

  const validateField = (name: string, value: string) => {
    const numValue = Number(value);
    
    if (name === 'height') {
      if (!value) {
        setErrors(prev => ({...prev, height: 'Height is required'}));
      } else if (numValue < 147 || numValue > 213) {
        setErrors(prev => ({...prev, height: 'Height must be between 147cm and 213cm (4\'10" to 7\')'}));
      } else {
        setErrors(prev => ({...prev, height: undefined}));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mb-4">
            <FaBalanceScale className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Ideal Body Weight <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Calculator</span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Professional medical formula to estimate ideal body weight for drug dosing, nutritional assessment, and medical evaluation.
            Based on the Hamwi (1964) and Devine (1974) formulas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-purple-400" />
              Your Information
            </h2>
            
            <div className="space-y-6">
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
                  placeholder="Enter your height in centimeters"
                  min="147"
                  max="213"
                />
                {errors.height && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.height}
                  </p>
                )}
                <p className="text-purple-300 text-xs mt-2">
                  Must be between 147cm (4'10") and 213cm (7')
                </p>
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
                  onClick={calculateIBW}
                  disabled={!height || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate IBW
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
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">Your Ideal Body Weight Results</h2>
            
            {results ? (
              <div className="space-y-6">
                {/* Average Result */}
                <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Recommended Ideal Body Weight</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {results.average} kg
                  </div>
                  <p className="text-purple-200 mt-2 text-sm">
                    Range: {results.range} ({frameSize} frame)
                  </p>
                </div>

                {/* Formula Results */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Results by Medical Formula</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <div>
                        <span className="text-purple-200">Hamwi Formula (1964)</span>
                        <p className="text-purple-300 text-xs">Original: {results.hamwi} kg</p>
                      </div>
                      <span className="font-semibold text-white">{results.adjustedHamwi} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <div>
                        <span className="text-purple-200">Devine Formula (1974)</span>
                        <p className="text-purple-300 text-xs">Original: {results.devine} kg</p>
                      </div>
                      <span className="font-semibold text-white">{results.adjustedDevin} kg</span>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="bg-purple-900/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Clinical Applications</h3>
                  <ul className="text-sm text-purple-200 space-y-2">
                    <li>• Originally developed for medical dosage calculations</li>
                    <li>• Used in nutritional assessment and obesity research</li>
                    <li>• Helps determine appropriate weight for height in clinical settings</li>
                    <li>• Not intended for athletic populations with high muscle mass</li>
                  </ul>
                </div>

                {/* Limitations */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Formula Limitations</h3>
                  <ul className="text-sm text-purple-200 space-y-2">
                    <li>• Does not account for age, muscle mass, or body composition</li>
                    <li>• Less accurate for very short or very tall individuals</li>
                    <li>• Should be used as a guideline rather than an absolute target</li>
                    <li>• Consult healthcare provider for personalized assessment</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaBalanceScale className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">Your Ideal Body Weight</h3>
                <p className="text-purple-300">Enter your height to calculate your ideal body weight using medical formulas.</p>
              </div>
            )}
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">About the Formulas</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Hamwi Formula (1964)</h4>
              <p className="text-purple-200 text-sm">
                Developed by Dr. G.J. Hamwi as a quick method to determine ideal body weight for diabetic patients based on height and gender.
              </p>
              <div className="mt-2 p-2 bg-gray-700/50 rounded">
                <code className="text-xs text-purple-300">
                  {gender === 'male' 
                    ? 'Men: 48 kg + 2.7 kg per inch over 5 feet'
                    : 'Women: 45.5 kg + 2.2 kg per inch over 5 feet'
                  }
                </code>
              </div>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Devine Formula (1974)</h4>
              <p className="text-purple-200 text-sm">
                Created by Dr. B.J. Devine for estimating ideal body weight for drug dosing, widely used in clinical practice.
              </p>
              <div className="mt-2 p-2 bg-gray-700/50 rounded">
                <code className="text-xs text-purple-300">
                  {gender === 'male' 
                    ? 'Men: 50 kg + 2.3 kg per inch over 5 feet'
                    : 'Women: 45.5 kg + 2.3 kg per inch over 5 feet'
                  }
                </code>
              </div>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Frame Size Adjustment</h4>
              <p className="text-purple-200 text-sm">
                Small frame: -10%, Medium frame: no adjustment, Large frame: +10%. Based on wrist circumference measurement.
              </p>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Clinical Use</h4>
              <p className="text-purple-200 text-sm">
                These formulas are primarily used in medical settings for nutritional assessment, drug dosing, and determining percentage of ideal body weight.
              </p>
            </div>
          </div>
          
          <p className="text-purple-200 mt-6 text-sm">
            Note: These formulas provide estimates for ideal body weight. Individual variations in body composition, muscle mass, 
            and other factors mean that your personal healthy weight range may differ from these calculations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdealBodyWeightPage;