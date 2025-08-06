import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import CustomButton from "../../../ui/CustomButton";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import ContentModal from "../../../ui/dash-board/websiteManagment/ContentModal";

const columnHelper = createColumnHelper();

export default function FaqManagment() {
  const [showModal, setShowModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();

  const [isEdit, setIsEdit] = useState(false);

  const data = useMemo(
    () => [
      {
        id: "1",
        questions: "ما هي منصة تسامي؟",
        answer:
          "تسامي هي منصة إلكترونية تهدف إلى تقديم خدمات رقمية متنوعة لتسهيل العمليات الإدارية والتواصل بين المستخدمين.",
      },
      {
        id: "2",
        questions: "كيف يمكنني إنشاء حساب جديد؟",
        answer:
          "يمكنك إنشاء حساب جديد عن طريق الضغط على زر 'تسجيل' في الصفحة الرئيسية وملء النموذج بالمعلومات المطلوبة.",
      },
      {
        id: "3",
        questions: "هل معلوماتي الشخصية آمنة؟",
        answer:
          "نعم، نحن نلتزم بسياسات صارمة لحماية بياناتك ونستخدم تقنيات تشفير متقدمة لضمان الأمان.",
      },
      {
        id: "4",
        questions: "كيف أتواصل مع فريق الدعم؟",
        answer:
          "يمكنك التواصل معنا عبر صفحة 'اتصل بنا' أو من خلال البريد الإلكتروني المخصص للدعم الفني.",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("questions", {
        header: " السؤال ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("answer", {
        header: " الاجابة ",
        cell: (info) => <p className="faq-answer">{info.getValue()}</p>,
      }),
      columnHelper.display({
        id: "actions",
        header: " الاجراءات",

        cell: () => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true), setShowModal(true);
              }}
            ></i>
            <i
              className="fa-solid fa-trash  table__actions--delete"
              onClick={() => setShowDeleteModal(true)}
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
          اضف سؤال
        </CustomButton>
      </div>
      <ReusableDataTable
        title="الاسئلة الشائعة"
        data={data}
        columns={columns}
        filter={false}
        searchPlaceholder="البحث في الأسئلة..."
        rowDnD={true}
      />
      <ContentModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </section>
  );
}
