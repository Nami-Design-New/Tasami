import { useTranslation } from "react-i18next";
import useGetPrivateConsultaions from "../../../../hooks/website/communities/useGetPrivateConsultaions";
import CustomButton from "../../../CustomButton";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import ConsultationCard from "./ConsultationCard";

export default function PrivateConsultations() {
  const { t } = useTranslation();

  const {
    privateConsultaions,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPrivateConsultaions();

  const allPrivateConsultations =
    privateConsultaions?.pages?.flatMap((page) => page?.data) ?? [];

  if (!isLoading && allPrivateConsultations.length === 0) {
    return <></>;
  }

  return (
    <div className="row">
      <div className="col-12 p-2">
        <div className="consultations-header d-block">
          <h5>{t("community.privateConsultations")}</h5>
          <p className="private-consultaion-hint">
            {t("community.privateHint")}
          </p>
        </div>
      </div>

      {allPrivateConsultations.map((item, idx) => (
        <div className="col-12  p-2" key={idx}>
          <ConsultationCard item={item} />
        </div>
      ))}
      {isLoading && (
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-12 p-2" key={i}>
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
