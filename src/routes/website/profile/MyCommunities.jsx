import { useTranslation } from "react-i18next";
import EmptySection from "../../../ui/EmptySection";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import CommunitiesCard from "../../../ui/website/profile/my-communities/CommunitiesCard";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import useGetMyCommunities from "../../../hooks/website/communities/useGetMyCommunities";

export default function MyCommunities() {
  const { t } = useTranslation();
  const {
    myCommunities,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetMyCommunities();
  console.log(myCommunities);

  const allCommunities =
    myCommunities?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <section className="my-communities-page">
      {!isLoading && allCommunities.length === 0 && (
        <EmptySection
          height="500px"
          message={t("website.platform.audience.noFollowers")}
        />
      )}{" "}
      <InfiniteScroll
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        <div className="communities-list">
          {allCommunities?.map((community) => (
            <CommunitiesCard key={community.id} community={community} />
          ))}
        </div>
      </InfiniteScroll>{" "}
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
