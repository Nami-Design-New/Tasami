import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import useGetRates from "../../hooks/website/personal-assistances/useGetRates";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import StarRate from "../../ui/ModelComponent/common/StarRate";
import RateCard from "../../ui/website/offers/RateCard";
import SectionHeader from "../../ui/website/SectionHeader";

export default function PersonalOffersRates() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { rates, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetRates(id);

  const allRates = rates?.pages?.flatMap((page) => page?.data) ?? [];
  console.log(allRates);

  return (
    <section className="personal-assistant-rates page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionHeader title={t("showRates")} />
          </div>
          <div className="col-12">
            <div className="avg-rates">
              <span className="avg-value">4.4</span>{" "}
              <StarRate rating={4.4} isRating={false} /> <span>(453)</span>
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
          {(isLoading || isFetchingNextPage) && (
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
