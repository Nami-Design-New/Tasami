import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomButton from "../../CustomButton";
import AddGoalModal from "../gaols/AddGoalModal";
import AddAssistanceModal from "../offers/AddAssistanceModal";
import PlatformModal from "../platform/PlatformModal";
import addIcon from "../../../assets/icons/add.svg";
import useFirstGroupGuard from "../../../hooks/website/my-groups/useFirstGroupGuard";
import FirstGroupRequiredModal from "../platform/FirstGroupRequiredModal";
import useGetCountersNotify from "../../../hooks/website/useGetCountersNotify";
import {
  ACTIVITY_LIMIT_TYPES,
  getActivityLimitState,
} from "../../../utils/activityLimits";
import ActivityLimitAlert from "../ActivityLimitAlert";

export default function GoalsHelpSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.authRole);

  const [showModal, setShowModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [beneficiaryLimitAlert, setBeneficiaryLimitAlert] = useState({
    show: false,
    limit: undefined,
  });
  const { counterNotify, isLoading: isCountersLoading } =
    useGetCountersNotify();
  const beneficiaryLimit = getActivityLimitState(
    counterNotify,
    ACTIVITY_LIMIT_TYPES.BENEFICIARY,
  );

  const showBeneficiaryLimitAlert = (limit = beneficiaryLimit.limit) => {
    setBeneficiaryLimitAlert({
      show: true,
      limit: limit ?? beneficiaryLimit.activeCount,
    });
  };
  const {
    requestAssistanceCreation,
    showFirstGroupWarning,
    closeFirstGroupWarning,
    createFirstGroup,
  } = useFirstGroupGuard(() => setShowModal(true));
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
              if (beneficiaryLimit.isBlocked) {
                showBeneficiaryLimitAlert();
              } else {
                setShowGoalModal(true);
              }
            } else {
              navigate("/customize-services");
            }
          } else {
            navigate("/login");
          }
        }}
        loading={Boolean(user) && isCountersLoading}
        className="goal-btn personal-goal"
      >
        <img src={addIcon} alt="icon" />
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
                requestAssistanceCreation();
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
        <img src={addIcon} alt="icon" />
        {t("website.hero.offerHelp")}
      </button>
      <AddAssistanceModal showModal={showModal} setShowModal={setShowModal} />
      <AddGoalModal
        showModal={showGoalModal}
        setShowModal={setShowGoalModal}
        onLimitReached={showBeneficiaryLimitAlert}
      />{" "}
      <PlatformModal
        showModal={showPlatformModal}
        setShowModal={setShowPlatformModal}
      />
      <FirstGroupRequiredModal
        showModal={showFirstGroupWarning}
        onClose={closeFirstGroupWarning}
        onCreateGroup={createFirstGroup}
      />
      <ActivityLimitAlert
        showModal={beneficiaryLimitAlert.show}
        setShowModal={(show) =>
          setBeneficiaryLimitAlert((current) => ({ ...current, show }))
        }
        type={ACTIVITY_LIMIT_TYPES.BENEFICIARY}
        limit={beneficiaryLimitAlert.limit}
      />
    </section>
  );
}
