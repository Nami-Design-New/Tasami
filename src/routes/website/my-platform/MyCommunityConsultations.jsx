import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import useGetPrivateConsultaions from "../../../hooks/website/communities/useGetPrivateConsultaions";
import useGetPublicConsultations from "../../../hooks/website/communities/useGetPublicConsultaion";
import EmptySection from "../../../ui/EmptySection";
import ConsultationsToolbar from "../../../ui/website/communities/consultations/ConsultationsToolbar";
import PrivateConsultations from "../../../ui/website/communities/consultations/PrivateConsultations";
import PublicConsultations from "../../../ui/website/communities/consultations/PublicConsultations";

export default function MyCommunityConsultations() {
  const { t } = useTranslation();
  const { myCommunity } = useOutletContext();
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
  const privateFirstPage = privateQuery.privateConsultaions?.pages?.[0];
  const publicFirstPage = publicQuery.publicConsultaions?.pages?.[0];
  const privateCount =
    privateFirstPage?.total ??
    privateFirstPage?.data?.total ??
    privateConsultations.length;
  const publicCount =
    publicFirstPage?.total ??
    publicFirstPage?.data?.total ??
    publicConsultations.length;

  return (
    <div className="consultations-section">
      <ConsultationsToolbar
        communityId={myCommunity?.id}
        privateCount={privateCount}
        publicCount={publicCount}
        showRequestButton={false}
      />
      {!isLoading && hasNoConsultations && (
        <EmptySection height="500px" message={t("community.noConsultaion")} />
      )}
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
