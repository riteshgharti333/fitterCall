import Banner from "./components/Banner";
import CallCards from "./components/CallCards";


export default function Home() {
  return (
   <div className="">
    <Banner />
    <div className="max-w-8xl m-auto flex flex-col gap-10 mt-10">
    <CallCards />

    </div>
   </div>
  );
}
