"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaCalculator,
  FaInfoCircle,
  FaEnvelope,
  FaWeight,
  FaFire,
  FaPercent,
  FaUtensils,
  FaChartPie,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="  absolute w-full z-999">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                FitterCall
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/bmi-calculator"
                className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <FaWeight className="mr-1" />
                BMI
              </Link>
              <Link
                href="/bmr-calculator"
                className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <FaFire className="mr-1" />
                BMR
              </Link>
              <Link
                href="/body-fat-calculator"
                className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <FaPercent className="mr-1" />
                Body Fat
              </Link>
              <Link
                href="/calorie-calculator"
                className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <FaUtensils className="mr-1" />
                Calories
              </Link>
              <Link
                href="/macro-calculator"
                className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <FaChartPie className="mr-1" />
                Macros
              </Link>
              <Link
                href="/all-calculators"
                className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <FaCalculator className="mr-1" />
                All Calculators
              </Link>
              <Link
                href="/about"
                className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <FaInfoCircle className="mr-1" />
                About
              </Link>
              <Link
                href="/contact"
                className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <FaEnvelope className="mr-1" />
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-300 hover:text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <FaBars className="block h-6 w-6" />
              ) : (
                <FaTimes className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <Link
              href="/bmi-calculator"
              className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaWeight className="mr-2" />
              BMI Calculator
            </Link>
            <Link
              href="/bmr-calculator"
              className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaFire className="mr-2" />
              BMR Calculator
            </Link>
            <Link
              href="/body-fat-calculator"
              className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaPercent className="mr-2" />
              Body Fat Calculator
            </Link>
            <Link
              href="/calorie-calculator"
              className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaUtensils className="mr-2" />
              Calorie Calculator
            </Link>
            <Link
              href="/macro-calculator"
              className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaChartPie className="mr-2" />
              Macro Calculator
            </Link>
            <Link
              href="/body-calculators"
              className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaCalculator className="mr-2" />
              All Calculators
            </Link>
            <Link
              href="/about"
              className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaInfoCircle className="mr-2" />
              About
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaEnvelope className="mr-2" />
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
