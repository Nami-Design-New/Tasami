import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function GoalsHelpSection() {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  return (
    <section className={`goals-help-section ${lang === "en" && "en"}  `}>
      <Link to="/new-goal" className="goal-btn personal-goal">
        <img src="/icons/add.svg" alt="icon" />
        {t("website.hero.personalGoal")}
      </Link>

      <Link to="/new-help" className="goal-btn offer-help">
        <img src="/icons/add.svg" alt="icon" />
        {t("website.hero.offerHelp")}
      </Link>
    </section>
  );
}
