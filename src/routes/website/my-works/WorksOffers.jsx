import { useParams } from "react-router";
import useGetWorkOffers from "../../../hooks/website/MyWorks/offers/useGetWorkOffers";
import EmptySection from "../../../ui/EmptySection";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import WorkOffersCard from "../../../ui/website/my-works/work-offers/WorkOffersCard";

export default function WorksOffers() {
  const { id } = useParams();
  const {
    workOffers,
    isLaoding,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetWorkOffers(id);
  const allWorkOffers = workOffers?.pages?.flatMap((page) => page?.data) ?? [];
  return (
    <section className="work-offers-section">
      <div className="row">
        {!isLaoding && allWorkOffers.length === 0 && (
          <EmptySection height="500px" message={t("community.noComments")} />
        )}{" "}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {" "}
          {allWorkOffers.map((offer) => (
            <div className="col-12 col-md-6  col-lg-4 p-2" key={offer.id}>
              <WorkOffersCard helper={offer.helper} price={offer.price} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </section>
  );
}
