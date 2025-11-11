import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const NavigationTabs = ({ tabs }) => {
  const { t } = useTranslation();

  return (
    <div className="navigation__tabs">
      {tabs.map((tab, index) => (
        <NavLink to={tab.to} key={index} className="tab">
          <h6>{t(tab.label)}</h6>
        </NavLink>
      ))}
    </div>
  );
};

export default NavigationTabs;
