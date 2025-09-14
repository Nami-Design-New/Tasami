import { useTranslation } from "react-i18next";
import useGetTransactions from "../../../hooks/website/wallet/useGetTransactions";
import InfiniteScroll from "../../loading/InfiniteScroll";
import EmptySection from "../../EmptySection";
import AudienceCardLoader from "../../loading/AudienceCardLoader";

export default function TransactionsList() {
  const { t } = useTranslation();
  const {
    transctions,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTransactions();
  const allTransctions =
    transctions?.pages?.flatMap((page) => page?.data) ?? [];
  console.log(transctions);

  return (
    <div className="balance-box">
      <h5 className="text">{t("profile.transactions")}</h5>
      {!isLoading && allTransctions.length === 0 && (
        <EmptySection height="300px" message={t("profile.noTransactions")} />
      )}
      <InfiniteScroll
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        {allTransctions.map((item, index) => (
          <div key={index} className="transaction-item">
            <div className="top-row">
              <span className="type">{item.type}</span>
              <span className="amount">
                {item.amount}
                <img src="/icons/ryal.svg" alt="ريال" />
              </span>
            </div>
            <div className="bottom-row">
              <span className="contract-id">
                {" "}
                {t("profile.contractNo")} {item.id}
              </span>
              <span className="date">{item.date}</span>
            </div>
            {index !== transactions.length - 1 && <hr />}
          </div>
        ))}
      </InfiniteScroll>
      {/* Fetching next page indicator */}
      {(isLoading || isFetchingNextPage) && (
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-12 col-md-6 p-2" key={i}>
              <AudienceCardLoader />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
