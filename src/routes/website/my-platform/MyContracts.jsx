import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import WorksTab from "../../../ui/website/WorksTab";

export default function MyContracts() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="myworks page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <WorksTab activeTab={activeTab} setActiveTab={setActiveTab}>
              <NavLink to={"/my-contracts"} end>
                بانتظار التنفيذ
              </NavLink>
              <NavLink to={"in-progress"}>قيد التنفيذ</NavLink>
              <NavLink to={"completed"}>مكتملة</NavLink>
            </WorksTab>
          </div>
        </div>
        <div className="row">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
