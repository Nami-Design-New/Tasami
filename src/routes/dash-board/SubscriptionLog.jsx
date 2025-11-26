import { useMemo, useState } from "react";
import useGetUserSubscriptionCommunities from "../../hooks/dashboard/subscription/useGetUserSubscriptionCommunities";
import { PAGE_SIZE } from "../../utils/constants";
import { Link, useParams } from "react-router";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import TablePagination from "../../ui/table/TablePagentaion";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
const SubscriptionLog = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { userSubscriptionCommunities, currentPage, lastPage, isLoading } =
    useGetUserSubscriptionCommunities("", page, pageSize, id);

  // console.log("userSubscriptionCommunities", userSubscriptionCommunities);

  const subColumns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => row.user.first_name + " " + row.user.last_name,
        {
          id: "name",
          header: "الاسم",
          cell: (info) => {
            return info.getValue();
          },
        }
      ),
      columnHelper.accessor((row) => row.user.account_code, {
        id: "accountNumber",
        header: "رقم الحساب",
        cell: (info) => (
          <Link
            className="link-styles"
            to={`/dashboard/user-details/${info.getValue()}`}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: "التاريخ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        header: "قيمة الاشتراك",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  return (
    <>
      <ReusableDataTable
        filter={false}
        title="سجل الاشتراكات"
        searchPlaceholder="بحث..."
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
