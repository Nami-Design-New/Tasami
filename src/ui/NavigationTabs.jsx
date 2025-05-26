import { NavLink } from "react-router";

const NavigationTabs = ({ tabs }) => {
  return (
    <div className="navigation__tabs">
      {tabs.map((tab, index) => {
        return (
          <NavLink to={tab.to} key={index} className="tab">
            <h6>{tab.label}</h6>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavigationTabs;
