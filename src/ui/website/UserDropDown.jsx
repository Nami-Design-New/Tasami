import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../../hooks/auth/useLogout";
import { clearAuth } from "../../redux/slices/authRole";
import { removeToken } from "../../utils/token";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function UserDropDown() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout, isPending } = useLogout();
  const { user } = useSelector((state) => state.authRole);
  const handleLogout = async (e) => {
    e.preventDefault();
    logout("", {
      onSuccess: (res) => {
        dispatch(clearAuth());
        removeToken();
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

  return (
    <Dropdown className="d-lg-block d-none">
      <Dropdown.Toggle className="user_dropdown">
        <span>{user?.name || "User"}</span>
        <i className="fa fa-chevron-down"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="custom-dropdown-menu text-end">
        <Dropdown.Item as={Link} to="/my-profile">
          <i className="fa-regular fa-user"></i>
          {t("website.header.myAccount")}
        </Dropdown.Item>

        <Dropdown.Item as={Link} to="/my-profile/my-notifications">
          <i className="fa-regular fa-bell"></i>
          {t("website.header.notifications")}
        </Dropdown.Item>

        <Dropdown.Item as={Link} to="/my-profile">
          <i className="fa-regular fa-user-pen"></i>
          {t("website.header.editAccount")}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={handleLogout} disabled={isPending}>
          <i className="fa-regular fa-sign-out-alt"></i>
          {t("website.header.logout")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
