import { useTranslation } from "react-i18next";
import NotificationTable from "../../ui/dash-board/notifications/NotificationTable";
import PageHeader from "../../ui/PageHeader";

const Notifications = () => {
  const { t } = useTranslation();
  return (
    <section className="notifications">
      <PageHeader name={t("dashboard.notifications.title")} />
      <div className="table--wrapper">
        <NotificationTable />
      </div>
    </section>
  );
};

export default Notifications;
