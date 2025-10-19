import { useState } from "react";
import { Outlet } from "react-router";
import TabNav from "../../../ui/website/WorksTab";

export default function MyWorks() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="myworks page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
        <div className="row">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
