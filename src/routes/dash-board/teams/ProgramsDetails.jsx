import { useTranslation } from "react-i18next";

import useGetAssistantOffersDetails from "../../../hooks/dashboard/subscription/assistantOffers/useGetAssistantOffersDetails";
import SectionHeader from "../../../ui/website/SectionHeader";
import Loading from "../../../ui/loading/Loading";
import { Link } from "react-router";
import TopInfo from "../../../ui/website/offers/TopInfo";
import OfferInfoGrid from "../../../ui/website/offers/OfferInfoGrid";

export default function ProgramsDetails() {
  const { t } = useTranslation();
  const { assistantOffersDetails, isLoading } = useGetAssistantOffersDetails();
  if (isLoading) return <Loading />;
  console.log("assisatant details", assistantOffersDetails);

  return (
    <section className="page offer-details-section">
      <div className="container">
        <div className="col-12 p-2">
          <div className="header">
            <SectionHeader title={t("website.offerDetails.title")} />
          </div>
        </div>

        <div className="goal-details-card mt-3 row">
          <div className="col-12 col-lg-4 p-2">
            <Link to={`/dashboard/user-details/${assistantOffersDetails?.user?.id}`}>
              <TopInfo offer={assistantOffersDetails} />
            </Link>
          </div>

          <div className="col-lg-8 col-12 p-2">
            <div className="hed">
              <img src="/icons/help-triangle.svg" />
              <h6>{t("website.offerDetails.assistance")}</h6>
            </div>
            <p className="desc">{assistantOffersDetails?.title}</p>

            <OfferInfoGrid offer={assistantOffersDetails} />

            {assistantOffersDetails?.help_service?.notes && (
              <div className="extra-terms">
                <h2>{t("website.offerDetails.extraTerms")}</h2>
                <p>{assistantOffersDetails?.help_service?.notes}</p>
              </div>
            )}

            <div className="extra-terms">
              <h2>{t("website.offerDetails.mechanisms")}</h2>
              <ul className="mechanisms-list">
                {assistantOffersDetails?.mechanisms.map((item) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </div>

            <div className="rates">
              <h2>{t("website.offerDetails.previousRatings")}</h2>
              <div className="extra-terms">
                <div className="content">
                  <h3>{t("website.offerDetails.previousUsers")}</h3>
                  <div className="user-count">
                    <i className="fa-regular fa-users"></i>
                    <span>{assistantOffersDetails?.previous_users}</span>
                  </div>
                </div>
              </div>
              <div className="extra-terms">
                <div className="content">
                  <h3>{t("website.offerDetails.overallRating")}</h3>
                  <div className="user-count gap-1">
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#FFBE4C", fontSize: "14px" }}
                    ></i>
                    <span>{assistantOffersDetails?.rate}</span>
                    <span style={{ color: "#0D0D0D8F" }}>
                      ({assistantOffersDetails?.number_of_raters})
                    </span>
                  </div>
                </div>
                <ul className="rate-list">
                  <li>
                    <span>{t("website.offerDetails.experience")}</span>
                    <span>{assistantOffersDetails?.experience_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.time")}</span>
                    <span>{assistantOffersDetails?.time_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.quality")}</span>
                    <span>{assistantOffersDetails?.quality_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.treatment")}</span>
                    <span>{assistantOffersDetails?.good_treatment}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
