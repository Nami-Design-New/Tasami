import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAddOrRemoveBookmark from "../../hooks/website/personal-assistances/useAddOrRemoveBookmark";
import useGetPersonalOfferDetails from "../../hooks/website/personal-assistances/useGetPersonalOfferDetails";
import CustomButton from "../../ui/CustomButton";
import Loading from "../../ui/loading/Loading";
import ContractReq from "../../ui/modals/ContractReqModal";
import ReportModal from "../../ui/modals/ReportModal";
import ReviewsModal from "../../ui/modals/ReviewsModal";
import OptionsMenu from "../../ui/website/OptionsMenu";
import SectionHeader from "../../ui/website/SectionHeader";
import InquiryModal from "../../ui/website/my-notifications/inquiryModal";
import OfferInfoGrid from "../../ui/website/offers/OfferInfoGrid";
import TopInfo from "../../ui/website/offers/TopInfo";
import { shareContent } from "../../utils/shared";
import { useNavigate } from "react-router";

export default function PersonalOffersDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.authRole);
  const { offerDetails, isLoading } = useGetPersonalOfferDetails();
  const { toggleBookmark, isPending } = useAddOrRemoveBookmark();
  const [bookmarked, setBookmarked] = useState(offerDetails?.is_saved || false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  useEffect(() => {
    setBookmarked(offerDetails?.is_saved || false);
  }, [offerDetails?.is_saved]);
  const handleToggleBookmark = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }

    const prevState = bookmarked;
    setBookmarked(!prevState);
    toggleBookmark(id, {
      onError: () => {
        setBookmarked(prevState);
      },
    });
  };
  const closeModals = () => {
    setShowHelpModal(false);
    setShowReportModal(false);
    setShowInquiryModal(false);
    setShowReviewsModal(false);
  };
  if (isLoading) return <Loading />;

  return (
    <section className="page offer-details-section">
      <div className="container">
        <div className="col-12 p-2">
          <div className="header">
            <SectionHeader title={t("website.offerDetails.title")} />

            <div className="d-flex align-items-center gap-2">
              <button
                className="toggle-bookmark-button"
                onClick={() =>
                  shareContent({
                    title: offerDetails?.title,
                    url: window.location.href,
                  })
                }
              >
                <i className="fa-solid fa-share"></i>
              </button>

              <button
                onClick={(e) => handleToggleBookmark(e, offerDetails.id)}
                className="toggle-bookmark-button"
              >
                <i
                  className={`fa-solid fa-bookmark ${
                    bookmarked ? "active" : ""
                  } ${isPending ? "opacity-50" : ""}`}
                ></i>
              </button>

              {user && (
                <OptionsMenu
                  options={[
                    {
                      label: t("website.offerDetails.inquiry"),
                      onClick: () => setShowInquiryModal(true),
                    },
                    {
                      label: t("website.offerDetails.report"),
                      onClick: () => console.log("Report"),
                      className: "text-danger",
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>

        <div className="goal-details-card mt-3 row">
          <div className="col-12 col-lg-4 p-2">
            <TopInfo offer={offerDetails} />
          </div>

          <div className="col-lg-8 col-12 p-2">
            <div className="hed">
              <img src="/icons/triangle.svg" />
              <h6>{t("website.offerDetails.assistance")}</h6>
            </div>
            <p className="desc">{offerDetails?.title}</p>

            <OfferInfoGrid
              offer={offerDetails}
              onShowHelpModal={() => setShowHelpModal(true)}
              onShowReviewsModal={() => setShowReviewsModal(true)}
            />

            {offerDetails.help_service?.notes && (
              <div className="extra-terms">
                <h2>{t("website.offerDetails.extraTerms")}</h2>
                <p>{offerDetails?.help_service?.notes}</p>
              </div>
            )}

            <div className="extra-terms">
              <h2>{t("website.offerDetails.mechanisms")}</h2>
              <ul className="mechanisms-list">
                {offerDetails.mechanisms.map((item) => (
                  <li
                    key={item.id}
                    className={`mech-item  ${lang === "en" ? "en" : ""} `}
                  >
                    {item.title}
                  </li>
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

            {user && (
              <div className="buttons justify-content-end mt-2">
                <CustomButton
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowReviewsModal(true)}
                >
                  {t("website.offerDetails.showReviews")}
                </CustomButton>
                <CustomButton onClick={() => setShowHelpModal(true)}>
                  {t("website.offerDetails.sendContract")}
                </CustomButton>
              </div>
            )}
          </div>
        </div>

        {user && (
          <>
            <ContractReq
              showModal={showHelpModal}
              setShowModal={setShowHelpModal}
            />

            <ReportModal
              showModal={showReportModal}
              setShowModal={setShowReportModal}
            />

            <InquiryModal
              workid={offerDetails.id}
              showModal={showInquiryModal}
              setShowModal={setShowInquiryModal}
            />

            <ReviewsModal
              showModal={showReviewsModal}
              setShowModal={setShowReviewsModal}
              reviews={[]}
            />
          </>
        )}
      </div>
    </section>
  );
}
