"use client";

import Link from "next/link";
import { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import { Calculator } from "../data/data";

const CalcCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 ">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <FaCalculator className="text-2xl text-white" />
            All{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ">
              {" "}
              Calculators{" "}
            </span>
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Explore our comprehensive suite of fitness calculators to track,
            analyze, and optimize your health journey.
          </p>
        </div>

        {/* Calculator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {Calculator.map((calc, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`h-full bg-gray-800 bg-opacity-40 rounded-xl p-6 border border-purple-700 border-opacity-30 backdrop-blur-sm transition-all duration-500 transform-gpu ${
                  hoveredCard === index
                    ? "shadow-xl shadow-purple-500/20 -translate-y-2"
                    : "hover:shadow-lg hover:shadow-purple-500/10"
                }`}
              >
                {/* Icon with gradient background */}
                <div
                  className={`mb-5 inline-flex p-3 rounded-lg bg-gradient-to-r ${
                    calc.color
                  } transition-transform duration-300 ${
                    hoveredCard === index ? "scale-110" : ""
                  }`}
                >
                  {calc.icon}
                </div>

                {/* Calculator Name */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {calc.name}
                </h3>

                {/* Description */}
                <p className="text-purple-200 text-sm mb-5 leading-relaxed">
                  {calc.desc}
                </p>

                {/* Button */}
                <Link
                  href={calc.link}
                  className="inline-flex items-center text-sm font-medium text-white bg-purple-700 bg-opacity-50 hover:bg-opacity-100 py-2 px-4 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30"
                >
                  Calculate Now
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${calc.color} rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-purple-300 mb-6">
            Can't find what you're looking for?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center border border-purple-600 text-purple-300 hover:text-white hover:bg-purple-700 py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <svg
              className="mr-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            Contact Us
          </Link>
        </div>
      </div>

    </div>
  );
};

export default CalcCards;
