import { useTranslation } from "react-i18next";
import useGetOfferDetials from "../../hooks/website/my-assistances/useGetOfferDetials";
import Loading from "../../ui/loading/Loading";
import OptionsMenu from "../../ui/website/OptionsMenu";
import SectionHeader from "../../ui/website/SectionHeader";
import OfferInfoGrid from "../../ui/website/offers/OfferInfoGrid";
import TopInfo from "../../ui/website/offers/TopInfo";
import { useSelector } from "react-redux";
import CustomLink from "../../ui/CustomLink";
export default function OfferDetails() {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const { offerDetails, isLoading } = useGetOfferDetials();

  if (isLoading) return <Loading />;

  return (
    <section className="page offer-details-section ">
      <div className="container">
        <div className="col-12 p-2">
          <div className="header">
            <SectionHeader title={t("website.offerDetails.title")} />
            <OptionsMenu
              options={[
                {
                  label: t("website.offerDetails.edit"),
                  onClick: () => console.log("edit"),
                },
                {
                  label: t("website.offerDetails.archive"),
                  onClick: () => console.log("Archive"),
                },
                {
                  label: t("website.offerDetails.delete"),
                  onClick: () => console.log("Delete"),
                  className: "text-danger",
                },
              ]}
            />
          </div>
        </div>

        <div className="goal-details-card mt-3 row">
          <div className="col-12 col-lg-4 p-2">
            <TopInfo offer={offerDetails} />
          </div>
          <div className="col-lg-8 col-12 p-2 ">
            <div className="hed">
              <img src="/icons/help-triangle.svg" />
              <h6>{t("website.offerDetails.assistance")}</h6>{" "}
            </div>
            <p className="desc">{offerDetails?.title}</p>
            <OfferInfoGrid offer={offerDetails} />{" "}
            <div className="extra-terms">
              <h2>{t("website.offerDetails.extraTerms")}</h2>{" "}
              <p>{offerDetails?.help_service?.notes}</p>
            </div>{" "}
            <div className="extra-terms">
              <h2>{t("website.offerDetails.mechanisms")}</h2>
              <ul className="mechanisms-list  ">
                {offerDetails.mechanisms.map((item) => (
                  <li
                    key={item.id}
                    className={`mech-item  ${lang === "en" ? "en" : ""} `}
                  >
                    {item.title}{" "}
                  </li>
                ))}
              </ul>
            </div>{" "}
            <div className="rates">
              <h2>{t("website.offerDetails.previousRatings")}</h2>
              <div className="extra-terms">
                <div className="content">
                  <h3>{t("website.offerDetails.previousUsers")}</h3>
                  <div className="user-count">
                    <i className="fa-regular fa-users"></i>
                    <span>{offerDetails.previous_users}</span>
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
                    <span>{offerDetails.rate}</span>
                    <span style={{ color: "#0D0D0D8F" }}>
                      ({offerDetails.number_of_raters})
                    </span>
                  </div>
                </div>
                <ul className="rate-list">
                  <li>
                    <span>{t("website.offerDetails.experience")}</span>
                    <span>{offerDetails.experience_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.time")}</span>
                    <span>{offerDetails.time_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.quality")}</span>
                    <span>{offerDetails.quality_rate}</span>
                  </li>
                  <li>
                    <span>{t("website.offerDetails.treatment")}</span>
                    <span>{offerDetails.good_treatment}</span>
                  </li>
                </ul>
              </div>
            </div>
            {offerDetails.rate && (
              <div className="buttons justify-content-end mt-2">
                <CustomLink
                  type="outlined"
                  color="primary"
                  to={`/offers/${offerDetails?.id}/rates`}
                >
                  {t("website.offerDetails.showReviews")}
                </CustomLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
