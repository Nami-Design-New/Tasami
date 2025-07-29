import { Routes, Route } from "react-router";
import TabNav from "./WorksTab";
import PendingWorks from "./PendingWorks";
import InProgressWorks from "./InProgressWorks";
import CompletedWorks from "./CompletedWorks";

export default function MyWorks() {
  return (
    <section className="myworks page">
      <div className="container">
        <TabNav />

        <Routes>
          <Route path="pending" element={<PendingWorks />} />
          <Route path="inprogress" element={<InProgressWorks />} />
          <Route path="completed" element={<CompletedWorks />} />
        </Routes>
      </div>
    </section>
  );
}
