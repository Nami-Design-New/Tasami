import { useTranslation } from "react-i18next";
import useGetPrivateConsultaions from "../../../hooks/website/communities/useGetPrivateConsultaions";
import useGetPublicConsultations from "../../../hooks/website/communities/useGetPublicConsultaion";
import EmptySection from "../../../ui/EmptySection";
import PrivateConsultations from "../../../ui/website/communities/consultations/PrivateConsultations";
import PublicConsultations from "../../../ui/website/communities/consultations/PublicConsultations";

export default function MyCommunityConsultations() {
  const { t } = useTranslation();
  const privateQuery = useGetPrivateConsultaions();
  const publicQuery = useGetPublicConsultations();

  const privateConsultations =
    privateQuery.privateConsultaions?.pages?.flatMap((page) => page?.data) ??
    [];
  const publicConsultations =
    publicQuery.publicConsultaions?.pages?.flatMap((page) => page?.data) ?? [];
  const isLoading = privateQuery.isLoading || publicQuery.isLoading;
  const hasNoConsultations =
    privateConsultations.length === 0 && publicConsultations.length === 0;

  if (!isLoading && hasNoConsultations) {
    return (
      <EmptySection height="500px" message={t("community.noConsultaion")} />
    );
  }

  return (
    <div className="consultations-section">
      <PrivateConsultations
        consultations={privateConsultations}
        isLoading={privateQuery.isLoading}
        hasNextPage={privateQuery.hasNextPage}
        fetchNextPage={privateQuery.fetchNextPage}
        isFetchingNextPage={privateQuery.isFetchingNextPage}
      />
      <PublicConsultations
        consultations={publicConsultations}
        isLoading={publicQuery.isLoading}
        hasNextPage={publicQuery.hasNextPage}
        fetchNextPage={publicQuery.fetchNextPage}
        isFetchingNextPage={publicQuery.isFetchingNextPage}
      />
    </div>
  );
}
