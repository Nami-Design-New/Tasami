import { NavLink } from "react-router";

export default function WorksTab() {
  return (
    <div className="tab-nav">
      <div className="tab-buttons">
        <NavLink to="" end className="tab-button">
          بانتظار التنفيذ
        </NavLink>
        <NavLink to="inprogress" end className="tab-button">
          قيد التنفيذ
        </NavLink>
        <NavLink to="completed" end className="tab-button">
          مكتملة
        </NavLink>
      </div>
    </div>
  );
}
