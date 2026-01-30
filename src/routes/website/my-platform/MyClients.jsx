import { useTranslation } from "react-i18next";
import useGetClients from "../../../hooks/website/my-clients/useGetClients";
import EmptySection from "../../../ui/EmptySection";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import ClientsCard from "../../../ui/website/platform/clients/ClientsCard";

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
  const totalRate = myClients?.pages?.[0]?.data?.total_rate;
  const totalCount = myClients?.pages?.[0]?.data?.count_of_clients;

  return (
    <section className="followers-list ">
      {(totalCount !== "0" || totalRate !== "0.00") && (
        <div className="goal-info">
          <div className="info-grid">
            <div className="info-box flex-grow-1">
              <h4 className="label">
                {t("website.offerDetails.beneficiaries")}
              </h4>
              <p className="value">{totalCount}</p>
            </div>

            <div className="info-box flex-grow-1">
              <h4 className="label">{t("website.offerDetails.totalRate")}</h4>
              <p className="value">{totalRate}</p>
            </div>
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
