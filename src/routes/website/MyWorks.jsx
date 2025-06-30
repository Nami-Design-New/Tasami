import { useState } from "react";
import TabNav from "../../ui/website/WorksTab";
import TabContent from "../../ui/website/TabContent";

export default function MyWorks() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="myworks page">
      <div className="container">
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
}
