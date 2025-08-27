import ContractsStatus from "../../ui/website/home/ContractsStatus";
import GoalsHelpSection from "../../ui/website/home/GoalsHelpSection";
import GoalSlider from "../../ui/website/home/GoalSlider";
import HelpersSlider from "../../ui/website/home/HelpersSlider";
import Hero from "../../ui/website/home/Hero";
import OffersSlider from "../../ui/website/home/OffersSlider";

export default function Home() {
  return (
    <section className="container-lg">
      <div className="row">
        <div className="col-12 p-2">
          <Hero />
        </div>
        <div className="col-12 p-2">
          <GoalsHelpSection />
        </div>
        <div className="col-12 p-2">
          <GoalSlider />
        </div>
        <div className="col-12 p-2">
          <OffersSlider />
        </div>
        <div className="col-12 p-2">
          <HelpersSlider />
        </div>
        <div className="col-12 p-2">
          <ContractsStatus />
        </div>
        {/* <Statistics /> */}
        {/* <Parteners /> */}
        {/* <WhyUsSection /> */}
        {/* <GetInspired />  */}
      </div>
    </section>
  );
}
