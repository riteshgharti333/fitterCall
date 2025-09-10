
import { FaGlassWater, FaWeightScale } from "react-icons/fa6";
import { FaCalculator, FaWeight, FaFire, FaPercent, FaUtensils, FaRulerCombined,  FaBullseye, FaHeart } from "react-icons/fa";

export const Calculator = [
  {
    name: "BMI Calculator",
    desc: "Calculate your Body Mass Index to see if you're underweight, normal, or overweight.",
    link: "/calculators/bmi",
    icon: <FaWeight className="text-xl" />,
    color: "from-purple-500 to-purple-700"
  },
  {
    name: "BMR Calculator",
    desc: "Estimate your Basal Metabolic Rate to know how many calories your body burns at rest.",
    link: "/calculators/bmr",
    icon: <FaFire className="text-xl" />,
    color: "from-blue-500 to-purple-600"
  },
  {
    name: "Body Fat Percentage Calculator",
    desc: "Determine your body fat vs. lean mass for better fitness tracking.",
    link: "/calculators/body-fat",
    icon: <FaPercent className="text-xl" />,
    color: "from-pink-500 to-purple-500"
  },
  {
    name: "Calorie Intake / TDEE Calculator",
    desc: "Find out how many calories you need daily based on activity level.",
    link: "/calculators/calorie-intake",
    icon: <FaUtensils className="text-xl" />,
    color: "from-orange-500 to-purple-600"
  },
  {
    name: "Ideal Weight Calculator",
    desc: "Discover your ideal weight based on height, age, and gender.",
    link: "/calculators/ideal-weight",
    icon: <FaWeightScale className="text-xl" />,
    color: "from-green-500 to-purple-600"
  },
  {
    name: "Macro Nutrient Calculator",
    desc: "Calculate the optimal protein, carbs, and fat intake for your diet.",
    link: "/calculators/macro-nutrient",
    icon: <FaCalculator className="text-xl" />,
    color: "from-yellow-500 to-purple-600"
  },
  {
    name: "Waist-to-Hip Ratio Calculator",
    desc: "Measure fat distribution to understand health risk.",
    link: "/calculators/waist-hip-ratio",
    icon: <FaRulerCombined className="text-xl" />,
    color: "from-red-500 to-purple-600"
  },
  {
    name: "Water Intake Calculator",
    desc: "Get your daily water consumption recommendation for optimal hydration.",
    link: "/calculators/water-intake",
    icon: <FaGlassWater className="text-xl" />,
    color: "from-cyan-500 to-purple-600"
  },
  {
    name: "Ideal Body Weight (Hamwi/Devine Formula)",
    desc: "Professional guideline to estimate ideal body weight for men and women.",
    link: "/calculators/ideal-body-weight",
    icon: <FaBullseye className="text-xl" />,
    color: "from-teal-500 to-purple-600"
  },
  {
    name: "Fat Loss / Weight Loss Goal Calculator",
    desc: "Calculate how long it will take to reach your weight loss goal safely.",
    link: "/calculators/fat-loss-goal",
    icon: <FaHeart className="text-xl" />,
    color: "from-rose-500 to-purple-600"
  }
];
