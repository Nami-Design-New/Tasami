import { useTranslation } from "react-i18next";
import useGetMyContracts from "../../../../hooks/website/contracts/useGetMyContracts";
import WorkCardLoader from "../../../../ui/loading/WorkCardLoader";
import InfiniteScroll from "../../../../ui/loading/InfiniteScroll";
import EmptySection from "../../../../ui/EmptySection";
import ContractCard from "../../../../ui/website/platform/contracts/cards/ContractCard";

export default function InProgressContracts() {
  const { t } = useTranslation();
  const {
    myContracts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetMyContracts("progress");

  const allMyContracts =
    myContracts?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <section className="pending-works-section">
      <div className="row">
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
                  <ContractCard contract={contract} />
                </div>
              );
            })}
            {!isLoading && allMyContracts?.length === 0 && (
              <EmptySection
                height="300px"
                message={t("website.assistants.noPersonalAssistants")}
              />
            )}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}
