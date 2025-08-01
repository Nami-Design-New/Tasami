import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";


function ResponsiveNav() {
  const { t } = useTranslation();

  return (
    <div className="small_menu">
      <NavLink to="/" className="menu_item">
        <img src="/icons/navlogo.svg" alt="fav" />
        <span>الانطلاق</span>
      </NavLink>

      <NavLink
        aria-label="My Works"
        to="/my-works"
        className="menu_item"
      >
        <i className="fa-solid fa-file-lines"></i>
        <span>أعمالي </span>
      </NavLink>
    
<NavLink to="/my-profile" className="menu_item">
  <i className="fa-regular fa-user"></i>
  <span>حسابي </span>
</NavLink>


    </div>
  );
}

export default ResponsiveNav;