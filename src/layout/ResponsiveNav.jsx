import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

function ResponsiveNav() {
  const { t } = useTranslation();

  return (
    <div className="small_menu">
      <NavLink to="/" className="menu_item">
        <img src="/icons/home.svg" alt="fav" />
        <span>الانطلاق</span>
      </NavLink>

      <NavLink aria-label="My Works" to="/my-works" className="menu_item">
        <img src="/icons/works.svg" alt="fav" />

        <span>أعمالي </span>
      </NavLink>

      <NavLink to="/my-profile" className="menu_item">
        <img src="/icons/account.svg" alt="fav" />

        <span>حسابي </span>
      </NavLink>
    </div>
  );
}

export default ResponsiveNav;
