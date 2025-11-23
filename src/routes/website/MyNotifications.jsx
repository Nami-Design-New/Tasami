import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import NotificationList from "../../ui/website/my-notifications/NotificationList";
import NotificationPageHeader from "../../ui/website/my-notifications/NotificationPageHeader";
import PlanDurationSelector from "../../ui/website/platform/PlanDurationSelector";
import IquriesList from "../../ui/website/my-notifications/IquriesList";

export default function MyNotifications() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // get initial tab from URL or fallback to notifications
  const initialTab = searchParams.get("tab") || "notifications";
  const [selectedTab, setSelectedTab] = useState(initialTab);

  // keep URL in sync when tab changes
  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (selectedTab) {
        params.set("tab", selectedTab);
      }
      return params;
    });
  }, [selectedTab, setSearchParams]);

  return (
    <div className="notifications-page page">
      <div className="container">
        {/* Header */}
        <NotificationPageHeader />

        {/* Tabs */}
        <div className="platform-tabs">
          <PlanDurationSelector
            options={[
              {
                label: t("notification.tab_notifications"),
                value: "notifications",
              },
              { label: t("notification.tab_inquiries"), value: "inquries" },
            ]}
            value={selectedTab}
            onChange={(tab) => {
              setSelectedTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>

        {/* Notifications */}
        {selectedTab === "notifications" && <NotificationList />}
        {selectedTab === "inquries" && <IquriesList />}
      </div>
    </div>
  );
}
