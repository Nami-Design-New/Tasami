import { useTranslation } from "react-i18next";
import useGetSharedGroups from "../../../hooks/dashboard/workingGroups/SharedGroups/useGetSharedGroups";
import TeamCard from "../cards/TeamCard";
import EmptySection from "../../EmptySection";
import TeamCardSkeleton from "../../loading/TeamCardSkeleton";

export default function SharedGroupsComponent() {
  const { t } = useTranslation();

  // -----------------------
  // Fetch groups data hooks
  // -----------------------
  const {
    sharedGroups,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSharedGroups();

  const allSharedGroups =
    sharedGroups?.pages?.flatMap((page) => page?.data) ?? [];

  console.log(allSharedGroups);

  const showNoData = !isLoading && !isError && allSharedGroups.length === 0;

  return (
    <>
      <div className="teams__header">
        <h3 className="teams__title">{t("dashboard.sharedGroups.title")}</h3>
        <input
          type="text"
          placeholder={t("dashboard.sharedGroups.searchPlaceholder")}
        />
      </div>

      {/* INITIAL LOADING */}
      {isLoading && (
        <div className="row">
          <div className="col-12 col-md-4 p-2">
            <TeamCardSkeleton />
          </div>
        </div>
      )}

      {/* No Data */}
      {showNoData && (
        <EmptySection
          height="500px"
          message={t("dashboard.sharedGroups.noData", "No data available")}
        />
      )}

      <div className="row">
        {allSharedGroups?.map((team, index) => (
          <div className="col-12 col-md-4 p-2" key={index}>
            <TeamCard team={team} />
          </div>
        ))}
      </div>
      {hasNextPage && (
        <div className="teams__load-more">
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage
              ? t("dashboard.sharedGroups.loading", "Loading...")
              : t("dashboard.sharedGroups.loadMore", "Load More")}
          </button>
        </div>
      )}
    </>
  );
}
