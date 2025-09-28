import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import OfferCard from "../../ui/cards/OfferCard";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import OfferCardSkeleton from "../../ui/loading/OfferCardSkeleton";
import PersonalOffersSidebarFilter from "../../ui/website/home/PersonalOffersSidebarFilter";
import useGetPersonalOffers from "../../hooks/website/personal-assistances/useGetPersonalOffers";

export default function PersonalOffers() {
  const { t } = useTranslation();
  const {
    personalOffers,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPersonalOffers();

  const allPersonalOffers =
    personalOffers?.pages?.flatMap((page) => page?.data) ?? [];
  console.log(personalOffers);
  console.log(allPersonalOffers);

  return (
    <section className="personal-helpers page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="section-header">
              <div className="page-header">
                {
                  <Link to="/" className="back-btn">
                    <i className="fa-solid fa-angle-right"></i>
                  </Link>
                }
                <h1> عروض المساعدة </h1>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3 p-0">
            <PersonalOffersSidebarFilter />
          </div>
          <div className="col-12 col-lg-9 p-0 ">
            <div className="row">
              {" "}
              <div className="col-12 p-2">
                <div className="result-count">
                  <strong>{allPersonalOffers?.length}</strong>{" "}
                  {t("website.assistants.personalAssistant")}
                </div>
              </div>
              {!isLoading && allPersonalOffers?.length === 0 && (
                <EmptySection
                  height="300px"
                  message={t("website.offers.noPersonalOffers")}
                />
              )}
              <InfiniteScroll
                onLoadMore={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              >
                {allPersonalOffers.map((offer) => (
                  <div className="col-12 col-md-6 col-lg-4 p-2" key={offer.id}>
                    <OfferCard offer={offer} />
                  </div>
                ))}{" "}
                {(isLoading || isFetchingNextPage) && (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div className="col-12 col-md-6 col-xl-4 p-2" key={i}>
                        <OfferCardSkeleton />
                      </div>
                    ))}
                  </>
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
