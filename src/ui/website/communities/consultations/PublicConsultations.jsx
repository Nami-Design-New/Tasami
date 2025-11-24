import { useTranslation } from "react-i18next";
import useGetPublicConsultations from "../../../../hooks/website/communities/useGetPublicConsultaion";
import CustomButton from "../../../CustomButton";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import ConsultationCard from "./ConsultationCard";
import EmptySection from "../../../EmptySection";

export default function PublicConsultations() {
  const { t } = useTranslation();

  const {
    publicConsultaions,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPublicConsultations();

  const allPublicConsultaions =
    publicConsultaions?.pages?.flatMap((page) => page?.data) ?? [];

  if (!isLoading && allPublicConsultaions.length === 0) {
    return null;
  }

  if (!isLoading && allPublicConsultaions.length === 0) {
    return (
      <EmptySection height="500px" message={t("community.noConsultaion")} />
    );
  }

  return (
    <div className="row">
      <div className="col-12 p-2">
        <div className="consultations-header d-block">
          <h5>{t("community.publicConsultations")}</h5>
        </div>
      </div>

      {allPublicConsultaions.map((item, idx) => (
        <div className="col-12  p-2" key={idx}>
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
