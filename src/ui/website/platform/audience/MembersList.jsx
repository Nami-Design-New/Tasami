import { useTranslation } from "react-i18next";
import useGetMembers from "../../../../hooks/my-audience/useGetMembers";
import EmptySection from "../../../EmptySection";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import AudienceCard from "./AudienceCard";

export default function MembersList() {
  const { t } = useTranslation();
  const {
    myMembers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMembers();
  const allMembers = myMembers?.pages?.flatMap((page) => page?.data) ?? [];
  return (
    <section className="followers-list">
      {!isLoading && allMembers.length === 0 && (
        <EmptySection
          height="500px"
          message={t("website.platform.audience.noCommunities")}
        />
      )}
      <InfiniteScroll
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        <div className="row mt-3">
          {allMembers.map((follower) => (
            <div className="col-12 col-md-6 p-2" key={follower.id}>
              <AudienceCard data={follower} date={true} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {/* Fetching next page indicator */}
      {(isLoading || isFetchingNextPage) && (
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-12 col-md-6 p-2" key={i}>
              <AudienceCardLoader />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
