import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import AddAssistanceModal from "../offers/AddAssistanceModal";
import { useState } from "react";

export default function GoalsHelpSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.authRole);
  const [showModal, setShowModal] = useState(false);
  return (
    <section className={`goals-help-section ${lang === "en" && "en"}  `}>
      <Link to="/new-goal" className="goal-btn personal-goal">
        <img src="/icons/add.svg" alt="icon" />
        {t("website.hero.personalGoal")}
      </Link>

      <button
        onClick={() => {
          user ? setShowModal(true) : navigate("/login");
        }}
        className="goal-btn offer-help"
      >
        <img src="/icons/add.svg" alt="icon" />
        {t("website.hero.offerHelp")}
      </button>
      <AddAssistanceModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}
