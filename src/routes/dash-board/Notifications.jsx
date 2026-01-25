import { useTranslation } from "react-i18next";
import PageHeader from "../../ui/PageHeader";
import NotificationsTable from "../../ui/dash-board/notifications/NotificationTable";

const Notifications = () => {
  const { t } = useTranslation();
  return (
    <section className="notifications">
      <PageHeader name={t("dashboard.notifications.title")} />
      <div className="table-wrapper">
        <NotificationsTable />
      </div>
    </section>
  );
};

export default Notifications;
