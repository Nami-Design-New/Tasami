import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export default function CommunityTabs({ isMyCommunity = true, communityId }) {
  const { t } = useTranslation();

  const basePath = isMyCommunity
    ? "/my-community"
    : `/community/${communityId}`;

  return (
    <div className="community-tabs">
      <div className="tabs">
        <NavLink to={`${basePath}`} end>
          {t("community.consultant")}
        </NavLink>

        <NavLink to={`${basePath}/meetings`}>{t("community.meetings")}</NavLink>

        <NavLink to={`${basePath}/posts`}>{t("community.posts")}</NavLink>
      </div>
    </div>
  );
}
