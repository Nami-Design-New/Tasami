import NotificationTable from "../../ui/dash-board/notifications/NotificationTable";
import PageHeader from "../../ui/PageHeader";

const Notifications = () => {
  return (
    <section>
      <PageHeader name="التنبيهات" />
      <div className="table--wrapper">
        <NotificationTable />
      </div>
    </section>
  );
};

export default Notifications;
