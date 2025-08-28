import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import UserCard from "../profile/UserCard";

export default function MyPlatform() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);

  if (!user) {
    return <Loading />;
  }

  return (
    <section className="profile_section ">
      <div className="container-lg p-0">
        <div className="row">
          <div className="col-12 p-2 mb-4">
            <div className="platform-header">
              <RoundedBackButton>
                <i className="fa-solid fa-angle-right"></i>
              </RoundedBackButton>
              <h2 className="platform-header__title">
                {t("website.platformModal.platform")}
              </h2>
            </div>
            <div className="platform-hint">
              <i className="fa-regular fa-circle-info"></i>
              <p>{t("website.platformModal.hint")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12 p-2">
            <div className="profile_sidebar">
              <UserCard user={user} />
              <div className="nav_links">
                <NavLink to="" end className="nav_link">
                  <img src="./icons/subscripe-managment.svg" />
                  {t("website.platformModal.menu.subscriptions")}
                </NavLink>

                <NavLink to="my-cv" className="nav_link">
                  <img src="./icons/cv-icon.svg" />
                  {t("website.platformModal.menu.cv")}
                </NavLink>

                <NavLink to="my-assistant" className="nav_link">
                  <img src="./icons/my-assistance.svg" />
                  {t("website.platformModal.menu.myAssistant")}
                </NavLink>

                <NavLink to="my-opportunities" className="nav_link">
                  <img src="./icons/my-opportunities.svg" />
                  {t("website.platformModal.menu.myOpportunities")}
                </NavLink>

                <NavLink to="my-offers" className="nav_link">
                  <img src="./icons/my-contracts.svg" />
                  {t("website.platformModal.menu.myOffers")}
                </NavLink>
                <NavLink to="my-groups" className="nav_link">
                  <img src="./icons/my-groups.svg" />
                  {t("website.platformModal.menu.myGroups")}
                </NavLink>
                <NavLink to="my-community" className="nav_link">
                  <img src="./icons/communities-second.svg" />
                  {t("website.platformModal.menu.myCommunity")}
                </NavLink>
                <NavLink to="my-audience" className="nav_link">
                  <img src="./icons/fans.svg" />
                  {t("website.platformModal.menu.myAudience")}
                </NavLink>
                <NavLink to="my-clients" className="nav_link">
                  <img src="./icons/my-clients.svg" />
                  {t("website.platformModal.menu.myClients")}
                </NavLink>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-8 col-12 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
