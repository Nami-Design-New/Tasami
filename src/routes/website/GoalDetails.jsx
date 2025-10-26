import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useGetGoalDetails from "../../hooks/website/goals/useGetGoalDetails";
import useToggleSavedGoals from "../../hooks/website/goals/useToggleSavedGoals";
import CustomButton from "../../ui/CustomButton";
import Loading from "../../ui/loading/Loading";
import HelpModal from "../../ui/modals/HelpModal";
import ReportModal from "../../ui/modals/ReportModal";
import OptionsMenu from "../../ui/website/OptionsMenu";
import SectionHeader from "../../ui/website/SectionHeader";
import GoalInfoGrid from "../../ui/website/gaols/GoalInfoGrid";
import InquiryModal from "../../ui/website/my-notifications/inquiryModal";
import TopInfo from "../../ui/website/offers/TopInfo";
import { shareContent } from "../../utils/shared";
import { useNavigate } from "react-router";

export default function GoalDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.authRole);

  const { goalDetails, isLoading } = useGetGoalDetails();

  const { toggleSaveGoal, isPending: isSavingToggle } = useToggleSavedGoals();
  const [isActive, setIsActive] = useState(goalDetails?.is_saved);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    const prevState = isActive;
    setIsActive(!prevState);

    toggleSaveGoal(goalDetails?.id, {
      onError: (err) => {
        setIsActive(prevState);
        toast.error(err.message);
      },
    });
  };

  if (isLoading) return <Loading />;
  const isMyGoal = user?.id === goalDetails?.user?.id;
  return (
    <section className="page goal-details-section mx-3">
      <div className="container">
        <div className="header">
          <SectionHeader title={t("website.offerDetails.goalHeader")} />
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-link like-button p-0"
              disabled={isSavingToggle}
              onClick={handleToggle}
            >
              <motion.i
                key={isActive}
                initial={{ scale: 0.8, rotate: 0 }}
                animate={{
                  scale: [1, 0.85, 1.15, 1],
                  rotate: isActive ? [0, -20, 20, 0] : 0,
                  color: isActive ? "#01C7FB" : "#0D0D0D59",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="fa-solid fa-heart"
              />
            </button>

            <button
              className="toggle-bookmark-button"
              onClick={() =>
                shareContent({
                  title: goalDetails.title,
                  url: window.location.href,
                })
              }
            >
              <i
                className="fa-solid fa-share"
                style={{
                  color: "#0D0D0D59",
                }}
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

        <div className="goal-details-card mt-3 row ">
          <div className="col-12 col-lg-4 p-2">
            <TopInfo offer={goalDetails} />
          </div>
          <div className="col-lg-8 col-12 p-2 ">
            <div className="hed">
              <img src="/icons/triangle-with-helper.svg" />
              <h6>{t("website.offerDetails.goal")}</h6>
            </div>
            <p className="desc ">{goalDetails.title}</p>
            <GoalInfoGrid goal={goalDetails} />
            <div className="extra-terms">
              <h2>{t("website.offerDetails.mechanisms")}</h2>
              <ul className="mechanisms-list">
                {goalDetails.mechanisms.map((item) => (
                  <li
                    key={item.id}
                    className={`mech-item  ${lang === "en" ? "en" : ""} `}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
            {!goalDetails?.goal?.can_send_offers && !isMyGoal && (
              <div className="add-offer-wrapper">
                <p>{t("website.offerDetails.alreadySubmittedOffer")}</p>
              </div>
            )}
            {user && !isMyGoal && goalDetails?.goal?.can_send_offers && (
              <div className="add-offer-wrapper">
                <div className="offers-count">
                  <i className="fa-regular fa-layer-group"></i>
                  <div className="content">
                    {goalDetails?.goal.offers_count === 0 ? (
                      <h5 className="head fs-6 ">
                        {t("website.offerDetails.noGoalsOffers")}
                      </h5>
                    ) : (
                      <>
                        <h5 className="head">
                          {t("website.offerDetails.submittedOffers")}
                        </h5>
                        <p className="desc">
                          {goalDetails?.goal.offers_count}{" "}
                          {t("website.offerDetails.offers")}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <CustomButton onClick={() => setShowHelpModal(true)}>
                  {t("website.offerDetails.offerHelp")}{" "}
                </CustomButton>
              </div>
            )}
          </div>
        </div>
        {user && !isMyGoal && (
          <HelpModal
            goal={goalDetails}
            showModal={showHelpModal}
            setShowModal={setShowHelpModal}
          />
        )}
        {user && (
          <ReportModal
            showModal={showReportModal}
            setShowModal={setShowReportModal}
          />
        )}
        {user && (
          <InquiryModal
            showModal={showInquiryModal}
            setShowModal={setShowInquiryModal}
            workid={goalDetails?.id}
          />
        )}
      </div>
    </section>
  );
}
