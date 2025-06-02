const Tabs = ({ tabs = [], activeTab, onTabChange }) => {

  return (
    <ul className="tab-list">
      {tabs.map((tab) => (
        <li className="tab-item" key={tab.id}>
          <button
            className={`btn__tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            {tab.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
