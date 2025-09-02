import { NavLink } from "react-router";

export default function ProtectedNavLink({
  to,
  disabled = false,
  children,
  ...rest
}) {
  return (
    <NavLink
      to={disabled ? "#" : to}
      className={({ isActive }) =>
        `nav_link ${disabled ? "disabled" : ""} ${
          isActive && !disabled ? "active" : ""
        }`
      }
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
      {...rest}
    >
      {children}
    </NavLink>
  );
}
