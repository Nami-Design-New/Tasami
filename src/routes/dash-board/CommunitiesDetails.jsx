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

const columnHelper = createColumnHelper();

export default function CommunitiesDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { userCommunities, currentPage, lastPage, isLoading } =
    useGetUserCommunities("", page, pageSize, id);

  // console.log("userCommunities|||", userCommunities);

  const editColumns = useMemo(
    () => [
      columnHelper.accessor("created_at", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("is_active", {
        header: " الحالة ",
        cell: (info) => (info.getValue() ? "تشغيل" : "ايقاف"),
      }),
    ],
    []
  );

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="communities-details">
          <div className="container mt-3">
            <div className="row">
              <div className="col-12 p-2">
                <div className="communities-image-wrapper">
                  <img
                    className="communities-image"
                    src="/images/dashboard/communities-image.png"
                    alt="communities-details"
                  />
                </div>
              </div>
              <div className="col-12 p-2">
                <CommunityBio userData={userCommunities?.Communitiy?.user} />
              </div>
              <div className="col-12 p-2">
                <CommunityStats community={userCommunities?.Communitiy} />
              </div>
              <div className="col-12 p-2">
                <ReusableDataTable
                  filter={false}
                  title="سجل التعديلات"
                  searchPlaceholder="بحث..."
                  data={userCommunities?.data}
                  columns={editColumns}
                  currentPage={currentPage}
                  lastPage={lastPage}
                  setPage={setPage}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  lang="ar"
                  isLoading={isLoading}
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
              <h4 className="chanels">{t("community.channels")}</h4>
              <div className="col-12 col-md-4 p-2">
                <CommunityTabs />
              </div>
              <div className="col-12 col-md-8 p-0">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
