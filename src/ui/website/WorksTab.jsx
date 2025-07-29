export default function WorksTab({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "pending", label: "بانتظار التنفيذ" },
    { id: "inprogress", label: "قيد التنفيذ" },
    { id: "completed", label: "مكتملة" },
  ];

  return (
    <div className="tab-nav">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`toggle-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
