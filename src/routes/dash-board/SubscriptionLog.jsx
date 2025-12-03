import { useMemo, useState } from "react";
import useGetUserSubscriptionCommunities from "../../hooks/dashboard/subscription/useGetUserSubscriptionCommunities";
import { PAGE_SIZE } from "../../utils/constants";
import { Link, useParams } from "react-router";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import TablePagination from "../../ui/table/TablePagentaion";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();
const SubscriptionLog = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { userSubscriptionCommunities, currentPage, lastPage, isLoading } =
    useGetUserSubscriptionCommunities("", page, pageSize, id);

  // console.log("userSubscriptionCommunities", userSubscriptionCommunities);

  const subColumns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => row?.user?.first_name + " " + row?.user?.last_name,
        {
          id: "name",
          header: t("dashboard.subscription.name"),
          cell: (info) => {
            return info.getValue();
          },
        }
      ),
      columnHelper.accessor((row) => row?.user?.account_code, {
        id: "accountNumber",
        header: t("dashboard.subscription.accountNumber"),
        cell: (info) => (
          <Link
            className="link-styles"
            to={`/dashboard/user-details/${info?.row.original.user?.id}`}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.subscription.date"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        header: t("dashboard.subscription.price"),
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  return (
    <>
      <ReusableDataTable
        filter={false}
        title={t("dashboard.subscription.title")}
        searchPlaceholder={t("dashboard.subscription.search")}
        data={userSubscriptionCommunities}
        columns={subColumns}
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
    </>
  );
};

export default SubscriptionLog;
