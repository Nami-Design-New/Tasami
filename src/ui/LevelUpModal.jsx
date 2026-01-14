import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dismissLevelUp } from "../redux/slices/authRole";
import celebrationAnimation from "../assets/lotties/celebrate.json";
import Lottie from "react-lottie";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";
import celebrationImage from "../assets/icons/toasts/celebration.svg";

const LevelUpModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showLevelUpModal, levelUpData, previousLevel } = useSelector(
    (state) => state.authRole
  );
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: celebrationAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (!showLevelUpModal) return;

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      dispatch(dismissLevelUp());
    }, 5000);

    return () => clearTimeout(timer);
  }, [showLevelUpModal, dispatch]);

  const handleClose = () => {
    dispatch(dismissLevelUp());
  };

  return (
    <Modal
      show={showLevelUpModal}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={true}
      className="level-up-modal"
    >
      <Modal.Body>
        {/* Emoji */}
        <div className="celebration">
          <Lottie options={defaultOptions} />
          <img src={celebrationImage} />
        </div>

        {/* Title */}
        <div className="d-flex align-items-center justify-content-between flex-column gap-2">
          <h2 className="text-green ">تهانينا!</h2>
          {/* Subtitle */}
          <p>لقد اكتسبت نقطة خبرة اضافية!</p>
          <p>تقدمك المستمر يعكس تميزك ويقوي ملفك الشخصي</p>
          {/* Close Button */}
          <CustomButton
            color="success"
            onClick={handleClose}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {t("ok")}
          </CustomButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LevelUpModal;
