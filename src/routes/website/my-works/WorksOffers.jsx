import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import useWorkWithoutAssistant from "../../../hooks/website/MyWorks/assistants/useWorkWithoutAssistant";
import useGetWorkOffers from "../../../hooks/website/MyWorks/offers/useGetWorkOffers";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import CustomButton from "../../../ui/CustomButton";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import NoOffers from "../../../ui/website/my-works/NoOffers";
import WorkOffersCard from "../../../ui/website/my-works/work-offers/WorkOffersCard";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

export default function WorksOffers() {
  const { id } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { workDetails, isLoading: workDetailsLoading } = useGetWorkDetails();
  const { removeAssistant, isPending: isRemovingHelperPending } =
    useWorkWithoutAssistant();

  const {
    workOffers,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetWorkOffers(id);

  const allWorkOffers = workOffers?.pages?.flatMap((page) => page?.data) ?? [];

  const handleRemoveAssistants = (id) => {
    removeAssistant(id, {
      onSuccess: (res) => {
        setShowAlertModal(false);
        queryClient.invalidateQueries({ queryKey: ["work-offers"] });
        queryClient.refetchQueries({ queryKey: ["assistants"] });
        queryClient.refetchQueries({ queryKey: ["work-details"] });
        queryClient.refetchQueries({ queryKey: ["homeData"] });
        queryClient.refetchQueries({ queryKey: ["work-group"] });
        toast.success(res?.message);
        navigate(`/my-works/${workDetails?.id}/group`);
      },
      onError: (err) => {
        console.error(err);
        toast.error(t("works.myOffers.error"));
      },
    });
  };

  return (
    <section className="work-offers-section">
      <div className="row">
        {!isLoading && allWorkOffers.length === 0 && (
          <div className="d-flex flex-column align-items-center gap-3">
            <NoOffers />
            <div className="button-wrapper">
              <CustomButton
                size="large"
                style={{ backgroundColor: "#ff7a59" }}
                onClick={() => setShowAlertModal(true)}
              >
                {t("works.myOffers.doWithoutAssistant")}
              </CustomButton>
            </div>
          </div>
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allWorkOffers.map((offer) => (
            <div className="col-12 col-md-6 col-lg-4 p-2" key={offer.id}>
              <WorkOffersCard
                helper={offer.helper}
                price={offer.price}
                offerId={offer?.id}
              />
            </div>
          ))}

          {!isLoading && allWorkOffers.length > 0 && (
            <div className="d-flex align-items-center justify-content-end">
              <CustomButton
                size="large"
                style={{ backgroundColor: "#ff7a59" }}
                onClick={() => setShowAlertModal(true)}
              >
                {t("works.myOffers.doWithoutAssistant")}
              </CustomButton>
            </div>
          )}

          {(isLoading || isFetchingNextPage) && (
            <>
              {[1, 2, 3].map((i) => (
                <div className="col-12 col-md-6 col-xl-4 p-2" key={i}>
                  <AudienceCardLoader />
                </div>
              ))}
            </>
          )}
        </InfiniteScroll>
      </div>

      <AlertModal
        confirmButtonText={t("works.myOffers.confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={() => handleRemoveAssistants(workDetails?.id)}
        loading={isRemovingHelperPending}
      >
        {t("works.myOffers.alertText")}
      </AlertModal>
    </section>
  );
}
