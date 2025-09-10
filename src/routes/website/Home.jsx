import useGetHomeData from "../../hooks/website/home/useGetHomeData";
import Loading from "../../ui/loading/Loading";
import ContractsStatus from "../../ui/website/home/ContractsStatus";
import GoalsHelpSection from "../../ui/website/home/GoalsHelpSection";
import GoalSlider from "../../ui/website/home/GoalSlider";
import HelpersSlider from "../../ui/website/home/HelpersSlider";
import Hero from "../../ui/website/home/Hero";
import OffersSlider from "../../ui/website/home/OffersSlider";

export default function Home() {
  const { homePageData, isLoading } = useGetHomeData();

  if (isLoading) return <Loading />;
  return (
    <section className="container-lg p-0">
      <div className="row">
        <div className="col-12 p-2 ">
          <Hero sliders={homePageData.sliders} />
        </div>
        <div className="col-12 p-2 my-3">
          <GoalsHelpSection goals={homePageData.goals} />
        </div>
        {homePageData.goals.length > 0 && (
          <div className="col-12 p-2 my-3">
            <GoalSlider goals={homePageData.goals} />
          </div>
        )}
        {homePageData.help_service.length > 0 && (
          <div className="col-12 p-2 my-3">
            <OffersSlider offers={homePageData.help_service} />
          </div>
        )}
        {homePageData.helpers.length > 0 && (
          <div className="col-12 p-2 my-3">
            <HelpersSlider helpers={homePageData.helpers} />
          </div>
        )}
        {homePageData.my_works && (
          <div className="col-12 p-2 my-3">
            <ContractsStatus stats={homePageData.my_works} />
          </div>
        )}
      </div>
    </section>
  );
}
