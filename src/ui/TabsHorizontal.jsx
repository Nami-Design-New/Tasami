import { useEffect } from "react";
import { useSearchParams } from "react-router";

const TabsHorizontal = ({ tabs = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get("tab") || tabs[0]?.id;

  useEffect(() => {
    if (!searchParams.get("tab") && tabs.length > 0) {
      setSearchParams({ tab: tabs[0].id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabClick = (tabId) => {
    setSearchParams({ tab: tabId });
  };
  return (
    <ul className="navigation__tabs mb-3">
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={`tab ${Number(tabFromUrl) === tab.id ? "active" : ""}`}
          onClick={() => handleTabClick(tab.id)}
        >
          <h6>{tab.title}</h6>
        </li>
      ))}
    </ul>
  );
};

export default TabsHorizontal;
