import { useTranslation } from "react-i18next";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import MeetingCard from "../../ui/website/communities/meetings/MeetingCard";
import useGetCommunityMeetings from "./../../hooks/dashboard/subscription/useGetCommunityMeetings";

export default function DashboardMeetings() {
  const { t } = useTranslation();

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
          {!meetingsLoading && allCommunityMeetings.length === 0 && (
            <EmptySection height="500px" message={t("community.noMeetings")} />
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
        </div>
      </div>
    </section>
  );
}
