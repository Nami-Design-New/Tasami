import { useTranslation } from "react-i18next";
import DataItem from "./common/DataItem";

const ModelInfo = ({ taskData }) => {
  const { t } = useTranslation();
  return (
    <div className="model__info">
      <DataItem
        label={t("dashboard.tasks.modelTask.modelInfo.systemTitle")}
        value={taskData?.task?.system_type.type}
      />
      <DataItem label={t("dashboard.tasks.modelTask.modelInfo.subject")} value={taskData?.task?.system_type.title} />
      <DataItem
        label={t("dashboard.tasks.modelTask.modelInfo.returnNumber")}
        value={taskData?.task?.reference_number}
      />
    </div>
  );
};
export default ModelInfo;
