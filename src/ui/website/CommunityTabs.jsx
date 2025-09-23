import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export default function CommunityTabs() {
  const { t } = useTranslation();
  return (
    <div className="community-tabs">
      <div className="tabs">
        <NavLink to="consultations">{t("community.consultant")}</NavLink>
        <NavLink to="encounters">{t("community.meetings")}</NavLink>
        <NavLink to="posts">{t("community.posts")}</NavLink>
      </div>
    </div>
  );
}
