import { useState } from "react";

export default function HelperTabsSection({ tabs = [] }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const currentTab = tabs.find((tab) => tab.id === activeTabId);

  if (!currentTab) return null;

  return (
    <>
      <div className="info-tabs ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTabId === tab.id ? "active" : ""}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="info-grid mt-3">
        {currentTab.data.map((item, index) => (
          <div className="info-box" key={index}>
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}
