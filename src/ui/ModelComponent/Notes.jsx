import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../table/ReusableDataTable";
import FormWrapper from "../forms/FormWrapper";
import AddActionModal from "./AddActionModal";
import TablePagination from "../table/TablePagentaion";
import { useTranslation } from "react-i18next";
const columnHelper = createColumnHelper();

const Notes = ({
  taskData,
  page,
  setPage,
  setPageSize,
  pageSize,
  currentPage,
  lastPage,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState("");
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("time", {
        header: " الوقت ",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("employee.code", {
        header: " رقم الحساب ",
        cell: (info) => <Link className="link-styles">{info.getValue()}</Link>,
        enableSorting: false,
      }),
      columnHelper.accessor("type", {
        header: "الاجراء",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "send":
              badgeColor = "#6EE7B7";
              break;
            case "return":
              badgeColor = "#FDE68A";
              break;
            case "finish":
              badgeColor = "#BFDBFE";
              break;
            default:
              badgeColor = "#E5E7EB";
              break;
          }

          return (
            <Badge
              pill
              className="custom-badge"
              style={{
                "--badge-color": badgeColor,
                "--text-color": "#000",
              }}
            >
              {info.getValue()}
            </Badge>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor("note", {
        header: " تفاصيل الافادة ",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
    ],
    []
  );

  return (
    <>
      <FormWrapper title={t("dashboard.tasks.modelTask.notes.title")}>
        <ReusableDataTable
          header={false}
          filter={false}
          data={taskData?.data || []}
          columns={columns}
          searchPlaceholder=""
          currentPage={currentPage}
          lastPage={lastPage}
          setPage={setPage}
          setPageSize={setPageSize}
          pageSize={pageSize}
        >
          <TablePagination
            currentPage={page}
            lastPage={lastPage}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </ReusableDataTable>
        <div className="add-btn-container">
          <button
            className="add-attachment-btn"
            onClick={() => setShowModal(true)}
          >
            <i className="fa-solid fa-circle-plus"></i>
            {t("dashboard.tasks.modelTask.notes.addBenefit")}
          </button>
        </div>
        <AddActionModal
          showModal={showModal}
          setShowModal={setShowModal}
          taskData={taskData}
        />
      </FormWrapper>
    </>
  );
};

export default Notes;
