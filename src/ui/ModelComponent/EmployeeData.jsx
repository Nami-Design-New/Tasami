import FormWrapper from "../forms/FormWrapper";
import DataItem from "./common/DataItem";

const EmployeeData = ({taskData}) => (
  <FormWrapper title="معلومات مقدم الطلب ">
    <div className="model__employee-data">
      <div className="list">
        <DataItem label="رقم الحساب" value={taskData?.task?.account} />
        <DataItem label="رقم التعريف او مجموعه العمل" value={taskData?.task?.id_number} />
        <DataItem label="التاريخ" value={taskData?.task?.date} />
        <DataItem label="الوقت" value={taskData?.task?.time} />
      </div>
    </div>
  </FormWrapper>
);

export default EmployeeData;
