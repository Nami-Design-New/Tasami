import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import useChangeNotificationsSettings from "../../../hooks/website/notification/useChangeNotificationsSettings";
import useGetNotificationSetting from "../../../hooks/website/notification/useGetNotificationSetting";

export default function NotificationSetting() {
  const { t } = useTranslation();
  const { notificationSetting, isLoading } = useGetNotificationSetting();
  const { changeNotificationSettings, isPending } =
    useChangeNotificationsSettings();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState(null);

  // Sync API data into state
  useEffect(() => {
    if (notificationSetting) {
      const { id, user_id, ...rest } = notificationSetting; // remove id and user_id
      const normalized = Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [key, value ? 1 : 0])
      );
      setSettings(normalized);
    }
  }, [notificationSetting]);

  if (isLoading || !settings) return <p>Loading...</p>;

  const personalAssistantOptions = [
    {
      key: "help_same_category",
      label: t("profile.help_same_category"),
    },
    {
      key: "help_same_sub_category",
      label: t("profile.help_same_sub_category"),
    },
    {
      key: "help_same_city",
      label: t("profile.help_same_city"),
    },
  ];

  const beneficiaryOptions = [
    {
      key: "goal_same_category",
      label: t("profile.goal_same_category"),
    },
    {
      key: "goal_same_sub_category",
      label: t("profile.goal_same_sub_category"),
    },
    {
      key: "goal_same_city",
      label: t("profile.goal_same_city"),
    },
  ];

  const handleToggle = (key) => {
    const newValue = settings[key] === 1 ? 0 : 1;

    // optimistic update
    setSettings((prev) => ({
      ...prev,
      [key]: newValue,
    }));

    // send only required fields (no id, user_id)
    changeNotificationSettings(
      {
        data: {
          ...settings,
          [key]: newValue,
        },
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ["notification-setting"] });
        },
      }
    );
  };

  return (
    <section className="notification-setting">
      {/* Personal Assistant Section */}
      <div className="personal-assistant">
        <h2>{t("profile.personal_assistant_title")}</h2>
        <p>{t("profile.multi_choice_hint")}</p>
        <div className="notifiaction-setting-options">
          {personalAssistantOptions.map(({ key, label }) => (
            <div key={key} className="notification__header">
              <h3 className="notification__title">{label}</h3>
              <label className="notification__switch">
                <input
                  type="checkbox"
                  checked={!!settings[key]}
                  disabled={isPending}
                  onChange={() => handleToggle(key)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Beneficiary Section */}
      <div className="personal-assistant mt-3">
        <h2>{t("profile.beneficiary_title")}</h2>
        <p className="yellow">{t("profile.beneficiary_hint")}</p>
        <p>{t("profile.multi_choice_hint")}</p>
        <div className="notifiaction-setting-options">
          {beneficiaryOptions.map(({ key, label }) => (
            <div key={key} className="notification__header">
              <h3 className="notification__title">{label}</h3>
              <label className="notification__switch">
                <input
                  type="checkbox"
                  checked={!!settings[key]}
                  disabled={isPending}
                  onChange={() => handleToggle(key)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
