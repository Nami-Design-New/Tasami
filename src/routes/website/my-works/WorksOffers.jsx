import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import useGetWorkOffers from "../../../hooks/website/MyWorks/offers/useGetWorkOffers";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import EmptySection from "../../../ui/EmptySection";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import WorkOffersCard from "../../../ui/website/my-works/work-offers/WorkOffersCard";
import CustomButton from "../../../ui/CustomButton";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import useWorkWithoutAssistant from "../../../hooks/website/MyWorks/assistants/useWorkWithoutAssistant";

export default function WorksOffers() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [showAlertModal, setShowAlertModal] = useState();
  const { workDetails, isLoading: workDetailsLoading } = useGetWorkDetails();
  const { removeAssistant, isPending: isRemovingHelperPending } =
    useWorkWithoutAssistant();
  const [showModal, setShowModal] = useState();
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
      onSuccess: (res) => {},
    });
  };
  return (
    <section className="work-offers-section ">
      <div className="row">
        {!isLoading && allWorkOffers.length === 0 && (
          <EmptySection height="200px" message={t("community.noOffers")} />
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allWorkOffers.map((offer) => (
            <div className="col-12 col-md-6  col-lg-4 p-2" key={offer.id}>
              <WorkOffersCard
                helper={offer.helper}
                price={offer.price}
                offerId={offer?.id}
              />
            </div>
          ))}
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
        <div className="d-flex align-items-center justify-content-end">
          <CustomButton
            size="large"
            style={{ backgroundColor: "#ff7a59" }}
            onClick={() => setShowAlertModal(true)}
          >
            تنفيذ الهدف بدون مساعدة{" "}
          </CustomButton>
        </div>
      </div>{" "}
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={() => handleRemoveAssistants(workDetails?.id)}
        loading={isRemovingHelperPending}
      >
        سيتم استبعاد جميع العروض وإلغاء تعيين المساعدة لهذا الهدف!
      </AlertModal>
    </section>
  );
}
