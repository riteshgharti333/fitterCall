"use client";
import { useState } from "react";
import {
  FaWeight,
  FaDumbbell,
  FaAppleAlt,
  FaRunning,
  FaArrowRight,
  FaLightbulb,
  FaClock,
  FaHeartbeat,
} from "react-icons/fa";

const FitnessTips = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const tips = [
    {
      icon: <FaWeight className="text-2xl" />,
      title: "Healthy Weight Loss",
      description:
        "Lose weight sustainably with balanced nutrition and consistent exercise. Aim for 0.5-1 kg per week through a moderate calorie deficit.",
      color: "from-purple-500 to-pink-500",
      badge: "Weight Management",
      keyPoints: [
        "Create a 500-calorie daily deficit",
        "Focus on whole, unprocessed foods",
        "Include both cardio and strength training",
        "Stay hydrated with 8-10 glasses of water",
      ],
    },
    {
      icon: <FaDumbbell className="text-2xl" />,
      title: "Muscle Gain",
      description:
        "Build lean muscle mass through progressive overload training and proper protein intake. Rest and recovery are equally important.",
      color: "from-blue-500 to-purple-600",
      badge: "Strength Building",
      keyPoints: [
        "Consume 1.6-2.2g protein per kg bodyweight",
        "Train each muscle group 2-3 times weekly",
        "Progressive overload: increase weight/reps gradually",
        "Get 7-9 hours of quality sleep nightly",
      ],
    },
    {
      icon: <FaAppleAlt className="text-2xl" />,
      title: "Nutrition Basics",
      description:
        "Master the fundamentals of balanced eating with proper macro and micronutrient distribution for optimal health and performance.",
      color: "from-green-500 to-purple-500",
      badge: "Healthy Eating",
      keyPoints: [
        "Balance macros: 40% carbs, 30% protein, 30% fats",
        "Eat 5+ servings of fruits and vegetables daily",
        "Choose complex carbs over simple sugars",
        "Don't skip meals; eat every 3-4 hours",
      ],
    },
    {
      icon: <FaRunning className="text-2xl" />,
      title: "Daily Exercise",
      description:
        "Incorporate regular physical activity into your routine. Mix cardio, strength, and flexibility training for comprehensive fitness.",
      color: "from-orange-500 to-pink-500",
      badge: "Active Lifestyle",
      keyPoints: [
        "Aim for 150 minutes moderate activity weekly",
        "Include 2-3 strength training sessions",
        "Take 10,000 steps daily minimum",
        "Stretch for 10-15 minutes after workouts",
      ],
    },
  ];

  return (
    <div className="relative py-16 px-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-900/50 rounded-full border border-purple-700/30 mb-6">
            <FaLightbulb className="text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">
              Expert Recommendations
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Fitness{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tips
            </span>
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Science-backed advice to help you achieve your fitness goals faster.
            Simple, actionable tips for every aspect of your health journey.
          </p>
        </div>

        {/* Tips Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`h-full bg-gray-900/40 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm transition-all duration-500 transform-gpu ${
                  hoveredCard === index
                    ? "shadow-xl shadow-purple-500/20 -translate-y-2"
                    : "hover:shadow-lg hover:shadow-purple-500/10"
                }`}
              >
                {/* Icon with gradient background */}
                <div
                  className={`mb-5 inline-flex p-3 rounded-lg bg-gradient-to-r ${tip.color} transition-transform duration-300 ${
                    hoveredCard === index ? "scale-110" : ""
                  }`}
                >
                  {tip.icon}
                </div>

                {/* Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-purple-700/20 rounded-full border border-purple-600/20 text-xs text-purple-300">
                    {tip.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {tip.title}
                </h3>

                {/* Description */}
                <p className="text-purple-200 text-sm mb-5 leading-relaxed">
                  {tip.description}
                </p>

                {/* Key Points */}
                <div className="space-y-2">
                  {tip.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="mt-0.5 mr-2 flex-shrink-0">
                        <FaHeartbeat className="text-xs text-purple-400" />
                      </div>
                      <p className="text-xs text-purple-200 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Time indicator */}
                <div className="mt-5 pt-4 border-t border-purple-700/20">
                  <div className="flex items-center text-xs text-purple-300">
                    <FaClock className="mr-1" />
                    <span>Quick read • 2 min</span>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${tip.color} rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-purple-300 mb-6">
            Want personalized fitness advice?
          </p>
          <button className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 group">
            Get Custom Plan
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FitnessTips;