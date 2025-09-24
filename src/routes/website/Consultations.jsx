import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import useGetConsultations from "../../hooks/website/communities/useGetConsultations";
import CustomButton from "../../ui/CustomButton";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AddConsultationModal from "../../ui/website/communities/consultations/AddConsultationModal";
import ConsultationCard from "../../ui/website/communities/consultations/ConsultationCard";

export default function Consultations() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState();
  const { communityDetails } = useOutletContext();
  const {
    consultaions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetConsultations();

  const allConsultaions =
    consultaions?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <>
      <div className="consultations-section">
        <div className="row">
          <div className="col-12 p-2">
            <div className="consultations-header justify-content-end">
              {communityDetails.is_subscribed && (
                <CustomButton className="" onClick={() => setShowModal(true)}>
                  {t("community.addConsultation")}
                </CustomButton>
              )}
            </div>
          </div>{" "}
          {!isLoading && allConsultaions.length === 0 && (
            <EmptySection
              height="500px"
              message={t("community.noConsultaion")}
            />
          )}{" "}
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {allConsultaions.map((item, idx) => (
              <div className="col-12 col-lg-6 p-2" key={idx}>
                <ConsultationCard item={item} />
              </div>
            ))}
          </InfiniteScroll>{" "}
          {(isLoading || isFetchingNextPage) && (
            <div className="row">
              {[1, 2, 3].map((i) => (
                <div className="col-12 col-lg-6 p-2" key={i}>
                  <AudienceCardLoader />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AddConsultationModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
