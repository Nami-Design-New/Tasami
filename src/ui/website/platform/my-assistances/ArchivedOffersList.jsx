import { useTranslation } from "react-i18next";
import useGetMyAssistances from "../../../../hooks/my-assistances/useGetMyAssistances";
import EmptySection from "../../../EmptySection";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import OfferCard from "../../../cards/OfferCard";
import OfferCardSkeleton from "../../../loading/OfferCardSkeleton";

export default function ArchivedOffersList() {
  const { t } = useTranslation();
  const {
    myAssistances,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyAssistances();
  const arcivedAssistances =
    myAssistances?.pages?.flatMap((page) => page?.data) ?? [];
  return (
    <section className="active-assistances-list">
      {!isLoading && arcivedAssistances.length === 0 && (
        <EmptySection
          height="500px"
          message={t("website.platform.myAssistance.noArcivedAssiatances")}
        />
      )}
      <InfiniteScroll
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        <div className="row mt-3">
          {arcivedAssistances.map((assistance) => (
            <div className="col-12 col-md-6 col-lg-4 p-2" key={assistance.id}>
              <OfferCard offer={assistance} />
            </div>
          ))}
        </div>
      </InfiniteScroll>{" "}
      {/* Fetching next page indicator */}
      {(isLoading || isFetchingNextPage) && (
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-12 col-md-6 col-lg-4 p-2" key={i}>
              <OfferCardSkeleton />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
