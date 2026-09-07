import { useTranslation } from "react-i18next";
import CustomButton from "../../../CustomButton";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import ConsultationCard from "./ConsultationCard";

export default function PublicConsultations({
  consultations = [],
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  blurredItemIds = [],
}) {
  const { t } = useTranslation();

  if (!isLoading && consultations.length === 0) return null;

  return (
    <div className="row">
      <div className="col-12 p-2">
        <div className="consultations-header d-block">
          <h5>{t("community.publicConsultations")}</h5>
        </div>
      </div>

      {consultations.map((item) => (
        <div
          className={`col-12 p-2 ${
            blurredItemIds.includes(item.id)
              ? "community-preview-item--blurred"
              : ""
          }`}
          key={item.id}
        >
          <ConsultationCard item={item} />
        </div>
      ))}

      {isLoading && (
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-12  p-2" key={i}>
              <AudienceCardLoader />
            </div>
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="col-12 text-center mb-2">
          <CustomButton
            variant="outlined"
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? t("loading") : t("loadMore")}
          </CustomButton>
        </div>
      )}
    </div>
  );
}
