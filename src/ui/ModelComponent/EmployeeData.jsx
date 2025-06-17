import FormWrapper from "../forms/FormWrapper";
import DataItem from "./common/DataItem";

const EmployeeData = () => (
  <FormWrapper title="معلومات مقدم الطلب ">
    <div className="model__employee-data">
      <div className="list">
        <DataItem label="رقم الحساب" value="U-120122-000001" />
        <DataItem label="رقم التعريف او مجموعه العمل" value="01-014-005" />
        <DataItem label="التاريخ" value="20-01-2024" />
        <DataItem label="الوقت" value="08:55 AM" />
      </div>
    </div>
  </FormWrapper>
);

export default EmployeeData;
