"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FaCalculator,
  FaHeartbeat,
  FaChartLine,
  FaArrowRight,
  FaUsers,
  FaAward,
  FaSmile,
} from "react-icons/fa";

const Banner = () => {
  const [counts, setCounts] = useState({ users: 0, accuracy: 0, satisfaction: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "BMI Calculator",
      description: "Calculate your body mass index instantly",
      icon: <FaCalculator className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Health Tracking",
      description: "Monitor your fitness journey with precision",
      icon: <FaChartLine className="text-2xl" />,
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Wellness Insights",
      description: "Get personalized health recommendations",
      icon: <FaHeartbeat className="text-2xl" />,
      color: "from-green-500 to-purple-500",
    },
  ];

  // Intersection Observer to trigger count animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate numbers
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = { users: 50, accuracy: 98, satisfaction: 95 };
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        users: Math.floor(targets.users * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      });

      if (currentStep >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white">
      {/* Premium background elements */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900/40 to-purple-900/20"></div>
        
        {/* Animated gradient spheres */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-pink-600/10 rounded-full filter blur-[90px] animate-pulse animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full filter blur-[80px] animate-pulse animation-delay-4000"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 border-2 border-purple-500/30 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 border-2 border-pink-500/30 rounded-full animate-reverse-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-blue-500/30 rotate-45 animate-pulse-slow"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 h-full flex flex-col justify-center">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge with fade-in animation */}
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-900/50 rounded-full border border-purple-700/30 my-8 animate-fade-in-down">
            <span className="text-sm font-medium text-purple-300">Fitness Intelligence Platform</span>
          </div>
          
          {/* Main heading with typing effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="animate-fade-in-left inline-block">Transform</span>{" "}
            <span className="animate-fade-in-right inline-block">Your</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              Body Metrics
            </span>
          </h1>

          {/* Description with fade-in */}
          <p className="text-xl text-purple-100 max-w-2xl mb-10 leading-relaxed animate-fade-in-up animation-delay-300">
            Advanced calculators and tracking tools to optimize your fitness journey, 
            achieve your goals, and unlock your full potential.
          </p>

          {/* CTA Buttons with stagger animation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/calculators"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 shadow-lg shadow-purple-500/20 animate-fade-in-left animation-delay-500"
            >
              <span className="relative z-10">Explore Calculators</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600/30 hover:border-purple-400/50 bg-purple-950/40 hover:bg-purple-900/50 text-white font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm animate-fade-in-right animation-delay-500"
            >
              <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Learn More
              </span>
            </Link>
          </div>

          {/* Stats with counting animation */}
          <div ref={sectionRef} className="grid grid-cols-3 gap-8 max-w-md mb-16">
            <div className="text-center animate-fade-in-up animation-delay-700">
              <div className="flex items-center justify-center gap-2">
                <FaUsers className="text-purple-400 text-xl" />
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tabular-nums">
                  {counts.users}K+
                </div>
              </div>
              <div className="text-sm text-purple-300 mt-2">Active Users</div>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-800">
              <div className="flex items-center justify-center gap-2">
                <FaAward className="text-purple-400 text-xl" />
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tabular-nums">
                  {counts.accuracy}%
                </div>
              </div>
              <div className="text-sm text-purple-300 mt-2">Accuracy</div>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-900">
              <div className="flex items-center justify-center gap-2">
                <FaSmile className="text-purple-400 text-xl" />
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tabular-nums">
                  {counts.satisfaction}%
                </div>
              </div>
              <div className="text-sm text-purple-300 mt-2">Satisfaction</div>
            </div>
          </div>

          {/* Feature cards with stagger animation */}
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-12 animate-fade-in-up animation-delay-1000">
              Featured Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-800/30 border border-purple-700/20 backdrop-blur-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-purple-500/40 animate-fade-in-up`}
                  style={{ animationDelay: `${1200 + index * 200}ms` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-purple-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>

      <style jsx>{`
        /* Pulse animations */
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Spin animations for geometric patterns */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 25s linear infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: translate(-50%, -50%) rotate(45deg) scale(1); }
          50% { opacity: 0.1; transform: translate(-50%, -50%) rotate(45deg) scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        /* Fade in animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-left {
          opacity: 0;
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          opacity: 0;
          animation: fadeInRight 0.8s ease-out forwards;
        }

        /* Gradient animation */
        @keyframes gradientX {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease-in-out infinite;
        }

        /* Animation delays */
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-700 {
          animation-delay: 700ms;
        }
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        .animation-delay-900 {
          animation-delay: 900ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default Banner;