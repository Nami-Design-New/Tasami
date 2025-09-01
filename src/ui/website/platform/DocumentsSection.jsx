import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import useGetCV from "../../../hooks/cv/useGetCV";

export default function DocumentsSection({ setShowDocumentModal }) {
  const { t } = useTranslation();
  const { cv, isLoading } = useGetCV();

  return (
    <section className="cv__section" aria-labelledby="documents-title">
      <header className="cv__section-header">
        <h2 id="documents-title" className="cv__section-title">
          {t("website.platform.cv.documents")}
          <span className="cv__section-note">
            ({t("website.platform.cv.optional")})
          </span>
        </h2>
        <CustomButton
          size="large"
          color="secondary-website"
          aria-label={t("website.platform.cv.addDocument")}
          type="button"
          onClick={() => setShowDocumentModal(true)}
        >
          <i className="fa-solid fa-plus" aria-hidden="true"></i>
        </CustomButton>
      </header>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-data">
          <p>{t("website.platform.cv.loading")}</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && cv?.user_documents?.length === 0 && (
        <div className="empty-data">
          <p>{t("website.platform.cv.noDocuments")}</p>
        </div>
      )}

      {/* Data List */}
      {!isLoading && cv?.user_documents?.length > 0 && (
        <ul className="cv__list">
          {cv.user_documents.map((item) => (
            <li key={item.id} className="cv__list-item">
              <p className="cv__item-text">{item?.title}</p>
              <button
                type="button"
                className="cv__item-action"
                aria-label={t("website.platform.cv.viewDocument")}
              >
                <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
