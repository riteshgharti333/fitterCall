"use client";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-purple-900 text-white pt-16 pb-8 px-4 border-t border-purple-700 border-opacity-30">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FitterCall
              </span>
            </Link>
            <p className="text-purple-200 text-sm leading-relaxed max-w-xs">
              Precision health calculators to optimize your fitness, track
              progress, and transform your wellbeing.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="p-2 bg-purple-800 hover:bg-purple-700 rounded-lg transition-colors duration-300"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-purple-800 hover:bg-purple-700 rounded-lg transition-colors duration-300"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-purple-800 hover:bg-purple-700 rounded-lg transition-colors duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-purple-800 hover:bg-purple-700 rounded-lg transition-colors duration-300"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Calculators Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Calculators
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/calculators/bmi"
                  className="flex items-center text-purple-200 hover:text-white transition-colors duration-300 group"
                >
                  <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/bmr"
                  className="flex items-center text-purple-200 hover:text-white transition-colors duration-300 group"
                >
                  <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  BMR Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/body-fat"
                  className="flex items-center text-purple-200 hover:text-white transition-colors duration-300 group"
                >
                  <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Body Fat Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/calorie-intake"
                  className="flex items-center text-purple-200 hover:text-white transition-colors duration-300 group"
                >
                  <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Calorie Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators"
                  className="flex items-center text-purple-200 hover:text-white transition-colors duration-300 group mt-2 font-medium"
                >
                  <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  View All Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-purple-200 hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-purple-200 hover:text-white transition-colors duration-300"
                >
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-purple-200 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-purple-200 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-purple-200 hover:text-white transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-purple-400" />
                <span className="text-purple-200">support@fittercall.com</span>
              </div>
              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-purple-400" />
                <span className="text-purple-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-purple-400" />
                <span className="text-purple-200">
                  123 Fitness Ave, Health City
                </span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-4">
              <h4 className="text-sm font-medium text-purple-300 mb-2">
                Stay Updated
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 border border-purple-700 border-opacity-30 text-white px-3 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-r-lg transition-all duration-300">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-700 border-opacity-30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-300 text-sm">
            © {new Date().getFullYear()} FitterCall. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-purple-300 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-purple-300 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="text-purple-300 hover:text-white text-sm transition-colors duration-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
