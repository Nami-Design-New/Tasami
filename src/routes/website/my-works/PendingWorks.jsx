import React from "react";
import useGetMyWorks from "../../../hooks/website/MyWorks/useGetMyWorks";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import WorkCard from "../../../ui/cards/WorkCrad";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import EmptySection from "../../../ui/EmptySection";
import { useTranslation } from "react-i18next";

export default function PendingWorks() {
  const { t } = useTranslation();
  const {
    myWorks,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyWorks();
  const allMyWorks = myWorks?.pages?.flatMap((page) => page?.data) ?? [];
  console.log(allMyWorks);

  return (
    <section className="pending-works-sectoin">
      <div className="row">
        {" "}
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
          {allMyWorks.map((work) => (
            <div className="col-12 md-col-2 p-2" key={work.id}>
              <WorkCard work={work} />
            </div>
          ))}
          {!isLoading && allMyWorks.length === 0 && (
            <EmptySection
              height="300px"
              message={t("website.assistants.noPersonalAssistants")}
            />
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
}
