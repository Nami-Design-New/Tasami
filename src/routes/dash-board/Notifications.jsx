import ChartCard from "../../ui/dash-board/cards/ChartCard";
import NotificationTable from "../../ui/dash-board/notifications/NotificationTable";
import PageHeader from "../../ui/PageHeader";

const Notifications = () => {
  return (
    <section>
      <PageHeader name="التنبيهات" />
      <div className="table--wrapper">
        <ChartCard title={"التنبيهات"}>
          <NotificationTable />
        </ChartCard>
      </div>
    </section>
  );
};

export default Notifications;
