import MeetingCard from "../../ui/website/communities/meetings/MeetingCard";
import { useRef } from "react";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import useGetCommunityMeetings from "./../../hooks/dashboard/subscription/useGetCommunityMeetings";

export default function DashboardMeetings() {
  const bottomRef = useRef(null);

  const {
    communityMeetings,
    meetingsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCommunityMeetings();

  const allCommunityMeetings =
    communityMeetings?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <section className="meeting-section">
      <div className="mettings-list">
        <div className="row">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {!meetingsLoading && allCommunityMeetings.length === 0 && (
              <EmptySection  message={"not exist"} />
            )}
            <InfiniteScroll
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            >
              {allCommunityMeetings?.map((item) => (
                <div className="col-12 p-2" key={item.id}>
                  <MeetingCard item={item} />
                </div>
              ))}
              {/* <div ref={bottomRef} /> */}
            </InfiniteScroll>
            {(meetingsLoading || isFetchingNextPage) && (
              <div className="">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="mt-3">
                    <AudienceCardLoader />
                  </div>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
