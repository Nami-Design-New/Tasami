import { useTranslation } from "react-i18next";
import useGetBookmarkedOffers from "../../hooks/website/personal-assistances/useGetBookmarkedOffers";
import OfferCard from "../../ui/cards/OfferCard";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";

export default function SavingsPage() {
  const { t } = useTranslation();
  const {
    bookMarkedOffers,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetBookmarkedOffers();
  const allBookMarkedOffers =
    bookMarkedOffers?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <div className="savings-page">
      <>
        {!isLoading && allBookMarkedOffers.length === 0 && (
          <EmptySection
            height="500px"
            message={t("website.profile.noBookmarkedOffers")}
          />
        )}
        <div className="row">
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {allBookMarkedOffers.map((offer) => (
              <div className="col-md-6 col-lg-4 p-2" key={offer.id}>
                <OfferCard offer={offer} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </>
    </div>
  );
}
