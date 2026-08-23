import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../ui/CustomButton";
import MeetingCard from "../../ui/website/communities/meetings/MeetingCard";
import AddMeetingModal from "../../ui/website/communities/meetings/AddMeetingModal";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import useGetMeetings from "../../hooks/website/communities/mettings/useGetMeetings";
import { useSearchParams } from "react-router";
import EncounterDetailsModal from "../../ui/website/communities/meetings/EncounterDetailsModal";

export default function Meetings({ isMyCommuntiy = true }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMeetingId = searchParams.get("meeting_id");
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetMeetings();

  const allMeetings = data?.pages?.flatMap((page) => page?.data) ?? [];

  const handleDetailsVisibilityChange = (show) => {
    if (!show) {
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("meeting_id");
        return nextParams;
      });
    }
  };

  return (
    <section className="meeting-section">
      <div className="row">
        {isMyCommuntiy && (
          <div className="col-12 p-2">
            <div className="d-flex align-items-center justify-content-end">
              <CustomButton onClick={() => setShowModal(true)}>
                {t("community.addMeeting")}
              </CustomButton>
            </div>
          </div>
        )}
      </div>
      <div className="mettings-list">
        <div className="row">
          {!isLoading && allMeetings.length === 0 && (
            <EmptySection height="500px" message={t("community.noMeetings")} />
          )}
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {allMeetings.map((item) => (
              <div className="col-12 p-2" key={item.id}>
                <MeetingCard item={item} isMyCommuntiy={isMyCommuntiy} />
              </div>
            ))}
          </InfiniteScroll>{" "}
          {(isLoading || isFetchingNextPage) && (
            <>
              {[1, 2, 3].map((i) => (
                <div className="col-12  p-2" key={i}>
                  <AudienceCardLoader />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {isMyCommuntiy && (
        <AddMeetingModal showModal={showModal} setShowModal={setShowModal} />
      )}
      {selectedMeetingId && (
        <EncounterDetailsModal
          show={true}
          setShow={handleDetailsVisibilityChange}
          meetingId={selectedMeetingId}
          isMyCommuntiy={isMyCommuntiy}
        />
      )}
    </section>
  );
}
