const TabsHorizontal = ({ tabs = [], activeTab, onTabChange }) => {
  return (
    <ul className="navigation__tabs mb-3">
      {tabs.map((tab, index) => {
        return (
          <li
            key={index}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            <h6>{tab.title}</h6>
          </li>
        );
      })}
    </ul>
  );
};

export default TabsHorizontal;
