"use client";
import { useState } from "react";
import {
  FaCalculator,
  FaUser,
  FaVenusMars,
  FaRulerVertical,
  FaWeight,
  FaExclamationTriangle,
  FaHips,
} from "react-icons/fa";
import { FaPlaneLock } from "react-icons/fa6";

type Errors = {
  age?: string;
  height?: string;
  weight?: string;
  waist?: string;
  hip?: string;
  neck?: string;
};

const BodyFatPage = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [neck, setNeck] = useState("");
  const [bodyFatResult, setBodyFatResult] = useState<number | null>(null);

  const validateInputs = () => {
    const newErrors: Errors = {};
    const ageNum = Number(age);
    const heightNum = Number(height);
    const weightNum = Number(weight);
    const waistNum = Number(waist);
    const hipNum = Number(hip);
    const neckNum = Number(neck);

    if (!age || ageNum < 2 || ageNum > 120) newErrors.age = "Age must be 2-120";
    if (!height || heightNum < 50 || heightNum > 250)
      newErrors.height = "Height 50-250cm";
    if (!weight || weightNum < 2 || weightNum > 300)
      newErrors.weight = "Weight 2-300kg";
    if (!waist || waistNum < 20 || waistNum > 200)
      newErrors.waist = "Waist 20-200cm";
    if (gender === "female" && (!hip || hipNum < 20 || hipNum > 200))
      newErrors.hip = "Hip 20-200cm";
    if (!neck || neckNum < 10 || neckNum > 80) newErrors.neck = "Neck 10-80cm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBodyFat = () => {
    if (!validateInputs()) return;

    const h = Number(height);
    // const w = Number(weight);
    const wa = Number(waist);
    const n = Number(neck);
    const hi = Number(hip);

    let bodyFat = 0;

    if (gender === "male") {
      // US Navy Method
      bodyFat =
        495 /
          (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) -
        450;
    } else {
      bodyFat =
        495 /
          (1.29579 -
            0.35004 * Math.log10(wa + hi - n) +
            0.221 * Math.log10(h)) -
        450;
    }

    setBodyFatResult(parseFloat(bodyFat.toFixed(1)));
  };

  const resetForm = () => {
    setAge("");
    setGender("male");
    setHeight("");
    setWeight("");
    setWaist("");
    setHip("");
    setNeck("");
    setBodyFatResult(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-5">
          
          <h1 className="text-4xl font-bold mb-4">
            Body Fat{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Estimate your body fat percentage using your measurements. This
            calculator uses the US Navy method.
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
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaUser className="mr-2" /> Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={`w-full bg-gray-700 border ${
                    errors.age
                      ? "border-red-500"
                      : "border-purple-700 border-opacity-30"
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.age ? "focus:ring-red-500" : "focus:ring-purple-500"
                  }`}
                  placeholder="2-120"
                />
                {errors.age && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" />
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaVenusMars className="mr-2" /> Gender
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setGender("male")}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                      gender === "male"
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                        : "bg-gray-700 text-purple-200 hover:bg-gray-600"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                      gender === "female"
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                        : "bg-gray-700 text-purple-200 hover:bg-gray-600"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaRulerVertical className="mr-2" /> Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={`w-full bg-gray-700 border ${
                    errors.height
                      ? "border-red-500"
                      : "border-purple-700 border-opacity-30"
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.height
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                  placeholder="50-250"
                />
                {errors.height && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" />
                    {errors.height}
                  </p>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaWeight className="mr-2" /> Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={`w-full bg-gray-700 border ${
                    errors.weight
                      ? "border-red-500"
                      : "border-purple-700 border-opacity-30"
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.weight
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                  placeholder="2-300"
                />
                {errors.weight && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" />
                    {errors.weight}
                  </p>
                )}
              </div>

              {/* Waist */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaRulerVertical className="mr-2" /> Waist (cm)
                </label>
                <input
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className={`w-full bg-gray-700 border ${
                    errors.waist
                      ? "border-red-500"
                      : "border-purple-700 border-opacity-30"
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.waist
                      ? "focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                  placeholder="20-200"
                />
                {errors.waist && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" />
                    {errors.waist}
                  </p>
                )}
              </div>

              {/* Hip (female only) */}
              {gender === "female" && (
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                    <FaHips className="mr-2" /> Hip (cm)
                  </label>
                  <input
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    className={`w-full bg-gray-700 border ${
                      errors.hip
                        ? "border-red-500"
                        : "border-purple-700 border-opacity-30"
                    } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.hip
                        ? "focus:ring-red-500"
                        : "focus:ring-purple-500"
                    }`}
                    placeholder="20-200"
                  />
                  {errors.hip && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <FaExclamationTriangle className="mr-1" />
                      {errors.hip}
                    </p>
                  )}
                </div>
              )}

              {/* Neck */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center">
                  <FaPlaneLock className="mr-2" /> Neck (cm)
                </label>
                <input
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className={`w-full bg-gray-700 border ${
                    errors.neck
                      ? "border-red-500"
                      : "border-purple-700 border-opacity-30"
                  } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.neck ? "focus:ring-red-500" : "focus:ring-purple-500"
                  }`}
                  placeholder="10-80"
                />
                {errors.neck && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <FaExclamationTriangle className="mr-1" />
                    {errors.neck}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateBodyFat}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Calculate Body Fat %
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
            <h2 className="text-2xl font-semibold mb-6 text-purple-100">
              Your Results
            </h2>
            {bodyFatResult ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-6 rounded-full mb-6 bg-blue-500/20">
                  <span className="text-4xl font-bold">{bodyFatResult} %</span>
                </div>
                <p className="text-purple-200">
                  This is your estimated body fat percentage using the US Navy
                  Method.
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                  <FaCalculator className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl text-purple-200 mb-2">
                  Your Body Fat %
                </h3>
                <p className="text-purple-300">
                  Enter your details and click "Calculate Body Fat %" to see
                  your results.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="mt-12 bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-100">
            How Body Fat % is Calculated
          </h2>
          <p className="text-purple-200 mb-4">
            Body Fat Percentage is estimated using the US Navy Method:
          </p>
          <div className="bg-gray-700/50 p-4 rounded-lg text-purple-300 font-mono">
            <p>
              Male: 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 ×
              log10(height)) - 450
            </p>
            <p>
              Female: 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) +
              0.22100 × log10(height)) - 450
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyFatPage;
