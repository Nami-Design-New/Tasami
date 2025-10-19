import { useParams } from "react-router";
import useGetWorkOffers from "../../../hooks/website/MyWorks/offers/useGetWorkOffers";
import EmptySection from "../../../ui/EmptySection";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import WorkOffersCard from "../../../ui/website/my-works/work-offers/WorkOffersCard";
import { useTranslation } from "react-i18next";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import CustomButton from "../../../ui/CustomButton";
import { useState } from "react";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

export default function WorksOffers() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { workDetails, isLoading: workDetailsLoading } = useGetWorkDetails();
  const [showModal, setShowModal] = useState();
  const {
    workOffers,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetWorkOffers(id);
  const allWorkOffers = workOffers?.pages?.flatMap((page) => page?.data) ?? [];
  const helperIsAssigned = workDetails?.helper !== null;
  console.log(helperIsAssigned);
  return (
    <section className="work-offers-section ">
      <div className="row">
        {!isLoading && allWorkOffers.length === 0 && (
          <EmptySection height="500px" message={t("community.noComments")} />
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
        {!helperIsAssigned && (
          <div className="button-sticky">
            <CustomButton
              fullWidth
              size="large"
              style={{ backgroundColor: "#FF7A59" }}
              onClick={() => setShowModal(true)}
            >
              تنفيذ الهدف بدون مساعدة
            </CustomButton>
          </div>
        )}
      </div>
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showModal}
        setShowModal={setShowModal}
        // onConfirm={() =>
        // handleDeleteGroup(groupDetails?.id, groupDetails?.members)
        // }
        // loading={isDeleteingGroup}
      >
        سيتم استبعاد جميع العروض وإلغاء تعيين المساعدة لهذا الهدف!
      </AlertModal>
    </section>
  );
}
