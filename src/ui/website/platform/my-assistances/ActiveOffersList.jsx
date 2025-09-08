import { useTranslation } from "react-i18next";
import useGetMyAssistances from "../../../../hooks/my-assistances/useGetMyAssistances";
import OfferCard from "../../../cards/OfferCard";
import EmptySection from "../../../EmptySection";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import OfferCardSkeleton from "../../../loading/OfferCardSkeleton";

export default function ActiveOffersList() {
  const { t } = useTranslation();
  const {
    myAssistances,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyAssistances();
  const activeAssistances =
    myAssistances?.pages?.flatMap((page) => page?.data) ?? [];
  return (
    <section className="active-assistances-list">
      {" "}
      {/* Fetching next page indicator */}
      {(isLoading || isFetchingNextPage) && (
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-12 col-md-6 col-lg-4  p-2" key={i}>
              <OfferCardSkeleton />
            </div>
          ))}
        </div>
      )}
      <InfiniteScroll
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        <div className="row mt-3">
          {activeAssistances.map((assistance) => (
            <div className="col-12 col-md-6 col-lg-4  p-2" key={assistance.id}>
              <OfferCard offer={assistance} />
            </div>
          ))}
        </div>
      </InfiniteScroll>{" "}
      {!isLoading && activeAssistances.length === 0 && (
        <EmptySection
          height="500px"
          message={t("website.platform.myAssistance.noActiveAssiatances")}
        />
      )}
    </section>
  );
}
