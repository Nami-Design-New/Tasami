import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export default function CommunityTabs({
  isMyCommunity = true,
  communityId,
  community,
}) {
  const { t } = useTranslation();

  const basePath = isMyCommunity
    ? "/my-community"
    : `/community/${communityId}`;

  // console.log(community);

  return (
    <div className="community-tabs">
      <div className="tabs d-flex gap-3">
        {/* CONSULTATIONS */}
        <NavLink to={`${basePath}`} end>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              <span> {t("community.consultant")}</span>
              {!isMyCommunity && isActive && (
                <Badge bg="primary" className="conts mx-2">
                  {community?.consultations_count}
                </Badge>
              )}
              {isMyCommunity && community?.unanswered_consultations > 0 && (
                <span className="notification_span">
                  {community?.unanswered_consultations}
                </span>
              )}
            </span>
          )}
        </NavLink>

        {/* MEETINGS */}
        <NavLink to={`${basePath}/meetings`}>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              {t("community.meetings")}
              {!isMyCommunity && isActive && (
                <Badge bg="primary" className="conts mx-2">
                  {community?.meetings_count}
                </Badge>
              )}
            </span>
          )}
        </NavLink>

        {/* POSTS */}
        <NavLink to={`${basePath}/posts`}>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              {t("community.posts")}
              {!isMyCommunity && isActive && (
                <Badge bg="primary" className="conts mx-2">
                  {community?.posts_count}
                </Badge>
              )}
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
}
