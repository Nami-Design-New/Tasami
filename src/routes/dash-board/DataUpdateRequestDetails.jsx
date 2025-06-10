import FormWrapper from "../../ui/forms/FormWrapper";
import PageHeader from "../../ui/PageHeader";
import ReusableDataTable from "../../ui/ReusableDataTable";

const DataUpdateRequestDetails = () => {
  return (
    <section className="data-update-request-details">
      <PageHeader name="تفاصيل طلب تحديث البيانات" removeLast={true} />

      <FormWrapper title={"بيانات الطلب"}></FormWrapper>
      <ReusableDataTable title="تفاصيل التحديث" />
    </section>
  );
};

export default DataUpdateRequestDetails;
