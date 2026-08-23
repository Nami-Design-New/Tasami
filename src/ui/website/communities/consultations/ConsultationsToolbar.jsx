import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import searchIcon from "../../../../assets/icons/search.svg";
import CustomButton from "../../../CustomButton";
import InputField from "../../../forms/InputField";
import AddConsultationModal from "./AddConsultationModal";

export default function ConsultationsToolbar({
  communityId,
  privateCount,
  publicCount,
  showRequestButton = true,
}) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((currentParams) => {
        const params = new URLSearchParams(currentParams);
        const searchTerm = searchValue.trim();

        if (searchTerm) {
          params.set("search", searchTerm);
        } else {
          params.delete("search");
        }

        return params;
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, setSearchParams]);

  return (
    <>
      <div className="row">
        <div className="col-12 p-2">
          <div className="consultations-toolbar form_ui">
            <div className="consultations-toolbar__counts">
              <p className="consultations-toolbar__count">
                <strong>{privateCount}</strong>{" "}
                {t("community.privateConsultationsCount")}
              </p>
              <span aria-hidden="true">|</span>
              <p className="consultations-toolbar__count">
                <strong>{publicCount}</strong>{" "}
                {t("community.publicConsultationsCount")}
              </p>
            </div>
            <InputField
              className="consultations-toolbar__search"
              type="search"
              placeholder={t("community.searchConsultations")}
              aria-label={t("community.searchConsultations")}
              icon={searchIcon}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            {showRequestButton && (
              <CustomButton onClick={() => setShowModal(true)}>
                {t("community.addConsultation")}
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      {showRequestButton && (
        <AddConsultationModal
          communityId={communityId}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
