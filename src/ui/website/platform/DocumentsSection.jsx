import { useTranslation } from "react-i18next";
import useGetCV from "../../../hooks/cv/useGetCV";
import CustomButton from "../../CustomButton";
import ExpDocItemLoader from "../../loading/ExpDocItemLoader";
import DocumentModal from "./DocumentModal";
import { useState } from "react";

export default function DocumentsSection() {
  const { t } = useTranslation();
  const { cv, isLoading } = useGetCV();
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

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
      {isLoading && <ExpDocItemLoader />}

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
            <li
              key={item.id}
              className="cv__list-item"
              onClick={() => {
                setShowDocumentModal(true);
                setSelectedDoc(item);
              }}
            >
              <p className="cv__item-text">{item?.category_title}</p>
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

      <DocumentModal
        showDocumentModal={showDocumentModal}
        setShowDocumentModal={setShowDocumentModal}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
      />
    </section>
  );
}
