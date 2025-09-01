import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";

export default function ExperienceSection({ setShowExperienceModal }) {
  const { t } = useTranslation();

  return (
    <section className="cv__section" aria-labelledby="experience-title">
      <header className="cv__section-header">
        <h2 id="experience-title" className="cv__section-title">
          {t("website.platform.cv.experience")}
          <span className="cv__section-note">
            ({t("website.platform.cv.optional")})
          </span>
        </h2>
        <CustomButton
          size="large"
          color="secondary-website"
          aria-label={t("website.platform.cv.addExperience")}
          type="button"
          onClick={() => setShowExperienceModal(true)}
        >
          <i className="fa-solid fa-plus" aria-hidden="true"></i>
        </CustomButton>
      </header>

      <ul className="cv__list">
        {[1, 2, 3].map((item) => (
          <li key={item} className="cv__list-item">
            <p className="cv__item-text">{t("sampleExperience")}</p>
            <button
              type="button"
              className="cv__item-action"
              aria-label={t("website.platform.cv.viewExperience")}
            >
              <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
