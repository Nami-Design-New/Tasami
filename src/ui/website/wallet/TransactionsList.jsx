import { useTranslation } from "react-i18next";
import useGetTransactions from "../../../hooks/website/wallet/useGetTransactions";
import Currency from "../../Currency";
import EmptySection from "../../EmptySection";
import InfiniteScroll from "../../loading/InfiniteScroll";
import WalletLoading from "../../loading/WalletLoading";

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
              <span className="type">{item.desc}</span>
              <span className="amount">
                {item.price}
                <Currency
                  style={{
                    filter:
                      "invert(67%) sepia(53%) saturate(651%) hue-rotate(161deg) brightness(98%) contrast(95%)",
                  }}
                />
              </span>
            </div>
            <div className="bottom-row">
              <span className="contract-id">
                {t("profile.operationNo")} {item.operation_id}
              </span>
              <span className="date">{item.created_at}</span>
            </div>
            {index !== allTransctions.length - 1 && <hr />}
          </div>
        ))}
      </InfiniteScroll>
      {/* Fetching next page indicator */}
      {(isLoading || isFetchingNextPage) && (
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="p-2" key={i}>
              <WalletLoading />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
