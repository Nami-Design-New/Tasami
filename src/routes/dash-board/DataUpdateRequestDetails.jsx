import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import FormWrapper from "../../ui/forms/FormWrapper";
import PageHeader from "../../ui/PageHeader";
import ReusableDataTable from "../../ui/ReusableDataTable";

const columnHelper = createColumnHelper();

const DataUpdateRequestDetails = () => {
  const data = useMemo(
    () => [
      {
        field: "البريد االكتروني",
        oldData: "mahmoudabbas222gmail.com",
        newData: "mahmoud222gmail.com",
      },
      {
        field: "رقم الهاتف",
        oldData: "01012345678",
        newData: "01123456789",
      },
      {
        field: "العنوان",
        oldData: "شارع 1, مدينة 1",
        newData: "شارع 2, مدينة 2",
      },
      {
        field: "الاسم الكامل",
        oldData: "أحمد محمد",
        newData: "أحمد علي محمد",
      },
      {
        field: "تاريخ الميلاد",
        oldData: "1990-01-01",
        newData: "1990-02-02",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("field", {
        header: "الحقل",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("oldData", {
        header: "البيانات القديمة",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("newData", {
        header: "البيانات الجديدة",
        cell: (info) => <div className="new-value">{info.getValue()}</div>,
        enableSorting: false,
      }),
    ],
    []
  );
  return (
    <section className="data-update-request-details">
      <PageHeader name="تفاصيل طلب تحديث البيانات" removeLast={true} />
      <FormWrapper title={"بيانات الطلب"}>
        <div className="row">
          <div className="col-md-4">
            <div className="data-item">
              <h6>رقم الطلب :</h6>
              <p>REQ-001</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="data-item">
              <h6>حاله الطلب : </h6>
              <p className="req-status pending">قيد المراجعه</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="data-item">
              <h6> سبب الطلب : </h6>
              <p>خطاء في البريد الالكتروني</p>
            </div>
          </div>
        </div>
      </FormWrapper>
      <ReusableDataTable title="تفاصيل التحديث" data={data} columns={columns} />
    </section>
  );
};

export default DataUpdateRequestDetails;
