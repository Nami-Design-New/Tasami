import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../../ui/forms/InputField";
import NotificationPageHeader from "../../ui/website/my-notifications/NotificationPageHeader";
import PlanDurationSelector from "../../ui/website/platform/PlanDurationSelector";
import NotificationList from "../../ui/website/my-notifications/NotificationList";
import useGetNotifications from "../../hooks/notification/useGetNotifications";
import { useSearchParams } from "react-router";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import EmptySection from "../../ui/EmptySection";

export default function MyNotifications() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState("notifications");
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );

  const { t } = useTranslation();

  // Debounce input before updating search params
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (inputValue.trim()) {
          params.set("search", inputValue.trim());
        } else {
          params.delete("search");
        }
        return params;
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchParams]);

  const searchWord = searchParams.get("search") || "";

  const {
    notifications,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetNotifications({ searchWord });

  const allNotifications =
    notifications?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <div className="notifications-page mt-30">
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

        {/* Search */}
        <div className="form_ui my-2">
          <InputField
            placeholder={t("notification.search")}
            icon="/icons/search.svg"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>

        {/* Notifications */}
        {selectedTab === "notifications" && (
          <>
            {error && (
              <p className="text-danger">{t("notification.fetch_error")}</p>
            )}

            {!isLoading && allNotifications.length === 0 && (
              <EmptySection height="500px" message={t("notification.empty")} />
            )}

            <InfiniteScroll
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            >
              <NotificationList items={allNotifications} />
            </InfiniteScroll>

            {(isLoading || isFetchingNextPage) && (
              <div className="row">
                {[1, 2, 3].map((i) => (
                  <div className="col-12 p-2" key={i}>
                    <AudienceCardLoader />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
