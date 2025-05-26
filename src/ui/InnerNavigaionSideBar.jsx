import { NavLink } from "react-router";

export default function InnerNavigaionSideBar({ tabs }) {
  return (
    <aside className="inner_navigation_side_bar">
      <ul className="navigation_menu">
        {tabs.map((item, index) => (
          <li className="nav_item" key={index} title={item.label}>
            <NavLink to={item.to}>
              <img src={item.icon} alt={item.alt} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
