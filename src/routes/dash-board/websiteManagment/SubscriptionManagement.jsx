import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/CustomButton";
import AddNewSubscriptoinsModal from "../../../ui/dash-board/websiteManagment/AddNewSubscriptoinsModal";
import DetailsSubscriptionsModal from "../../../ui/dash-board/websiteManagment/DetailsSubscriptionsModal";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";
import { PAGE_SIZE } from "../../../utils/constants";
import TablePagination from "../../../ui/table/TablePagentaion";

const columnHelper = createColumnHelper();

export default function SubscriptionManagement() {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddSubscriptions, setShowAddSubscriptions] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPacage, setSelectedPacage] = useState();

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const { packages, isLoading, currentPage, lastPage } = useGetPackages(
    page,
    pageSize
  );

  const data = useMemo(
    () =>
      packages?.map((p) => ({
        id: p?.id,
        image: p?.image,
        classification: p?.title,
      })),
    [packages]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("image", {
        header: t("dashboard.subscriptions.logo"),
        cell: (info) => <img width={40} height={40} src={info.getValue()} />,
      }),
      columnHelper.accessor("classification", {
        header: t("dashboard.subscriptions.package"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: t("dashboard.subscriptions.actions"),
        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit table__actions--edit"
              onClick={() => {
                setIsEdit(true);
                setShowAddSubscriptions(true);
              }}
            />
            <i
              className="fa-solid fa-trash table__actions--delete"
              onClick={() => setShowDeleteModal(true)}
            />
            <i
              className="fa-solid fa-eye table__actions--details"
              onClick={() => {
                setShowDetails(true);
                setSelectedPacage(info.row.original);
              }}
            />
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [t]
  );

  return (
    <section>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader title={t("dashboard.subscriptions.management")} />
        <CustomButton
          icon={<i className="fa-solid fa-plus"></i>}
          color="secondary"
          onClick={() => {
            setShowAddSubscriptions(true);
            setIsEdit(false);
          }}
        >
          {t("dashboard.subscriptions.add")}
        </CustomButton>
      </div>

      <ReusableDataTable
        title={t("dashboard.subscriptions.tableTitle")}
        data={data}
        columns={columns}
        filter={false}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        searchPlaceholder={t("dashboard.subscriptions.searchPlaceholder")}
        initialPageSize={10}
        isLoading={isLoading}
      >
        <TablePagination
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      </ReusableDataTable>

      <AddNewSubscriptoinsModal
        setShowModal={setShowAddSubscriptions}
        showModal={showAddSubscriptions}
        isEdit={isEdit}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      {showDetails && (
        <DetailsSubscriptionsModal
          setShowModal={setShowDetails}
          showModal={showDetails}
          selectedPack={selectedPacage?.id}
        />
      )}
    </section>
  );
}
