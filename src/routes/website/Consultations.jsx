import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router";
import useGetConsultations from "../../hooks/website/communities/useGetConsultations";
import CustomButton from "../../ui/CustomButton";
import EmptySection from "../../ui/EmptySection";
import ConsultationsToolbar from "../../ui/website/communities/consultations/ConsultationsToolbar";
import PrivateConsultations from "../../ui/website/communities/consultations/PrivateConsultations";
import PublicConsultations from "../../ui/website/communities/consultations/PublicConsultations";

function isPrivateConsultation(consultation) {
  return (
    consultation?.is_private === true || Number(consultation?.is_private) === 1
  );
}

export default function Consultations() {
  const { t } = useTranslation();
  const { communityDetails } = useOutletContext();
  const currentUserId = useSelector((state) => state.authRole.user?.id);
  const isSubscribed = Boolean(communityDetails?.is_subscribed);
  const {
    consultaions,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetConsultations(currentUserId);

  const consultations =
    consultaions?.pages?.flatMap((page) => page?.data ?? []) ?? [];
  const privateConsultations = consultations.filter(isPrivateConsultation);
  const publicConsultations = consultations.filter(
    (consultation) => !isPrivateConsultation(consultation),
  );
  const hasNoConsultations = consultations.length === 0;

  return (
    <div className="consultations-section">
      <ConsultationsToolbar
        communityId={communityDetails?.id}
        privateCount={privateConsultations.length}
        publicCount={publicConsultations.length}
        showRequestButton={isSubscribed}
      />
      {!isLoading && hasNoConsultations && (
        <EmptySection height="450px" message={t("community.noConsultaion")} />
      )}
      <PrivateConsultations
        consultations={privateConsultations}
        isLoading={isLoading}
      />
      <PublicConsultations
        consultations={publicConsultations}
        isLoading={isLoading}
      />
      {hasNextPage && (
        <div className="row">
          <div className="col-12 text-center mb-2">
            <CustomButton
              variant="outlined"
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? t("loading") : t("loadMore")}
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
