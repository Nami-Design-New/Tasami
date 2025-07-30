import { Outlet } from "react-router"; 
import TabNav from "./WorksTab";
import SectionHeader from "../../../ui/website/SectionHeader";

export default function MyWorks() {
  return (
    <section className="myworks page">
      <div className="container">
         <SectionHeader title="جميع الأعمال" />
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12 mb-4">
            <TabNav />
          </div>

          <div className="col-lg-9 col-md-8 col-12">
          <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
