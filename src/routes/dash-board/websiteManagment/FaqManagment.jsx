import { useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import useDeleteFaq from "../../../hooks/dashboard/website-managment/faq/useDeleteFaq";
import useGetFaqs from "../../../hooks/dashboard/website-managment/faq/useGetFaqs";
import useUpdateFaqQorder from "../../../hooks/dashboard/website-managment/faq/useUpdateFaqQorder";
import CustomButton from "../../../ui/CustomButton";
import ContentModal from "../../../ui/dash-board/websiteManagment/ContentModal";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import TablePagination from "../../../ui/table/TablePagentaion";
import { PAGE_SIZE } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();

export default function FaqManagment() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState();
  const [faqData, setFaqData] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  // -----------------------------
  // Pagination state
  // -----------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const { faqs, isLoading, currentPage, lastPage } = useGetFaqs(
    searchQuery,
    page,
    pageSize
  );

  const { reorderFaq, isPending: isReordering } = useUpdateFaqQorder();

  const { deleteFaq, isPending: isDeleting } = useDeleteFaq();

  const onRowsReordered = (newOrder) => {
    const payload = newOrder.map((item) => item.id);

    reorderFaq(
      { positions: payload },
      {
        onSuccess: (res) => {
          toast.success(res.message || "تم حفظ الترتيب الجديد");
          queryClient.invalidateQueries({ queryKey: ["dh-faqs"] });
        },
        onError: (error) => {
          toast.error(error.message || "حدث خطأ أثناء حفظ الترتيب");
        },
      }
    );
  };

  const handleDeleteFaq = () => {
    deleteFaq(faqData.id, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["dh-faqs"] });
        setShowDeleteModal(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const data = useMemo(
    () =>
      faqs?.map((faq) => {
        return {
          id: faq.id,
          questions: faq.title,
          answer: faq.desc,
          questions_en: faq.title_en,
          questions_ar: faq.title_ar,
          answer_ar: faq.desc_ar,
          answer_en: faq.desc_en,
          actions: "",
        };
      }),
    [faqs]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("questions", {
        header: t("dashboard.faqs.questions"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("answer", {
        header: t("dashboard.faqs.answer"),
        cell: (info) => <p className="faq-answer">{info.getValue()}</p>,
      }),
      columnHelper.display({
        id: "actions",
        header: t("dashboard.faqs.actions"),
        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit table__actions--edit"
              onClick={() => {
                setIsEdit(true);
                setShowModal(true);
                setFaqData(info.row.original);
              }}
            ></i>
            <i
              className="fa-solid fa-trash table__actions--delete"
              onClick={() => {
                setShowDeleteModal(true);
                setFaqData(info.row.original);
              }}
            ></i>
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
        <PageHeader />
        <CustomButton
          icon={<i className="fa-solid fa-plus"></i>}
          color="secondary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          {t("dashboard.faqs.addQuestion")}
        </CustomButton>
      </div>
      <ReusableDataTable
        title={t("dashboard.faqs.faqTitle")}
        data={data}
        columns={columns}
        filter={false}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        searchPlaceholder={t("dashboard.faqs.searchPlaceholder")}
        rowDnD={true}
        isLoading={isLoading}
        onRowsReordered={onRowsReordered}
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
      {showModal && (
        <ContentModal
          showModal={showModal}
          setShowModal={setShowModal}
          isEdit={isEdit}
          faqData={faqData}
          setIsEdit={setIsEdit}
          setFaqData={setFaqData}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          onConfirm={handleDeleteFaq}
          loading={isDeleting}
        />
      )}
    </section>
  );
}
