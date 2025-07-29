import { NavLink } from "react-router";

export default function WorksTab() {
  const tabs = [
    { id: "pending", label: "بانتظار التنفيذ" },
    { id: "inprogress", label: "قيد التنفيذ" },
    { id: "completed", label: "مكتملة" },
  ];

  return (
    <div className="tab-nav">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.id}
            className={({ isActive }) =>
              `toggle-btn ${isActive ? "active" : ""}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
