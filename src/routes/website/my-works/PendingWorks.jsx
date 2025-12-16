import { useTranslation } from "react-i18next";
import useGetMyWorks from "../../../hooks/website/MyWorks/useGetMyWorks";
import WorkCard from "../../../ui/cards/WorkCrad";
import EmptySection from "../../../ui/EmptySection";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import WorkCardLoader from "../../../ui/loading/WorkCardLoader";

export default function PendingWorks() {
  const { t } = useTranslation();
  const { myWorks, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyWorks("waiting");
  const allMyWorks = myWorks?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <section className="pending-works-section">
      <div className="row">
        {" "}
        {(isLoading || isFetchingNextPage) && (
          <div className="row">
            {[1, 2, 3].map((i) => (
              <div className="col-12 col-md-6  p-2" key={i}>
                <WorkCardLoader />
              </div>
            ))}
          </div>
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allMyWorks.map((work) => (
            <div className="col-12 col-md-6  p-2" key={work.id}>
              <WorkCard work={work} />
            </div>
          ))}
          {!isLoading && allMyWorks.length === 0 && (
            <EmptySection height="300px" message={t("works.noWorksPending")} />
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
}
