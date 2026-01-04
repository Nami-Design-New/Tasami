import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import CustomButton from "../../../ui/CustomButton";
import SocialLinksModal from "../../../ui/dash-board/websiteManagment/SocialLinksModal";
import { useQueryClient } from "@tanstack/react-query";
import useGetSocialLinks from "../../../hooks/dashboard/websiteManagment/socialLinksManage/useGetSocialLinks";
import TablePagination from "../../../ui/table/TablePagentaion";
import useDeleteSocialLink from "../../../hooks/dashboard/websiteManagment/socialLinksManage/useDeleteSocialLink";
import { PAGE_SIZE } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();

export default function SocialLinksManage() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  // fetch data
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { socialLinks, currentPage, lastPage, isLoading } = useGetSocialLinks(
    searchQuery,
    page,
    pageSize
  );

  // delete row
  const [deletionTarget, setDeletionTarget] = useState(null);
  const [updateTarget, setUpdateTarget] = useState(null);
  const { deleteSocialLink, isDeletingSocialLink } = useDeleteSocialLink();

  const handleDeleteSocialLink = (id) => {
    deleteSocialLink(id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setDeletionTarget(null);
        queryClient.invalidateQueries({
          queryKey: ["social-links-data"],
        });
      },
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("link", {
        header: t("dashboard.socialLinks.link"),
        cell: (info) => (
          <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("logo", {
        header: t("dashboard.socialLinks.logo"),
        cell: (info) => (
          <img
            style={{ width: "2rem", height: "2rem" }}
            src={info.getValue()}
          />
        ),
      }),

      columnHelper.accessor("id", {
        id: "id",
        header: t("dashboard.socialLinks.actions"),

        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true),
                  setShowModal(true),
                  setUpdateTarget(info?.row.original.id);
              }}
            ></i>
            <i
              className="fa-solid fa-trash  table__actions--delete"
              onClick={() => {
                setShowDeleteModal(true);
                setDeletionTarget(info?.row.original.id);
              }}
            ></i>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );

  return (
    <section>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader />
        <CustomButton
          icon={<i className="fa-solid fa-plus"></i>}
          color="secondary"
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
          }}
        >
          {t("dashboard.socialLinks.add")}
        </CustomButton>
      </div>
      <ReusableDataTable
        title={t("dashboard.socialLinks.title")}
        data={socialLinks || []}
        columns={columns}
        filter={false}
        searchPlaceholder={t("dashboard.socialLinks.search")}
        initialPageSize={10}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
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
      <SocialLinksModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        updateTarget={updateTarget}
        socialLinks={socialLinks}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        loading={isDeletingSocialLink}
        onConfirm={() => handleDeleteSocialLink(deletionTarget)}
      />
    </section>
  );
}
