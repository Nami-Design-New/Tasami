import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import UserCard from "../../../ui/website/profile/UserCard";
import ProtectedNavLink from "./ProtectedNavLink";
import AssistantStat from "../../../ui/website/platform/AssistantStat";

export default function MyPlatform() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.authRole);

  const handleBack = () => {
    navigate(-1);
  };
  if (!user) {
    return <Loading />;
  }

  return (
    <section className="profile_section page ">
      <div className="container-lg p-0 position-relative">
        <div className="row">
          <div className="col-12 p-2 mb-4">
            <div className="platform-header">
              <RoundedBackButton onClick={handleBack}></RoundedBackButton>
              <h2 className="platform-header__title">
                {t("website.platform.platform")}
              </h2>
            </div>
            <div className="platform-hint">
              <i className="fa-regular fa-circle-info"></i>
              <p>{t("website.platform.hint")}</p>
            </div>

            <AssistantStat />
          </div>
          <div className="col-lg-3 col-md-3 col-12 p-2">
            <div className="profile_sidebar">
              <UserCard user={user} />
              <div className="nav_links">
                <NavLink to="" end className="nav_link">
                  <img src="./icons/subscripe-managment.svg" />
                  {t("website.platform.menu.subscriptions")}
                </NavLink>

                <NavLink to="my-cv" className="nav_link">
                  <img src="./icons/cv-icon.svg" />
                  {t("website.platform.menu.cv")}
                </NavLink>

                <ProtectedNavLink to="my-assistances" disabled={!user.about}>
                  <img src="./icons/my-assistance.svg" alt="" />
                  {t("website.platform.menu.myAssistant")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-opportunities" disabled={!user.about}>
                  <img src="./icons/my-opportunities.svg" alt="" />
                  {t("website.platform.menu.myOpportunities")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-offers" disabled={!user.about}>
                  <img src="./icons/my-contracts.svg" alt="" />
                  {t("website.platform.menu.myOffers")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-groups" disabled={!user.about}>
                  <img src="./icons/my-groups.svg" alt="" />
                  {t("website.platform.menu.myGroups")}
                </ProtectedNavLink>

                <ProtectedNavLink to="/my-community" disabled={!user.about}>
                  <img src="./icons/communities-second.svg" alt="" />
                  {t("website.platform.menu.myCommunity")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-audience" disabled={!user.about}>
                  <img src="./icons/fans.svg" alt="" />
                  {t("website.platform.menu.myAudience")}
                </ProtectedNavLink>

                <ProtectedNavLink to="my-clients" disabled={!user.about}>
                  <img src="./icons/my-clients.svg" alt="" />
                  {t("website.platform.menu.myClients")}
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
