import { useTranslation } from "react-i18next";
import useGetFollowers from "../../../../hooks/my-audience/useGetFollowers";
import EmptySection from "../../../EmptySection";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import AudienceCard from "./AudienceCard";

export default function FollowersList() {
  const { t } = useTranslation();
  const {
    myFollowers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFollowers();
  const allFollowers = myFollowers?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <section className="followers-list">
      {!isLoading && allFollowers.length === 0 && (
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
        <div className="row mt-3">
          {allFollowers.map((follower) => (
            <div className="col-12 col-md-6 p-2" key={follower.id}>
              <AudienceCard data={follower} />
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
