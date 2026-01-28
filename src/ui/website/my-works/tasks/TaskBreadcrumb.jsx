import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TaskBreadcrumb = ({ taskDetails }) => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);

  return (
    <section className="breadcrumb-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Breadcrumb>
        <Breadcrumb.Item href={`/my-works/${taskDetails.work_id}/tasks`}>
          {taskDetails?.work_id}
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`/my-works/${taskDetails.work_id}/tasks`}>
          {t("works.myTasks.allTasks")}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {t("works.myTasks.taskDetails")}
        </Breadcrumb.Item>
      </Breadcrumb>
    </section>
  );
};

export default TaskBreadcrumb;
