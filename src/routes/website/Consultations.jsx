import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router";
import useGetConsultations from "../../hooks/website/communities/useGetConsultations";
import EmptySection from "../../ui/EmptySection";
import ConsultationsToolbar from "../../ui/website/communities/consultations/ConsultationsToolbar";
import PrivateConsultations from "../../ui/website/communities/consultations/PrivateConsultations";
import PublicConsultations from "../../ui/website/communities/consultations/PublicConsultations";

export default function Consultations() {
  const { t } = useTranslation();
  const { communityDetails } = useOutletContext();
  const currentUserId = useSelector((state) => state.authRole.user?.id);
  const isSubscribed = Boolean(communityDetails?.is_subscribed);
  const privateQuery = useGetConsultations(currentUserId, {
    enabled: isSubscribed,
  });
  const publicQuery = useGetConsultations();

  const privateConsultations =
    privateQuery.consultaions?.pages?.flatMap((page) => page?.data) ?? [];
  const publicConsultations =
    publicQuery.consultaions?.pages?.flatMap((page) => page?.data) ?? [];
  const isLoading = privateQuery.isLoading || publicQuery.isLoading;
  const hasNoConsultations =
    privateConsultations.length === 0 && publicConsultations.length === 0;
  const privateFirstPage = privateQuery.consultaions?.pages?.[0];
  const publicFirstPage = publicQuery.consultaions?.pages?.[0];
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
        communityId={communityDetails?.id}
        privateCount={privateCount}
        publicCount={publicCount}
        showRequestButton={isSubscribed}
      />
      {!isLoading && hasNoConsultations && (
        <EmptySection height="450px" message={t("community.noConsultaion")} />
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
