import Banner from "./components/Banner";
import CallCards from "./components/CallCards";
import FAQ from "./components/FAQ";
import FitnessTips from "./components/FitnessTips";
import HowItWorks from "./components/HowItWorks";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <CallCards />
      <HowItWorks />
      <FitnessTips />
      <FAQ />
    </div>
  );
}
