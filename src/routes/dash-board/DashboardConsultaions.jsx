import { useRef } from "react";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import ConsultationCard from "../../ui/website/communities/consultations/ConsultationCard";
import useGetCommunityConsultations from "./../../hooks/dashboard/subscription/useGetCommunityConsultations";

export default function DashboardConsultaions() {
  const bottomRef = useRef(null);

  const {
    communityConsultations,
    consultationsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCommunityConsultations();

  const allCommunityConsultations =
    communityConsultations?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <div className="consultations-section">
      <div className="row">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!consultationsLoading && allCommunityConsultations.length === 0 && (
            <EmptySection  message={"not exist"} />
          )}
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {allCommunityConsultations?.map((item, idx) => (
              <div className="col-12 p-2" key={idx}>
                <ConsultationCard item={item} />
              </div>
            ))}
            {/* <div ref={bottomRef} /> */}
          </InfiniteScroll>
          {(consultationsLoading || isFetchingNextPage) && (
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
  );
}
