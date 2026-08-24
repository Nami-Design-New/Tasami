import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { getCommunityCount } from "../../utils/communityCounts";
import CommunityCountBadge from "./CommunityCountBadge";

export default function CommunityTabs({
  isMyCommunity = true,
  communityId,
  community,
}) {
  const { t } = useTranslation();

  const basePath = isMyCommunity
    ? "/my-community"
    : `/community/${communityId}`;
  const consultationsCount = getCommunityCount(
    community?.unseen_consultations_count,
  );
  const meetingsCount = getCommunityCount(community?.unseen_meetings_count);
  const postsCount = getCommunityCount(community?.unseen_posts_count);

  return (
    <div className="community-tabs">
      <div className="tabs d-flex gap-3">
        <NavLink to={`${basePath}/consultations`}>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              <span className="community-counter-label">
                <span>{t("community.consultant")}</span>
                <CommunityCountBadge
                  count={isActive ? 0 : consultationsCount}
                />
              </span>
            </span>
          )}
        </NavLink>

        <NavLink to={`${basePath}/meetings`}>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              <span className="community-counter-label">
                <span>{t("community.meetings")}</span>
                <CommunityCountBadge count={isActive ? 0 : meetingsCount} />
              </span>
            </span>
          )}
        </NavLink>

        <NavLink to={`${basePath}/posts`}>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              <span className="community-counter-label">
                <span>{t("community.posts")}</span>
                <CommunityCountBadge count={isActive ? 0 : postsCount} />
              </span>
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
}
