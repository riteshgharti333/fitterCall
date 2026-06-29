"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp, FaCalculator, FaQuestionCircle, FaSearch } from "react-icons/fa";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "General Questions",
      icon: <FaQuestionCircle className="text-xl" />,
      questions: [
        {
          question: "What is FitterCall and how does it work?",
          answer: "FitterCall is a comprehensive fitness calculator platform that helps you track and analyze various health metrics. Our calculators use scientifically validated formulas to provide accurate results for BMI, BMR, body fat percentage, calorie needs, and more. Simply input your measurements, and our algorithms do the rest."
        },
        {
          question: "Are the calculator results accurate?",
          answer: "Yes, our calculators use established medical and scientific formulas such as the Mifflin-St Jeor equation for BMR, WHO standards for BMI, and Jackson-Pollock methods for body fat. However, remember these are estimates - individual variations can occur based on factors like muscle mass, bone density, and metabolic health."
        }
      ]
    },
    {
      title: "Calculator Specifics",
      icon: <FaCalculator className="text-xl" />,
      questions: [
        {
          question: "How often should I calculate my BMI?",
          answer: "For most adults, calculating BMI once a month is sufficient unless you're actively trying to lose or gain weight. During active weight management phases, checking every 2-3 weeks can help track progress. Remember that BMI doesn't distinguish between muscle and fat, so it's best used as a general guideline alongside other measurements."
        },
        {
          question: "What's the difference between BMR and TDEE?",
          answer: "BMR (Basal Metabolic Rate) is the calories your body needs at complete rest to maintain basic functions like breathing and circulation. TDEE (Total Daily Energy Expenditure) includes your BMR plus calories burned through physical activity and digesting food. TDEE gives a more complete picture of your daily calorie needs."
        },
        {
          question: "How accurate is the body fat percentage calculator?",
          answer: "Our body fat calculator provides a good estimate (within 3-5% accuracy) for most people when measurements are taken correctly. For the most accurate results, ensure measurements are taken consistently (same time of day, same conditions). For clinical precision, methods like DEXA scans or hydrostatic weighing are recommended."
        },
        {
          question: "Why do I need to know my macros?",
          answer: "Macronutrients (proteins, carbs, and fats) each play unique roles in your body. Tracking macros helps ensure you're getting the right balance for your goals - whether that's weight loss, muscle gain, or maintenance. Proper macro distribution can optimize energy levels, support muscle recovery, and help manage hunger."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.title }))
  );

  const filteredQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white">
      {/* Header Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              Find answers to common questions about our fitness calculators and how to use them effectively.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-purple-700/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {searchTerm ? (
            // Search Results
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Search Results ({filteredQuestions.length} found)
              </h2>
              <div className="space-y-4">
                {filteredQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 border border-purple-700/20 rounded-xl backdrop-blur-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                    >
                      <span className="font-semibold text-lg text-white">
                        {item.question}
                      </span>
                      {openIndex === index ? (
                        <FaChevronUp className="text-purple-400 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="text-purple-400 flex-shrink-0" />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-4">
                        <p className="text-purple-200 leading-relaxed">
                          {item.answer}
                        </p>
                        <div className="mt-2">
                          <span className="text-sm text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Categorized FAQs
            <div className="max-w-4xl mx-auto space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-500/20">
                      {category.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                      {category.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {category.questions.map((item, questionIndex) => {
                      const globalIndex = faqCategories
                        .slice(0, categoryIndex)
                        .reduce((acc, cat) => acc + cat.questions.length, 0) + questionIndex;
                      
                      return (
                        <div
                          key={questionIndex}
                          className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 border border-purple-700/20 rounded-xl backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-purple-500/40"
                        >
                          <button
                            onClick={() => toggleQuestion(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                          >
                            <span className="font-semibold text-lg text-white pr-4">
                              {item.question}
                            </span>
                            {openIndex === globalIndex ? (
                              <FaChevronUp className="text-purple-400 flex-shrink-0" />
                            ) : (
                              <FaChevronDown className="text-purple-400 flex-shrink-0" />
                            )}
                          </button>
                          {openIndex === globalIndex && (
                            <div className="px-6 pb-4">
                              <p className="text-purple-200 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Additional Help Section */}
          <div className="max-w-4xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-700/30 backdrop-blur-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Still Need Help?
              </h2>
              <p className="text-lg text-purple-200 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Contact Support
                </Link>
                <Link
                  href="/calculators"
                  className="px-6 py-3 border border-purple-600/30 hover:border-purple-400/50 bg-purple-950/40 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Explore Calculators
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Calculator Links */}
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Popular Calculators
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "BMI Calculator", href: "/calculators/bmi" },
                { name: "BMR Calculator", href: "/calculators/bmr" },
                { name: "Body Fat %", href: "/calculators/body-fat" },
                { name: "Calorie Calculator", href: "/calculators/calories" }
              ].map((calculator, index) => (
                <Link
                  key={index}
                  href={calculator.href}
                  className="text-center p-4 bg-gray-800/30 border border-purple-700/20 rounded-xl hover:border-purple-500/40 transition-all duration-300"
                >
                  <span className="text-purple-200 hover:text-white transition-colors">
                    {calculator.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;