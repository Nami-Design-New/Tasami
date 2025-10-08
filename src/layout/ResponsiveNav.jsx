import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

function ResponsiveNav() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);

  return (
    <div className="small_menu">
      {" "}
      <NavLink to="/" className="menu_item">
        <img src="/icons/navlogo.svg" alt="fav" />
        <span>الانطلاق</span>
      </NavLink>
      {user && (
        <>
          <NavLink aria-label="My Works" to="/my-works" className="menu_item">
            <i className="fa-solid fa-file-lines"></i>
            <span>أعمالي </span>
          </NavLink>
          <NavLink to="/my-profile" className="menu_item">
            <i className="fa-regular fa-user"></i>
            <span>حسابي </span>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default ResponsiveNav;
