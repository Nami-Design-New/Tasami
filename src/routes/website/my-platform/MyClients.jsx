import { useTranslation } from "react-i18next";
import useGetClients from "../../../hooks/website/my-clients/useGetClients";
import EmptySection from "../../../ui/EmptySection";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import ClientsCard from "../../../ui/website/platform/clients/ClientsCard";

const firstDefined = (...values) =>
  values.find((value) => value !== undefined && value !== null);

const formatCount = (value) => firstDefined(value, 0);

const formatRate = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) return "0";

  return numericValue.toFixed(1);
};

const hasPositiveValue = (value) => Number(value) > 0;

export default function MyClients() {
  const { t } = useTranslation();
  const {
    myClients,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetClients();

  const allClients =
    myClients?.pages?.flatMap((page) => page?.data?.clients) ?? [];
  const firstPage = myClients?.pages?.[0] ?? {};
  const clientsData = firstPage?.data ?? {};
  const totalRate = firstDefined(
    clientsData.total_rate,
    clientsData.avg_rate,
    clientsData.total_average,
  );
  const totalCount = clientsData.count_of_clients;
  const totalRatesCount = firstDefined(
    clientsData.count_of_rates,
    clientsData.rates_count,
    clientsData.rate_count,
    clientsData.ratings_count,
    clientsData.reviews_count,
    firstPage.count_of_rates,
    firstPage.rates_count,
    firstPage.total,
  );
  const experienceRate = firstDefined(
    clientsData.total_experience_and_knowledge,
    clientsData.experience_and_knowledge,
    clientsData.experience,
  );
  const commitmentRate = firstDefined(
    clientsData.total_commitment_to_time,
    clientsData.commitment_to_time,
    clientsData.commitment,
    clientsData.time,
  );
  const qualityRate = firstDefined(
    clientsData.total_quality_of_performance,
    clientsData.quality_of_performance,
    clientsData.quality,
  );
  const respectRate = firstDefined(
    clientsData.total_respect_and_treatment,
    clientsData.respect_and_treatment,
    clientsData.respect,
    clientsData.treatment,
  );
  const shouldShowStats = [
    totalCount,
    totalRate,
    totalRatesCount,
    experienceRate,
    commitmentRate,
    qualityRate,
    respectRate,
  ].some(hasPositiveValue);

  const ratingGroups = [
    [
      { label: t("rate_experience"), value: experienceRate },
      { label: t("rate_commitment"), value: commitmentRate },
    ],
    [
      { label: t("rate_quality"), value: qualityRate },
      { label: t("rate_respect"), value: respectRate },
    ],
  ];

  return (
    <section className="followers-list ">
      {shouldShowStats && (
        <div className="goal-info">
          <div className="info-grid">
            <div className="info-box flex-grow-1">
              <h4 className="label">
                {t("website.offerDetails.beneficiaries")}
              </h4>
              <p className="value">{formatCount(totalCount)}</p>
            </div>

            <div className="info-box flex-grow-1">
              <h4 className="label">
                {t("website.offerDetails.ratingsCount")}
              </h4>
              <p className="value">{formatCount(totalRatesCount)}</p>
            </div>

            <div className="info-box flex-grow-1">
              <h4 className="label">{t("website.offerDetails.totalRate")}</h4>
              <p className="value">{formatRate(totalRate)}</p>
            </div>

            {ratingGroups.map((group, index) => (
              <div className="info-box flex-grow-1" key={index}>
                {group.map((item) => (
                  <div className="flex" key={item.label}>
                    <span className="label mb-0">{item.label}</span>
                    <span className="bold">{formatRate(item.value)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && allClients.length === 0 && (
        <EmptySection
          height="500px"
          message={t("website.platform.noClients")}
        />
      )}
      <InfiniteScroll
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        <div className="row mt-3">
          {allClients.map((client) => (
            <div className="col-12 col-md-6 p-2" key={client.id}>
              <ClientsCard helper={client} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {(isLoading || isFetchingNextPage) && (
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-12 col-md-6 p-2" key={i}>
              <AudienceCardLoader />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
