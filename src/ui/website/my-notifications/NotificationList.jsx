import { useTranslation } from "react-i18next";
import useDeleteAllNotifications from "../../../hooks/website/notification/useDeleteAllNotifications";
import CustomButton from "../../CustomButton";
import NotificationCard from "./NotificationCard";
import { useQueryClient } from "@tanstack/react-query";

export default function NotificationList({ items }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { deleteAllNotifications, isPending } = useDeleteAllNotifications();
  const handleDeleteAllNotifications = () => {
    deleteAllNotifications({
      onSuccess: () => {
        queryClient({
          queryKey: ["notifications"],
        });
      },
    });
  };
  return (
    <div className="notifications-list">
      <div className="d-flex align-items-center justify-content-between">
        <h2>{t("notification.latest")}</h2>
        <CustomButton
          color="fire"
          onClick={handleDeleteAllNotifications}
          loading={isPending}
        >
          {" "}
          {t("deleteAll")}{" "}
        </CustomButton>
      </div>
      {items.map((item) => (
        <NotificationCard item={item} key={item.id} />
      ))}
    </div>
  );
}
