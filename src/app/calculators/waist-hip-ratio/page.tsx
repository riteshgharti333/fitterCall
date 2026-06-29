"use client";
import { useState } from 'react';
import { FaCalculator, FaRuler, FaHeart, FaExclamationTriangle, FaVenusMars } from 'react-icons/fa';

const WHRPage = () => {
  const [gender, setGender] = useState('male');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [results, setResults] = useState<{
    ratio: number;
    category: string;
    riskLevel: string;
    description: string;
  } | null>(null);
  const [errors, setErrors] = useState<{waist?: string; hip?: string}>({});

  const validateInputs = () => {
    const newErrors: {waist?: string; hip?: string} = {};
    
    // Waist validation (50-200 cm)
    if (!waist) {
      newErrors.waist = 'Waist circumference is required';
    } else {
      const waistNum = Number(waist);
      if (waistNum < 50 || waistNum > 200) {
        newErrors.waist = 'Waist must be between 50cm and 200cm';
      }
    }
    
    // Hip validation (60-200 cm)
    if (!hip) {
      newErrors.hip = 'Hip circumference is required';
    } else {
      const hipNum = Number(hip);
      if (hipNum < 60 || hipNum > 200) {
        newErrors.hip = 'Hip must be between 60cm and 200cm';
      }
    }
    
    // Check if waist is smaller than hip
    if (waist && hip && Number(waist) >= Number(hip)) {
      newErrors.waist = 'Waist must be smaller than hip measurement';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateWHR = () => {
    if (!validateInputs()) return;
    
    const waistNum = Number(waist);
    const hipNum = Number(hip);
    const ratio = waistNum / hipNum;
    const roundedRatio = Math.round(ratio * 100) / 100;
    
    let category = '';
    let riskLevel = '';
    let description = '';
    
    if (gender === 'male') {
      if (ratio < 0.9) {
        category = 'Low Risk';
        riskLevel = 'low';
        description = 'You have a low health risk based on your fat distribution.';
      } else if (ratio >= 0.9 && ratio <= 0.99) {
        category = 'Moderate Risk';
        riskLevel = 'moderate';
        description = 'You have a moderate health risk. Consider maintaining a healthy lifestyle.';
      } else {
        category = 'High Risk';
        riskLevel = 'high';
        description = 'You have a high health risk. Consult with a healthcare provider.';
      }
    } else {
      if (ratio < 0.8) {
        category = 'Low Risk';
        riskLevel = 'low';
        description = 'You have a low health risk based on your fat distribution.';
      } else if (ratio >= 0.8 && ratio <= 0.89) {
        category = 'Moderate Risk';
        riskLevel = 'moderate';
        description = 'You have a moderate health risk. Consider maintaining a healthy lifestyle.';
      } else {
        category = 'High Risk';
        riskLevel = 'high';
        description = 'You have a high health risk. Consult with a healthcare provider.';
      }
    }
    
    setResults({
      ratio: roundedRatio,
      category,
      riskLevel,
      description
    });
  };

  const resetForm = () => {
    setGender('male');
    setWaist('');
    setHip('');
    setResults(null);
    setErrors({});
  };

  const validateField = (name: string, value: string) => {
    const numValue = Number(value);
    
    if (name === 'waist') {
      if (!value) {
        setErrors(prev => ({...prev, waist: 'Waist circumference is required'}));
      } else if (numValue < 50 || numValue > 200) {
        setErrors(prev => ({...prev, waist: 'Waist must be between 50cm and 200cm'}));
      } else if (hip && numValue >= Number(hip)) {
        setErrors(prev => ({...prev, waist: 'Waist must be smaller than hip measurement'}));
      } else {
        setErrors(prev => ({...prev, waist: undefined}));
      }
    }
    
    if (name === 'hip') {
      if (!value) {
        setErrors(prev => ({...prev, hip: 'Hip circumference is required'}));
      } else if (numValue < 60 || numValue > 200) {
        setErrors(prev => ({...prev, hip: 'Hip must be between 60cm and 200cm'}));
      } else if (waist && numValue <= Number(waist)) {
        setErrors(prev => ({...prev, waist: 'Waist must be smaller than hip measurement'}));
      } else {
        setErrors(prev => ({...prev, hip: undefined}));
      }
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-purple-400';
    }
  };

  const getRiskBgColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-500/20';
      case 'moderate': return 'bg-yellow-500/20';
      case 'high': return 'bg-red-500/20';
      default: return 'bg-purple-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-5">
          
          <h1 className="text-4xl font-bold mb-4">
            Waist-to-Hip Ratio <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Calculator</span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Measure your body fat distribution to understand your health risks. 
            Waist-to-hip ratio is a better indicator of health risks than BMI alone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-purple-400" />
              Your Measurements
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

              {/* Waist Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaRuler className="mr-2" />
                  Waist Circumference (cm)
                </label>
                <input
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  onBlur={() => validateField('waist', waist)}
                  className={`w-full bg-gray-700 border ${
                    errors.waist ? 'border-red-500' : 'border-purple-700 border-opacity-30'
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.waist ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  placeholder="Measure around the narrowest part"
                  min="50"
                  max="200"
                  step="0.1"
                />
                {errors.waist && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.waist}
                  </p>
                )}
                <p className="text-purple-300 text-xs mt-2">
                  Measure at the narrowest part of your waist, just above the belly button
                </p>
              </div>

              {/* Hip Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaRuler className="mr-2" />
                  Hip Circumference (cm)
                </label>
                <input
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  onBlur={() => validateField('hip', hip)}
                  className={`w-full bg-gray-700 border ${
                    errors.hip ? 'border-red-500' : 'border-purple-700 border-opacity-30'
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.hip ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  placeholder="Measure around the widest part"
                  min="60"
                  max="200"
                  step="0.1"
                />
                {errors.hip && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" /> {errors.hip}
                  </p>
                )}
                <p className="text-purple-300 text-xs mt-2">
                  Measure around the widest part of your hips and buttocks
                </p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateWHR}
                  disabled={!waist || !hip || Object.keys(errors).some(key => errors[key as keyof typeof errors])}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate WHR
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
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">Your WHR Results</h2>
            
            {results ? (
              <div className="space-y-6">
                {/* WHR Result */}
                <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Your Waist-to-Hip Ratio</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {results.ratio}
                  </div>
                  <p className="text-purple-200 mt-2 text-sm">
                    {gender === 'male' ? 'Male' : 'Female'}, {waist}cm ÷ {hip}cm
                  </p>
                </div>

                {/* Risk Assessment */}
                <div className={`text-center p-6 rounded-xl ${getRiskBgColor(results.riskLevel)}`}>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Health Risk Assessment</h3>
                  <div className={`text-2xl font-bold mb-2 ${getRiskColor(results.riskLevel)}`}>
                    {results.category}
                  </div>
                  <p className="text-purple-200 text-sm">
                    {results.description}
                  </p>
                </div>

                {/* Health Information */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">WHR Guidelines</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg">
                      <span className="text-purple-200">Gender</span>
                      <span className="text-purple-200">Low Risk</span>
                      <span className="text-purple-200">Moderate Risk</span>
                      <span className="text-purple-200">High Risk</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span className="text-green-400">Male</span>
                      <span className="text-green-400">&lt; 0.90</span>
                      <span className="text-yellow-400">0.90 - 0.99</span>
                      <span className="text-red-400">≥ 1.0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span className="text-green-400">Female</span>
                      <span className="text-green-400">&lt; 0.80</span>
                      <span className="text-yellow-400">0.80 - 0.89</span>
                      <span className="text-red-400">≥ 0.90</span>
                    </div>
                  </div>
                </div>

                {/* Health Tips */}
                <div className="bg-purple-900/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Health Recommendations</h3>
                  <ul className="text-sm text-purple-200 space-y-2">
                    <li>• Maintain a balanced diet with plenty of fruits and vegetables</li>
                    <li>• Engage in regular physical activity (150+ minutes per week)</li>
                    <li>• Focus on reducing abdominal fat through cardio and strength training</li>
                    <li>• Monitor your measurements every 4-6 weeks to track progress</li>
                    {results.riskLevel === 'high' && (
                      <li className="text-red-400">• Consider consulting with a healthcare provider for personalized advice</li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaHeart className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">Your Health Risk Assessment</h3>
                <p className="text-purple-300">Enter your measurements to calculate your waist-to-hip ratio and health risk.</p>
              </div>
            )}
          </div>
        </div>

        {/* Health Information */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">Why Waist-to-Hip Ratio Matters</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Apple vs. Pear Shape</h4>
              <p className="text-purple-200 text-sm">
                People with more weight around the waist (apple shape) have higher health risks than those with weight around the hips (pear shape).
              </p>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Health Risks</h4>
              <p className="text-purple-200 text-sm">
                High WHR is associated with increased risk of heart disease, type 2 diabetes, and other metabolic conditions.
              </p>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Measurement Tips</h4>
              <p className="text-purple-200 text-sm">
                Measure in the morning before eating. Use a flexible tape measure and keep it parallel to the floor. Don't pull too tight.
              </p>
            </div>
            
            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-2">Improving Your Ratio</h4>
              <p className="text-purple-200 text-sm">
                Focus on overall fat loss through diet and exercise. Targeted exercises can't spot-reduce, but overall fat loss will help.
              </p>
            </div>
          </div>
          
          <p className="text-purple-200 mt-6 text-sm">
            Remember that WHR is just one indicator of health. It should be considered alongside other factors like blood pressure, cholesterol levels, and lifestyle habits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WHRPage;