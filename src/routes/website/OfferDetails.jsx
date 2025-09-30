import { useTranslation } from "react-i18next";
import useGetOfferDetials from "../../hooks/website/my-assistances/useGetOfferDetials";
import Loading from "../../ui/loading/Loading";
import OptionsMenu from "../../ui/website/OptionsMenu";
import SectionHeader from "../../ui/website/SectionHeader";
import OfferInfoGrid from "../../ui/website/offers/OfferInfoGrid";
import TopInfo from "../../ui/website/offers/TopInfo";
import { useSelector } from "react-redux";
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
              <img src="/icons/triangle.svg" />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
