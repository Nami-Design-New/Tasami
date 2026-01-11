import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Loading from "../../../ui/loading/Loading";
import SectionHeader from "../../../ui/website/SectionHeader";
import TopInfo from "../../../ui/website/offers/TopInfo";
import GoalInfoGrid from "../../../ui/website/gaols/GoalInfoGrid";
import useGetHelpRequestDetails from "../../../hooks/dashboard/subscription/helpRequest/useGetHelpRequestDetails";
import triangleWithHelper from "../../../assets/icons/triangle-with-helper.svg";
export default function MyServicesDetails() {
  const { t } = useTranslation();
  const { helpRequestDetails, isLoading } = useGetHelpRequestDetails();

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
              to={`/dashboard/user-details/${helpRequestDetails?.user?.id}`}
            >
              <TopInfo offer={helpRequestDetails} />
            </Link>
          </div>
          <div className="col-lg-8 col-12 p-2 ">
            <div className="hed">
              <img src={triangleWithHelper} />
              <h6>{t("website.offerDetails.goal")}</h6>
            </div>
            <p className="desc ">{helpRequestDetails?.title}</p>
            <GoalInfoGrid goal={helpRequestDetails} />
            <div className="extra-terms">
              <h2>{t("website.offerDetails.mechanisms")}</h2>
              <ul className="mechanisms-list">
                {helpRequestDetails?.mechanisms.map((item) => (
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
