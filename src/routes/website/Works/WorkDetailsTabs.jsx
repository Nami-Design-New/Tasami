import { NavLink } from "react-router";

export default function WorksDetailsTabs() {
  return (
    <div className="tab-nav">
      <div className="tab-buttons">
        <NavLink to="" end className="tab-button">
           التفاصيل
        </NavLink>
        <NavLink to="groups" end className="tab-button">
           المجموعة
        </NavLink>
        <NavLink to="tasks" end className="tab-button">
          المهام
        </NavLink>
         <NavLink to="helpers" end className="tab-button">
          المساعدون 
        </NavLink>
      </div>
    </div>
  );
}
