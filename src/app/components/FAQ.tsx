"use client";
import { useState } from "react";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaEnvelope,
  FaArrowRight,
  FaSearch,
  FaCalculator,
  FaBalanceScale,
  FaPercentage,
  FaCalendarCheck,
  FaUserMd,
  FaHeartbeat,
  FaWeight,
} from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is BMI?",
      answer:
        "BMI (Body Mass Index) is a measurement that uses your height and weight to estimate body fat. It's calculated by dividing your weight in kilograms by your height in meters squared. BMI provides a general indication of whether you're underweight, normal weight, overweight, or obese.",
      icon: <FaBalanceScale className="text-xl" />,
      color: "from-purple-500 to-pink-500",
      category: "General",
      relatedLinks: ["BMI Calculator", "Body Fat Calculator"],
    },
    {
      question: "Is BMI accurate?",
      answer:
        "BMI is a useful screening tool but has limitations. It doesn't directly measure body fat or distinguish between muscle and fat mass. Athletes with high muscle mass may have a high BMI but low body fat. For a more complete picture, combine BMI with other measurements like waist circumference, body fat percentage, and overall health indicators.",
      icon: <FaQuestionCircle className="text-xl" />,
      color: "from-blue-500 to-purple-600",
      category: "Accuracy",
      relatedLinks: ["Body Fat Calculator", "Waist-to-Hip Ratio"],
    },
    {
      question: "What is body fat percentage?",
      answer:
        "Body fat percentage is the proportion of fat in your body compared to everything else (muscles, bones, organs, water). For men, healthy ranges are typically 10-20%, while women range from 18-28%. It's a more accurate indicator of fitness than BMI alone, as it distinguishes between fat mass and lean body mass.",
      icon: <FaPercentage className="text-xl" />,
      color: "from-green-500 to-purple-500",
      category: "Measurements",
      relatedLinks: ["Body Fat Calculator", "Lean Body Mass"],
    },
    {
      question: "How often should I calculate BMI?",
      answer:
        "For most people, calculating BMI every 4-6 weeks is sufficient to track trends. However, if you're actively trying to lose or gain weight, monthly measurements can help monitor progress. Remember that daily fluctuations are normal, so avoid checking too frequently.",
      icon: <FaCalendarCheck className="text-xl" />,
      color: "from-orange-500 to-pink-500",
      category: "Usage",
      relatedLinks: ["Weight Tracker", "Progress Dashboard"],
    },
    {
      question: "What's a healthy BMI range?",
      answer:
        "According to the World Health Organization (WHO), a healthy BMI ranges from 18.5 to 24.9. Below 18.5 is considered underweight, 25-29.9 is overweight, and 30 or above indicates obesity. However, these ranges may vary slightly for different ethnicities and age groups.",
      icon: <FaHeartbeat className="text-xl" />,
      color: "from-pink-500 to-purple-500",
      category: "Health Ranges",
      relatedLinks: ["BMI Categories", "Health Risk Assessment"],
    },
    {
      question: "Can BMI be used for children?",
      answer:
        "BMI is calculated differently for children and teens (ages 2-19). It's called BMI-for-age and is gender-specific. Pediatricians use growth charts to track BMI percentiles rather than the adult categories. Always consult a healthcare provider for children's BMI interpretation.",
      icon: <FaUserMd className="text-xl" />,
      color: "from-indigo-500 to-purple-500",
      category: "Special Cases",
      relatedLinks: ["Children's BMI Calculator", "Growth Charts"],
    },
    {
      question: "How does muscle affect BMI?",
      answer:
        "Muscle is denser than fat, so very muscular individuals may have a high BMI despite having low body fat. For example, bodybuilders often fall into the 'overweight' or 'obese' BMI categories. This is why BMI should be used alongside other measurements for athletic individuals.",
      icon: <FaWeight className="text-xl" />,
      color: "from-teal-500 to-purple-500",
      category: "Limitations",
      relatedLinks: ["Body Fat Calculator", "Lean Body Mass Calculator"],
    },
    {
      question: "What should I do if my BMI is high?",
      answer:
        "If your BMI indicates overweight or obesity, start with small, sustainable changes: increase physical activity to 150+ minutes weekly, focus on whole foods, reduce processed food intake, and ensure adequate sleep. Consider consulting a healthcare provider or registered dietitian for personalized advice.",
      icon: <FaCalculator className="text-xl" />,
      color: "from-red-500 to-purple-500",
      category: "Action Steps",
      relatedLinks: ["Calorie Calculator", "BMR Calculator", "Diet Plans"],
    },
  ];

  // Filter FAQs based on search
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique categories
  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const displayedFAQs =
    activeCategory === "All"
      ? filteredFAQs
      : filteredFAQs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="relative py-16 px-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-purple-900/50 rounded-full border border-purple-700/30 mb-6">
            <FaQuestionCircle className="text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">
              Got Questions?
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Find answers to common questions about BMI, body fat, and our
            fitness calculators.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 bg-opacity-40 border border-purple-700 border-opacity-30 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20"
                  : "bg-gray-800 bg-opacity-40 border border-purple-700 border-opacity-30 text-purple-200 hover:bg-purple-900/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {displayedFAQs.length > 0 ? (
            displayedFAQs.map((faq, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div
                  className={`bg-gray-900/40 bg-opacity-40 rounded-xl border border-purple-700 border-opacity-30 backdrop-blur-sm transition-all duration-500 ${
                    openIndex === index
                      ? "shadow-xl shadow-purple-500/20"
                      : "hover:shadow-lg hover:shadow-purple-500/10"
                  }`}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`hidden sm:inline-flex p-2 rounded-lg bg-gradient-to-r ${faq.color} transition-transform duration-300`}
                      >
                        {faq.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 bg-purple-700/20 rounded-full border border-purple-600/20 text-purple-300">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <FaChevronDown
                      className={`text-purple-400 text-lg transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Answer Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="border-t border-purple-700/20 pt-4">
                        <p className="text-purple-200 text-sm leading-relaxed mb-4">
                          {faq.answer}
                        </p>

                        {/* Related Links */}
                        <div className="flex flex-wrap gap-2">
                          {faq.relatedLinks.map((link, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center text-xs bg-purple-700/20 text-purple-300 px-3 py-1 rounded-full border border-purple-600/20 hover:bg-purple-700/40 transition-colors duration-300 cursor-pointer"
                            >
                              <FaArrowRight className="mr-1 text-[10px]" />
                              {link}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${faq.color} rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}
                ></div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
                <FaSearch className="text-2xl text-purple-400" />
              </div>
              <h3 className="text-xl text-purple-200 mb-2">No Results Found</h3>
              <p className="text-purple-300">
                Try adjusting your search terms or browse categories above.
              </p>
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="text-center mt-16">
          <div className="bg-gray-900/40 bg-opacity-40 rounded-xl p-8 border border-purple-700 border-opacity-30 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center p-4 bg-purple-700/20 rounded-full mb-4">
              <FaEnvelope className="text-2xl text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Still Have Questions?
            </h3>
            <p className="text-purple-200 mb-6 max-w-md mx-auto">
              Can't find the answer you're looking for? Reach out to our team
              and we'll be happy to help.
            </p>
            <button className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 group">
              Contact Support
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;