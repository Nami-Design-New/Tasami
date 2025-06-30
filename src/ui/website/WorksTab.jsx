export default function WorksTab({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "pending", label: "بانتظار التنفيذ" },
    { id: "inprogress", label: "قيد التنفيذ" },
    { id: "completed", label: "مكتملة" },
  ];

  return (
    <div className="tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? "active" : ""}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
