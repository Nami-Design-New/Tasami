import { useTranslation } from "react-i18next";
import useGetMyOpportunities from "../../../hooks/website/goals/useGetMyOpportunities";
import GoalCard from "../../../ui/cards/GoalCard";
import EmptySection from "../../../ui/EmptySection";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";

export default function MyOpportunities() {
  const { t } = useTranslation();
  const { saves, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetMyOpportunities();

  const allSaves = saves?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <section className="personal-helpers ">
      <div className="row">
        {!isLoading && allSaves.length === 0 && (
          <EmptySection
            height="300px"
            message={t("website.assistants.noOpportunities")}
          />
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allSaves.map((goal) => (
            <div className="col-12 col-md-6 col-xl-4 p-2" key={goal.id}>
              <GoalCard goal={goal} />
            </div>
          ))}{" "}
          {(isLoading || isFetchingNextPage) && (
            <>
              {[1, 2, 3].map((i) => (
                <div className="col-12 col-md-6 col-xl-4 p-2" key={i}>
                  <AudienceCardLoader />
                </div>
              ))}
            </>
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
}
