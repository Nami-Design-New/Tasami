import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetCV from "../../../hooks/cv/useGetCV";
import CustomButton from "../../CustomButton";
import ExpDocItemLoader from "../../loading/ExpDocItemLoader";
import ExperienceModal from "./ExperienceModal";

export default function ExperienceSection() {
  const { t } = useTranslation();
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const { cv, isLoading } = useGetCV();

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

      {/* Loading State */}
      {isLoading && <ExpDocItemLoader />}

      {/* Empty State */}
      {!isLoading && cv?.user_experiences?.length === 0 && (
        <div className="empty-data">
          <p>{t("website.platform.cv.noExperience")}</p>
        </div>
      )}

      {/* Data List */}
      {!isLoading && cv?.user_experiences?.length > 0 && (
        <ul className="cv__list">
          {cv.user_experiences.map((item) => (
            <li
              key={item.id}
              className="cv__list-item"
              onClick={() => {
                setShowExperienceModal(true);
                setSelectedExp(item);
              }}
            >
              <p className="cv__item-text">{item?.category_title}</p>
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
      )}
      <ExperienceModal
        showExperienceModal={showExperienceModal}
        setShowExperienceModal={setShowExperienceModal}
        selectedExp={selectedExp}
        setSelectedExp={setSelectedExp}
      />
    </section>
  );
}
