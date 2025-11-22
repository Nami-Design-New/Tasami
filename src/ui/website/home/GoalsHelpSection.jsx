import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomButton from "../../CustomButton";
import AddGoalModal from "../gaols/AddGoalModal";
import AddAssistanceModal from "../offers/AddAssistanceModal";
import PlatformModal from "../platform/PlatformModal";

export default function GoalsHelpSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.authRole);

  const [showModal, setShowModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  return (
    <section className={`goals-help-section ${lang === "en" && "en"}  `}>
      <CustomButton
        onClick={() => {
          if (user) {
            if (
              user?.country !== null &&
              user?.city !== null &&
              user?.nationality !== null
            ) {
              setShowGoalModal(true);
            } else {
              navigate("/customize-services");
            }
          } else {
            navigate("/login");
          }
        }}
        className="goal-btn personal-goal"
      >
        <img src="/icons/add.svg" alt="icon" />
        {t("website.hero.personalGoal")}
      </CustomButton>
      <button
        onClick={() => {
          if (user) {
            if (
              user?.country !== null &&
              user?.city !== null &&
              user?.nationality !== null
            ) {
              if (user?.about === "") {
                setShowPlatformModal(true);
              } else {
                setShowModal(true);
              }
            } else {
              navigate("/customize-services");
            }
          } else {
            navigate("/login");
          }
        }}
        className="goal-btn offer-help"
      >
        <img src="/icons/add.svg" alt="icon" />
        {t("website.hero.offerHelp")}
      </button>
      <AddAssistanceModal showModal={showModal} setShowModal={setShowModal} />
      <AddGoalModal
        showModal={showGoalModal}
        setShowModal={setShowGoalModal}
      />{" "}
      <PlatformModal
        showModal={showPlatformModal}
        setShowModal={setShowPlatformModal}
      />
    </section>
  );
}
