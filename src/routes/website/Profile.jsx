import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import Loading from "../../ui/loading/Loading";
import UserCard from "./profile/UserCard";

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);

  if (!user) {
    return <Loading />;
  }

  return (
    <section className="profile_section mt-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-12 p-2">
            <div className="profile_sidebar">
              <UserCard user={user} />
              <div className="nav_links">
                <NavLink to="" end className="nav_link">
                  <i className="fa-regular fa-user"></i>
                  {t("profile.myInfo")}
                </NavLink>

                <NavLink to="my-notifications" className="nav_link">
                  <i className="fa-regular fa-bell"></i>
                  {t("profile.notifications")}
                </NavLink>

                <NavLink to="my-wallet" className="nav_link">
                  <i className="fa-solid fa-wallet"></i>
                  {t("profile.wallet")}
                </NavLink>

                <NavLink to="Interests" className="nav_link">
                  <i className="fa-solid fa-clipboard-list"></i>
                  {t("profile.interests")}
                </NavLink>

                <NavLink to="savings" className="nav_link">
                  <i className="fa-solid fa-bookmark"></i>
                  {t("profile.savings")}
                </NavLink>

                <NavLink to="community" className="nav_link">
                  <i className="fa-solid fa-users"></i>
                  {t("profile.community")}
                </NavLink>

                <NavLink to="followers" className="nav_link">
                  <i className="fa-solid fa-heart"></i>
                  {t("profile.followers")}
                </NavLink>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-8 col-12 p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
