import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGetPersonalGoalDetails from "../../../hooks/dashboard/subscription/personalGoal/useGetPersonalGoalDetails";
import Loading from "../../../ui/loading/Loading";
import SectionHeader from "../../../ui/website/SectionHeader";
import TopInfo from "../../../ui/website/offers/TopInfo";
import GoalInfoGrid from "../../../ui/website/gaols/GoalInfoGrid";

export default function PersonalGoalDetails() {
  const { t } = useTranslation();
  const { personalGoalDetails, isLoading } = useGetPersonalGoalDetails();

  if (isLoading) return <Loading />;
  return (
    <section className="page goal-details-section">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="header">
              <SectionHeader title={t("website.offerDetails.goalHeader")} />
            </div>
          </div>
        </div>

        <div className="goal-details-card mt-3 row ">
          <div className="col-12 col-lg-4 p-2">
            <Link
              to={`/dashboard/user-details/${personalGoalDetails?.user?.id}`}
            >
              <TopInfo offer={personalGoalDetails} />
            </Link>
          </div>
          <div className="col-lg-8 col-12 p-2 ">
            <div className="hed">
              <img src="icons/triangle-with-helper.svg" />
              <h6>{t("website.offerDetails.goal")}</h6>
            </div>
            <p className="desc ">{personalGoalDetails?.title}</p>
            <GoalInfoGrid goal={personalGoalDetails} />
            <div className="extra-terms">
              <h2>{t("website.offerDetails.mechanisms")}</h2>
              <ul className="mechanisms-list">
                {personalGoalDetails?.mechanisms.map((item) => (
                  <li key={item.id} className={`mech-item`}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
