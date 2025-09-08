import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function GoalsHelpSection({ goals }) {
  const { t } = useTranslation();
  return (
    <section className="goals-help-section ">
      <Link to="/new-goal" className="goal-btn personal-goal">
        <img src="/icons/add.svg" alt="icon" />
        {t("website.hero.personalGoals")}
      </Link>

      <Link to="/new-help" className="goal-btn offer-help">
        <img src="/icons/add.svg" alt="icon" />
        {t("website.hero.offerHelp")}
      </Link>
    </section>
  );
}
