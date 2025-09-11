import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Loading from "../../ui/loading/Loading";
import UserCard from "../../ui/website/profile/UserCard";
import CustomButton from "../../ui/CustomButton";
import AlertModal from "../../ui/website/platform/my-community/AlertModal";
import { useState } from "react";
import useDeleteAccount from "../../hooks/website/profile/useDeleteAccount";
import { clearAuth } from "../../redux/slices/authRole";
import { removeToken } from "../../utils/token";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authRole);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { deleteAccount, isDeletingAccount } = useDeleteAccount();
  const handleDeleteAccount = () => {
    deleteAccount(user.id, {
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
      onError: (err) => {
        console.log(err);
        toast.error(err.message);
      },
    });
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <section className="profile_section ">
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

                <NavLink to="community" className="nav_link">
                  <i className="fa-regular fa-users"></i>
                  {t("profile.community")}
                </NavLink>

                <NavLink to="followers" className="nav_link">
                  <i className="fa-regular fa-heart"></i>
                  {t("profile.followers")}
                </NavLink>

                <CustomButton
                  size="large"
                  color="fire"
                  onClick={() => setShowAlertModal(true)}
                >
                  {t("profile.deleteAccount")}
                </CustomButton>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 col-12 p-2">
            <Outlet />
          </div>
        </div>
      </div>
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={handleDeleteAccount}
        loading={isDeletingAccount}
      >
        {t("profile.deleteAlertMessage")}
      </AlertModal>
    </section>
  );
}
