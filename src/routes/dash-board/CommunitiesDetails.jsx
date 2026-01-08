import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import CommunityBio from "../../ui/dash-board/communities-details/CommunityBio";
import CommunityStats from "../../ui/dash-board/communities-details/CommunityStats";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { Outlet, useParams } from "react-router";
import CommunityTabs from "../../ui/dash-board/communities-details/CommunityTabs";
import { useTranslation } from "react-i18next";
import useGetUserCommunities from "../../hooks/dashboard/subscription/useGetUserCommunities";
import { PAGE_SIZE } from "../../utils/constants";
import SubscriptionLog from "./SubscriptionLog";
import TablePagination from "../../ui/table/TablePagentaion";
import Loading from "../../ui/loading/Loading";
import StatisticsCardSkeleton from "../../ui/loading/StatisticsCardSkeleton";
import { Placeholder } from "react-bootstrap";

const columnHelper = createColumnHelper();

export default function CommunitiesDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  const { userCommunities, currentPage, lastPage, isLoading } =
    useGetUserCommunities(searchQuery, page, pageSize, id);

  const editColumns = useMemo(
    () => [
      columnHelper.accessor("created_at", {
        header: t("dashboard.community.historyDate"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("is_active", {
        header: t("dashboard.community.status"),
        cell: (info) =>
          info.getValue()
            ? t("dashboard.community.active")
            : t("dashboard.community.inactive"),
      }),
    ],
    [t]
  );

  return (
    <>

      <section className="communities-details">
        <div className="container mt-3">
          <div className="row">
            {isLoading ? (
              <div className="col-12 p-2">
                {" "}
                <div className="communities-image-wrapper">
                  <Placeholder
                    animation="glow"
                    xs={6}
                    className="icon"
                    style={{ height: "100%", borderRadius: "10px" }}
                  >
                    {" "}
                    <Placeholder
                      xs={12}
                      style={{ height: "100%", borderRadius: "10px" }}
                    />
                  </Placeholder>{" "}
                </div>
              </div>
            ) : (
              <div className="col-12 p-2">
                <div className="communities-image-wrapper">
                  <img
                    className="communities-image"
                    src={
                      userCommunities?.Communitiy?.image
                        ? userCommunities?.Communitiy?.image
                        : "/images/dashboard/communities-image.png"
                    }
                    alt="communities-details"
                  />
                </div>
              </div>
            )}
            <div className="col-12 p-2">
              {isLoading ? (
                <Placeholder
                  animation="glow"
                  xs={6}
                  className="icon"
                  style={{ height: "20px", borderRadius: "10px" }}
                >
                  {" "}
                  <Placeholder
                    xs={3}
                    style={{ height: "20px", borderRadius: "10px" }}
                  />
                </Placeholder>
              ) : (
                <CommunityBio userData={userCommunities?.Communitiy?.user} />
              )}
            </div>
            {isLoading ? (
              <>
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="col-3 p-2" key={index}>
                    <StatisticsCardSkeleton />
                  </div>
                ))}
              </>
            ) : (
              <div className="col-12 p-2">
                <CommunityStats community={userCommunities?.Communitiy} />
              </div>
            )}
            <div className="col-12 p-2">
              <ReusableDataTable
                filter={false}
                title={t("dashboard.community.editHistory")}
                searchPlaceholder={t("dashboard.community.search")}
                data={userCommunities?.data}
                columns={editColumns}
                currentPage={currentPage}
                lastPage={lastPage}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                lang="ar"
                isLoading={isLoading}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchDebounceMs={700}
                search={true}
              >
                <TablePagination
                  currentPage={page}
                  lastPage={lastPage}
                  onPageChange={setPage}
                  isLoading={isLoading}
                />
              </ReusableDataTable>
            </div>
            <div className="col-12 p-2">
              <SubscriptionLog />
            </div>
          </div>
          <div className="row p-0">
            <h4 className="chanels">{t("dashboard.community.channels")}</h4>
            <div className="col-12 col-md-4 p-2">
              <CommunityTabs />
            </div>
            <div className="col-12 col-md-8 p-0">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
}
