import { useTranslation } from "react-i18next";
import NotificationCard from "./NotificationCard";

export default function NotificationList({ items }) {
  const { t } = useTranslation();
  return (
    <div className="notifications-list">
      <h2>{t("notification.latest")}</h2>
      {items.map((item) => (
        <NotificationCard item={item} key={item.id} />
      ))}
    </div>
  );
}
