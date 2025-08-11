import { NavLink, Outlet } from "react-router";
import React, { useState } from "react";
export default function AssistantPlatform() {
  return (
    <section className="profile_section mt-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12 p-2">
            <div className="profile_sidebar">
              <div className="nav_links">
                <NavLink to="" end className="nav_link">
                  <i className="fa-regular fa-user"></i>
                  منصتي
                </NavLink>

                <NavLink to="subscription-management" className="nav_link">
                  <img src="/icons/subscription.svg" alt="icon" />
                  اداره الاشتراك
                </NavLink>

                <NavLink to="cv" className="nav_link">
                  <img src="/icons/cv.svg" alt="icon" />
                  سيرتي الذاتية
                </NavLink>

                <NavLink to="my-help" className="nav_link">
                  <img src="/icons/help.svg" alt="icon" />
                  مساعداتي
                </NavLink>
                <NavLink to="my-opportunity" className="nav_link">
                  <img src="/icons/opportunity.svg" alt="icon" />
                  فرصي
                </NavLink>
                <NavLink to="my-contracts" className="nav_link">
                  <img src="/icons/Contracts.svg" alt="icon" />
                  عقودي
                </NavLink>

                <NavLink to="my-groups" className="nav_link">
                  <img src="/icons/mygroups.svg" alt="icon" />
                  مجموعاتي
                </NavLink>
                <NavLink to="my-community" className="nav_link">
                  <img src="/icons/mycommunity.svg" alt="icon" />
                  مجتمعي
                </NavLink>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 col-12 p-0 mt-3">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
