import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import useGetRates from "../../hooks/website/personal-assistances/useGetRates";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import StarRate from "../../ui/ModelComponent/common/StarRate";
import RateCard from "../../ui/website/offers/RateCard";
import SectionHeader from "../../ui/website/SectionHeader";
import Loading from "../../ui/loading/Loading";

export default function PersonalOffersRates() {
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    rates,
    ratesData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetRates(id);

  const allRates = rates?.pages?.flatMap((page) => page?.data?.rates) ?? [];
  const overAllRate = rates?.pages?.flatMap((page) => page?.data)[0];
  if (isLoading) return <Loading />;
  return (
    <section className="personal-assistant-rates page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionHeader title={t("showRates")} />
          </div>
          <div className="col-12">
            <div className="avg-rates">
              <span className="avg-value">{overAllRate?.rate}</span>{" "}
              <StarRate rating={overAllRate?.rate} isRating={false} />{" "}
              <span>({overAllRate?.number_of_raters})</span>
            </div>
          </div>
        </div>
        <section className="followers-list">
          {!isLoading && allRates.length === 0 && (
            <EmptySection
              height="500px"
              message={t("website.platform.audience.noFollowers")}
            />
          )}{" "}
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            <div className="row mt-3">
              {allRates.map((rate) => (
                <div className="col-12  p-2" key={rate.id}>
                  <RateCard rate={rate} />
                </div>
              ))}
            </div>
          </InfiniteScroll>{" "}
          {isFetchingNextPage && (
            <div className="row">
              {[1, 2, 3].map((i) => (
                <div className="col-12  p-2" key={i}>
                  <AudienceCardLoader />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
