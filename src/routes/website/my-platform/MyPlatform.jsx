import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router";
import Loading from "../../../ui/loading/Loading";
import UserCard from "../../../ui/website/profile/UserCard";
import ProtectedNavLink from "./ProtectedNavLink";
import AssistantStat from "../../../ui/website/platform/AssistantStat";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import useGetCountersNotify from "../../../hooks/website/useGetCountersNotify";

export default function MyPlatform() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authRole);
  const { counterNotify } = useGetCountersNotify();

  if (!user) {
    return <Loading />;
  }

  return (
    <section className="profile_section page ">
      <div className="container-lg p-0 position-relative">
        <div className="row">
          <div className="col-12 p-2 mb-4">
            <div className="platform-header">
              <RoundedBackButton
                onClick={() => navigate("/")}
              ></RoundedBackButton>
              <h2 className="platform-header__title">
                {t("website.platform.platform")}
              </h2>
            </div>
            <div className="platform-hint">
              <i className="fa-regular fa-circle-info"></i>
              <p>{t("website.platform.hint")}</p>
            </div>
            {user.about === "" && (
              <div className="platform-hint">
                <i className="fa-regular fa-lightbulb-exclamation  fs-5 text-fire"></i>
                <p className="text-fire">
                  {t("website.platform.alertMessage")}
                </p>
              </div>
            )}

            <AssistantStat />
          </div>
          <div className="col-lg-3 col-md-3 col-12 p-2">
            <div className="profile_sidebar">
              <UserCard user={user} />
              <div className="nav_links">
                <NavLink to="" end className="nav_link">
                  <img src="icons/subscripe-managment.svg" />
                  {t("website.platform.menu.subscriptions")}
                </NavLink>

                <NavLink to="my-cv" className="nav_link">
                  <img src="icons/cv-icon.svg" />
                  {t("website.platform.menu.cv")}
                </NavLink>

                <ProtectedNavLink to="my-assistances" disabled={!user.about}>
                  <img src="icons/my-assistance.svg" alt="" />
                  {t("website.platform.menu.myAssistant")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-opportunities" disabled={!user.about}>
                  <img src="icons/my-opportunities.svg" alt="" />
                  {t("website.platform.menu.myOpportunities")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-audience" disabled={!user.about}>
                  <img src="icons/fans.svg" alt="" />
                  {t("website.platform.menu.myAudience")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-clients" disabled={!user.about}>
                  <img src="icons/my-clients.svg" alt="" />
                  {t("website.platform.menu.myClients")}
                </ProtectedNavLink>

                <ProtectedNavLink to="/my-contracts" disabled={!user.about}>
                  <img src="icons/my-contracts.svg" alt="" />
                  {t("website.platform.menu.myContracts")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-groups" disabled={!user.about}>
                  <img src="icons/my-groups.svg" alt="" />
                  {t("website.platform.menu.myGroups")}
                  {counterNotify?.total_groups_count > 0 && (
                    <span className="notification_span">
                      {counterNotify?.total_groups_count}
                    </span>
                  )}{" "}
                </ProtectedNavLink>

                <ProtectedNavLink to="/my-community" disabled={!user.about}>
                  <img src="icons/communities-second.svg" alt="" />
                  {t("website.platform.menu.myCommunity")}
                  {counterNotify?.community_unread_chats > 0 && (
                    <span className="notification_span">
                      {counterNotify?.community_unread_chats}
                    </span>
                  )}
                </ProtectedNavLink>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-9 col-12 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
