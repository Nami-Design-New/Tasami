import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useGetPersonalOffers from "../../hooks/website/personal-assistances/useGetPersonalOffers";
import OfferCard from "../../ui/cards/OfferCard";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import OfferCardSkeleton from "../../ui/loading/OfferCardSkeleton";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import PersonalOffersSidebarFilter from "../../ui/website/home/PersonalOffersSidebarFilter";

export default function PersonalOffers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const {
    personalOffers,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPersonalOffers();

  const allPersonalOffers =
    personalOffers?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <section className="personal-helpers page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="section-header">
              <div className="page-header">
                <RoundedBackButton
                  onClick={() => navigate(-1)}
                ></RoundedBackButton>
                <h1> {t("personalOffers")}</h1>
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
                  {t("personalOffers")}
                </div>
              </div>
              {!isLoading && allPersonalOffers?.length === 0 && (
                <EmptySection
                  height="300px"
                  message={t("noPersonalOffers")}
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
