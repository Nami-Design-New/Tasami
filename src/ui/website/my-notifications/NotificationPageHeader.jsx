import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import useMakeAllRead from "../../../hooks/website/notification/useMakeAllRead";
import CustomButton from "../../CustomButton";
import RoundedBackButton from "../../website-auth/shared/RoundedBackButton";
import { useQueryClient } from "@tanstack/react-query";

export default function NotificationPageHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { markAllAsRead, isPending } = useMakeAllRead();
  const handleMarkAllAsRead = () => {
    markAllAsRead(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        });
      },
    });
  };
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="platform-header m-0">
        <RoundedBackButton onClick={() => navigate("/")}>
          <i className="fa-solid fa-angle-right"></i>
        </RoundedBackButton>
        <h2 className="platform-header__title">{t("notification.title")}</h2>
      </div>
      <CustomButton
        style={{
          borderRadius: "100px",
          backgroundColor: "#0248960A",
          color: "#0D0D0D",
        }}
        className="ripple-animation"
        onClick={handleMarkAllAsRead}
        disabled={isPending}
      >
        {t("notification.mark_all_read")}
      </CustomButton>
    </div>
  );
}
