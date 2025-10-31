import { useTranslation } from "react-i18next";
import useGetMyContracts from "../../../../hooks/website/contracts/useGetMyContracts";
import EmptySection from "../../../../ui/EmptySection";
import InfiniteScroll from "../../../../ui/loading/InfiniteScroll";
import WorkCardLoader from "../../../../ui/loading/WorkCardLoader";
import ContractCard from "../../../../ui/website/platform/contracts/cards/ContractCard";

export default function CompletedContracts() {
  const { t } = useTranslation();
  const {
    myContracts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyContracts("completed");
  const allMyContracts =
    myContracts?.pages?.flatMap((page) => page?.data) ?? [];
  return (
    <section className="pending-works-section">
      <div className="row">
        {(isLoading || isFetchingNextPage) &&
          [1, 2, 3].map((i) => (
            <div className="col-12 col-md-6 p-2" key={i}>
              <WorkCardLoader />
            </div>
          ))}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allMyContracts?.map((contract) => {
            return (
              <div className="col-12 col-md-6  p-2" key={contract.id}>
                <ContractCard contract={contract} withoutStatus={false} />
              </div>
            );
          })}
          {!isLoading && allMyContracts?.length === 0 && (
            <EmptySection height="300px" message={t("website.noWorks")} />
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
}
