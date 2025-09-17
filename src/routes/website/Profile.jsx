import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import useLogout from "../../hooks/auth/useLogout";
import { clearAuth } from "../../redux/slices/authRole";
import CustomButton from "../../ui/CustomButton";
import Loading from "../../ui/loading/Loading";
import UserCard from "../../ui/website/profile/UserCard";
import { removeToken } from "../../utils/token";

export default function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authRole);

  const { logout, isPending } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    logout("", {
      onSuccess: (res) => {
        dispatch(clearAuth());
        removeToken();
        localStorage.removeItem("skipAreasOfInterest");
        queryClient.clear();
        queryClient.invalidateQueries();
        queryClient.removeQueries();
        navigate("/login");
        toast.success(res.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <section className="profile_section page ">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12 p-2">
            <div className="profile_sidebar">
              <UserCard user={user} />
              <div className="nav_links">
                <NavLink to="" end className="nav_link">
                  <i className="fa-regular fa-user"></i>
                  {t("profile.myInfo")}
                </NavLink>

                <NavLink to="my-notifications" className="nav_link">
                  <i className="fa-regular fa-bell"></i>
                  {t("profile.notificationsSys")}
                </NavLink>

                <NavLink to="my-wallet" className="nav_link">
                  <i className="fa-regular fa-wallet"></i>
                  {t("profile.wallet")}
                </NavLink>

                <NavLink to="Interests" className="nav_link">
                  <i className="fa-regular fa-clipboard-list"></i>
                  {t("profile.interests")}
                </NavLink>

                <NavLink to="savings" className="nav_link">
                  <i className="fa-regular fa-bookmark"></i>
                  {t("profile.savings")}
                </NavLink>

                <NavLink to="my-communities" className="nav_link">
                  <i className="fa-regular fa-users"></i>
                  {t("profile.community")}
                </NavLink>

                <NavLink to="followings" className="nav_link">
                  <i className="fa-regular fa-heart"></i>
                  {t("profile.followers")}
                </NavLink>

                <CustomButton
                  size="large"
                  color="fire"
                  onClick={handleLogout}
                  disabled={isPending}
                  loading={isPending}
                >
                  {t("website.header.logout")}
                </CustomButton>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 col-12 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
