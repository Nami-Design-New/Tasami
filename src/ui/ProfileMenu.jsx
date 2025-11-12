import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import useAdminLogout from "../hooks/auth/dashboard/profile/useAdminLogout";
import { removeToken } from "../utils/token";
import { clearAuth } from "../redux/slices/authAdmin";

export default function ProfileMenu({ profileDropDown, setProfileDropDown }) {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { adminLogout } = useAdminLogout();

  const variants = {
    open: { opacity: 1, height: "max-content" },
    closed: { opacity: 0, height: 0 },
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdownButton = event.target.closest(".dropdownButton");
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !isDropdownButton
      ) {
        setProfileDropDown(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [setProfileDropDown]);

  const handleAdminLogout = (e) => {
    e.preventDefault();
    adminLogout(null, {
      onSuccess: (res) => {
        dispatch(clearAuth());
        removeToken("admin_token");
        queryClient.clear();
        queryClient.invalidateQueries();
        queryClient.removeQueries();
        navigate("/dashboard/login");
        toast.success(res.message || t("dashboard.profile.logoutSuccess"));
      },
      onError: (error) => {
        toast.error(error.message || t("dashboard.profile.logoutError"));
      },
    });
  };

  return (
    <motion.div
      variants={variants}
      initial="closed"
      animate={profileDropDown ? "open" : "closed"}
      className="profile_dropdown"
      ref={dropdownRef}
    >
      {/* User info */}
      <div className="account_owner">
        <div className="avatar--wrapper">
          <div className="avatar">
            <img
              src="/images/my-fav.svg"
              alt={t("dashboard.profile.avatarAlt")}
            />
            <Link
              className="edit"
              to="profile"
              title={t("dashboard.profile.editProfile")}
            >
              <img
                src="/sys-icons/editIcon.svg"
                alt={t("dashboard.profile.edit")}
              />
            </Link>
          </div>
        </div>
        <div className="account_welcoming">
          <h6>
            {t("dashboard.profile.hello")}, {user?.first_name}
          </h6>
          <Link to={"profile"} className="link-styles">
            {user?.code}
          </Link>
          <p>{user?.role?.title}</p>
          {user?.group && (
            <p>
              {t("dashboard.profile.groupNumber")}:{" "}
              <Link
                to={`working-group/${user?.group?.code || "AG-000002"}`}
                className="link-styles"
              >
                {user?.group?.name}
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="select_frame">
        <div className="manage_invite">
          <div className="link ps-2">
            <i className="fa-regular fa-arrow-right-from-bracket"></i>
            <Link onClick={handleAdminLogout}>
              {t("dashboard.profile.logout")}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
