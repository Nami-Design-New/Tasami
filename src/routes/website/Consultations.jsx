import { useTranslation } from "react-i18next";
import ConsultationCard from "../../ui/cards/ConsultationCard";
import CustomButton from "../../ui/CustomButton";
import AddConsultationModal from "../../ui/website/profile/my-communities/AddConsultationModal";
import { useState } from "react";
import useGetConsultations from "../../hooks/website/communities/useGetConsultations";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import EmptySection from "../../ui/EmptySection";

export default function Consultations() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState();
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
            <div className="consultations-header">
              <h5>الاستشارات العامة</h5>{" "}
              <CustomButton onClick={() => setShowModal(true)}>
                {t("community.addConsultation")}
              </CustomButton>
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
