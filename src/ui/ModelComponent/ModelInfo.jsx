import DataItem from "./common/DataItem";

const ModelInfo = ({ taskData }) => (
  <div className="model__info">
        <DataItem label="النظام الاداري" value="العمليات الداخليه" />
    <DataItem label="الموضوع" value="مهمه تنفيذيه" />

    {/* <DataItem label="النظام الاداري" value={taskData.task.reference_number} /> */}
    {/* <DataItem label="الموضوع" value={taskData.task.reference_number} /> */}
    <DataItem label="الرقم المرجعي" value={taskData?.task?.reference_number} />
  </div>
);

export default ModelInfo;
