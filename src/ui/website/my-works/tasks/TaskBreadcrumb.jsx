import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const TaskBreadcrumb = ({ taskDetails, tasksPath }) => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const allTasksPath = tasksPath || `/my-works/${taskDetails?.work_id}/tasks`;

  return (
    <section className="breadcrumb-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: allTasksPath }}>
          {taskDetails?.code}
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: allTasksPath }}>
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
