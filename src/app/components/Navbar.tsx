"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

import {
  FaHome,
  FaWeight,
  FaFire,
  FaPercent,
  FaUtensils,
  FaCalculator,
  FaInfoCircle,
  FaEnvelope,
  FaChartPie,
} from "react-icons/fa";

export interface NavLink {
  name: string;
  href: string;
  icon: any;
  description?: string;
  mobileOnly?: boolean;
}

export const mainNavLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    name: "BMI",
    href: "/calculators/bmi",
    icon: FaWeight,
    description: "Body Mass Index",
  },
  {
    name: "BMR",
    href: "/calculators/bmr",
    icon: FaFire,
    description: "Basal Metabolic Rate",
  },
  {
    name: "Body Fat",
    href: "/calculators/body-fat",
    icon: FaPercent,
    description: "Body Fat Percentage",
  },
  {
    name: "Calories",
    href: "/calculators/calorie-intake",
    icon: FaUtensils,
    description: "Daily Calorie Needs",
  },
  {
    name: "All Calculators",
    href: "/all-calculators",
    icon: FaCalculator,
  },
  {
    name: "About",
    href: "/about",
    icon: FaInfoCircle,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: FaEnvelope,
  },
];

export const mobileExtraLinks: NavLink[] = [
  {
    name: "Macro Calculator",
    href: "/macro-calculator",
    icon: FaChartPie,
    mobileOnly: true,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Get active link styles
  const getLinkClasses = (href: string) => {
    return `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive(href)
        ? "bg-purple-800 text-white shadow-lg shadow-purple-500/20"
        : "text-gray-300 hover:bg-purple-800/50 hover:text-white hover:scale-105"
    }`;
  };

  // Get mobile link styles
  const getMobileLinkClasses = (href: string) => {
    return `flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
      isActive(href)
        ? "bg-purple-800 text-white"
        : "text-gray-300 hover:bg-purple-800/50 hover:text-white"
    }`;
  };

  // All links for mobile (main + extras)
  const allMobileLinks = [...mainNavLinks, ...mobileExtraLinks];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gray-950/90 backdrop-blur-xl border-b border-purple-700/30 shadow-lg shadow-purple-500/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Home Button */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="FitterCall Home"
            >
              {/* Logo Icon */}
              <div
                className={`w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                  isScrolled ? "shadow-md shadow-purple-500/30" : ""
                }`}
              >
                <span className="text-white font-bold text-sm">FC</span>
              </div>
              {/* Brand Name */}
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
                FitterCall
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getLinkClasses(link.href)}
                  title={link.description || link.name}
                >
                  <link.icon className="mr-1.5 text-sm" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                isScrolled
                  ? "text-purple-300 hover:text-white hover:bg-purple-800/50"
                  : "text-white hover:text-purple-300 hover:bg-purple-800/30"
              }`}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div
          className={`px-2 pt-2 pb-3 space-y-1 backdrop-blur-xl border-t border-purple-700/20 ${
            isScrolled ? "bg-gray-950/95" : "bg-gray-950/80"
          }`}
        >
          {allMobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getMobileLinkClasses(link.href)}
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="mr-2" />
              {link.name}
              {isActive(link.href) && (
                <span className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
