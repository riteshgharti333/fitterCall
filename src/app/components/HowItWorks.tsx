"use client";
import { FaUserEdit, FaCalculator, FaChartBar, FaArrowRight } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Enter Your Details",
      description: "Input your personal metrics like age, weight, height, and activity level into our intuitive forms.",
      icon: <FaUserEdit className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      detail: "Quick and easy data entry"
    },
    {
      step: 2,
      title: "Calculate Instantly",
      description: "Our advanced algorithms process your data using scientifically validated formulas for accurate results.",
      icon: <FaCalculator className="text-2xl" />,
      color: "from-blue-500 to-purple-600",
      detail: "Precision calculations"
    },
    {
      step: 3,
      title: "Get Personalized Results",
      description: "Receive detailed insights, health recommendations, and actionable plans tailored to your body metrics.",
      icon: <FaChartBar className="text-2xl" />,
      color: "from-green-500 to-purple-500",
      detail: "Custom health insights"
    },
  ];

  return (
    <div className="relative py-16 px-4">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-900/50 rounded-full border border-purple-700/30 mb-6">
            <span className="text-sm font-medium text-purple-300">Simple 3-Step Process</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Getting your health insights has never been easier. Follow these three simple steps 
            to understand your body better and optimize your fitness journey.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-purple-600/30 -translate-y-1/2 z-0"></div>
          
          {steps.map((item, index) => (
            <div key={index} className="relative z-10 group">
              <div className="h-full bg-gray-900/40 bg-opacity-40 rounded-2xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2">
                {/* Step Number Badge */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                </div>

                {/* Icon with gradient background */}
                <div className={`mb-5 inline-flex p-3 rounded-lg bg-gradient-to-r ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-purple-200 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Detail badge */}
                <div className="inline-flex items-center px-3 py-1 bg-purple-700/20 rounded-full border border-purple-600/20">
                  <span className="text-xs text-purple-300">{item.detail}</span>
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900/30 rounded-full border border-purple-700/20">
            <span className="text-purple-200 text-sm">Ready to get started?</span>
            <FaArrowRight className="text-purple-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;