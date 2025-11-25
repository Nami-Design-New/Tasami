import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router";

export default function CommunityTabs() {
  const { t } = useTranslation();
  const { id } = useParams();
  const basePath = `/dashboard/communities-details/${id}`;

  return (
    <div className="community-tabs" style={{ top: "16px" }}>
      <div className="tabs d-flex gap-3">
        {/* CONSULTATIONS */}
        <NavLink to={`${basePath}`} end>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              <span> {t("community.consultant")}</span>
            </span>
          )}
        </NavLink>

        {/* MEETINGS */}
        <NavLink to={`${basePath}/meetings`}>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              {t("community.meetings")}
            </span>
          )}
        </NavLink>

        {/* POSTS */}
        <NavLink to={`${basePath}/posts`}>
          {({ isActive }) => (
            <span className={`tab-item ${isActive ? "active" : ""}`}>
              {t("community.posts")}
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
}
