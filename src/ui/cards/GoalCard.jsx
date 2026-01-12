import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import useToggleSavedGoals from "../../hooks/website/goals/useToggleSavedGoals";
import { useSelector } from "react-redux";
import title from "../../assets/icons/title.svg";
import offerIcon from "../../assets/icons/offers-icon.svg";
import PlatformModal from "../website/platform/PlatformModal";

const GoalCard = ({ goal }) => {
  const { user } = useSelector((state) => state.authRole);
  const navigate = useNavigate();
  const [showAssistantModal, setShowAssistantModal] = useState(false);

  const { t } = useTranslation();
  const { toggleSaveGoal, isPending } = useToggleSavedGoals();
  const [isActive, setIsActive] = useState(goal?.is_saved || false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    if (
      user?.country === null &&
      user?.city === null &&
      user?.nationality === null
    ) {
      navigate("/customize-services");
      return;
    } else if (user.about === "") {
      setShowAssistantModal(true);
      return;
    }

    const prevState = isActive;
    setIsActive(!prevState);

    toggleSaveGoal(goal.id, {
      onError: (err) => {
        setIsActive(prevState);
        toast.error(err.message);
      },
    });
  };

  return (
    <>
      <Link
        to={`/goal/${goal.id}`}
        className="goal-card d-flex flex-column gap-2"
      >
        <div className="d-flex align-items-center gap-2 px-2">
          <div className="image-wrapper">
            <img src={goal.user.image} alt={goal.name} className="avatar" />
            {goal.status && <span className="status-dot"></span>}
          </div>
          <div className="d-flex gap-2 flex-grow-1">
            <div className="info">
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="m-0">{goal.user.name}</h2>{" "}
                <button
                  type="button"
                  className="btn btn-link like-button p-0"
                  disabled={isPending}
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
              </div>
              <p>{goal.title}</p>
            </div>
          </div>
        </div>
        <div className="meta text-decoration-none text-dark ">
          <span>
            <img src={title} alt="type" /> {goal.category_title}
          </span>
          <span>
            <img src={offerIcon} alt="offers" /> {goal.goal.offers_count}{" "}
            {t("website.offerDetails.submittedOffer")}
          </span>
        </div>
      </Link>
      {showAssistantModal && (
        <PlatformModal
          showModal={showAssistantModal}
          setShowModal={setShowAssistantModal}
        />
      )}
    </>
  );
};

export default GoalCard;
