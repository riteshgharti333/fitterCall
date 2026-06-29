"use client";
import Link from "next/link";
import { FaHeart, FaUsers, FaRocket, FaAward, FaLightbulb } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";

const AboutPage = () => {
  const features = [
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Health First",
      description: "We prioritize your wellbeing with accurate, science-based calculations."
    },
    {
      icon: <FaShield className="text-3xl" />,
      title: "Privacy Focused",
      description: "Your data stays yours. We don't store personal information without permission."
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Fast & Accurate",
      description: "Get instant results with precision-engineered algorithms."
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Smart Insights",
      description: "Understand your results with clear explanations and actionable advice."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white">
      {/* Header Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">FitterCall</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              We're on a mission to make health tracking accessible, accurate, and empowering for everyone.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/all-calculators"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Try Our Calculators
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-purple-600/30 hover:border-purple-400/50 bg-purple-950/40 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-purple-200 mb-6">
                At FitterCall, we believe that understanding your body is the first step toward better health. 
                We've created a comprehensive suite of calculators to help you track, analyze, and optimize your fitness journey.
              </p>
              <p className="text-lg text-purple-200">
                Our tools are designed by health professionals and developers who are passionate about making 
                accurate health information accessible to everyone, regardless of their fitness level or background.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-2xl border border-purple-700/30 backdrop-blur-sm flex items-center justify-center">
                  <FaUsers className="text-6xl text-purple-400" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl border border-blue-700/30 backdrop-blur-sm flex items-center justify-center">
                  <FaAward className="text-2xl text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose FitterCall</h2>
            <p className="text-lg text-purple-200">
              We combine cutting-edge technology with health expertise to deliver tools you can trust.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-800/30 border border-purple-700/20 backdrop-blur-lg transition-all duration-500 hover:border-purple-500/40 hover:translate-y-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-purple-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">12+</div>
              <div className="text-purple-300">Calculators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">98%</div>
              <div className="text-purple-300">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-purple-300">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-purple-900/30 to-pink-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Health Journey?</h2>
            <p className="text-xl text-purple-200 mb-8">
              Join thousands of users who are already taking control of their health with our accurate calculators.
            </p>
            <Link
              href="/all-calculators"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
