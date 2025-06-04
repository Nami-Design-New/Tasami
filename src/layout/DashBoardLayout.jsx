import { useState } from "react";
import { Outlet } from "react-router";
import DashBoardFooter from "../ui/dash-board/DashBoardFooter";
import SideBar from "../ui/dash-board/SideBar";
import NavBar from "../ui/NavBar";
import ScrollToTop from "../ui/ScrollToTop";

export default function DashboardLayout() {
  const [hoverExpand, setHoverExpand] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <ScrollToTop />
      <section
        className={`grid-container ${collapsed ? "collapsed" : "expanded"}`}
      >
        <SideBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          hoverExpand={hoverExpand}
          setHoverExpand={setHoverExpand}
        />
        <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="main_wrap">
          <div className="router_wrapper">
            <Outlet />
          </div>
          <DashBoardFooter />
        </main>
      </section>
    </>
  );
}
