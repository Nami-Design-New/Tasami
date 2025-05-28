import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import NavBar from "../ui/NavBar";
import SideBar from "../ui/dash-board/SideBar";
import DashBoardFooter from "../ui/dash-board/DashBoardFooter";

export default function DashBoardLayout() {
  const location = useLocation();
  const [hoverExpand, setHoverExpand] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
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
