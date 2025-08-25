import ContractsStatus from "../../ui/website/home/ContractsStatus";
import GoalsHelpSection from "../../ui/website/home/GoalsHelpSection";
import GoalSlider from "../../ui/website/home/GoalSlider";
import HelpersSlider from "../../ui/website/home/HelpersSlider";
import Hero from "../../ui/website/home/Hero";
import OffersSlider from "../../ui/website/home/OffersSlider";

export default function Home() {
  return (
    <>
      <Hero />
      <GoalsHelpSection />
      <GoalSlider />
      <OffersSlider />
      <HelpersSlider />
      <ContractsStatus />
      {/* <Statistics /> */}
      {/* <Parteners /> */}
      {/* <WhyUsSection /> */}
      {/* <GetInspired />  */}
    </>
  );
}
