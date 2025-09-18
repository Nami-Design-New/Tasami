import { useTranslation } from "react-i18next";
import useGetMyFollowings from "../../hooks/website/my-followers/useGetMyFollowings";
import HelperCard from "../../ui/cards/HelperCard";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";

export default function Followings() {
  const { t } = useTranslation();
  const {
    followings,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetMyFollowings();

  const allFollowings = followings?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <div className="follwers-page ">
      <div className="row">
        {(isLoading || isFetchingNextPage) && (
          <div className="row">
            {[1, 2, 3].map((i) => (
              <div className="col-12 col-md-6 col-xl-4 p-2" key={i}>
                <AudienceCardLoader />
              </div>
            ))}
          </div>
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allFollowings.map((helper) => (
            <div className="col-md-6 col-lg-4 p-2" key={helper.id}>
              <HelperCard helper={helper?.user} />
            </div>
          ))}
        </InfiniteScroll>{" "}
        {!isLoading && allFollowings.length === 0 && (
          <EmptySection
            height="300px"
            message={t("website.assistants.noPersonalAssistants")}
          />
        )}
      </div>
    </div>
  );
}
