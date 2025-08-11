import { NavLink, Outlet } from "react-router";
import React, { useState } from "react";
import AssistantModal from "../../ui/modals/AssistantModal";
import ProfileCard from "../../ui/cards/ProfileCard";
export default function Profile() {
    const [showAssistantModal, setShowAssistantModal] = useState(false);

  return (
    <section className="profile_section mt-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12 p-2">
            <div className="profile_sidebar">
              <ProfileCard />
              <div className="nav_links">
                <NavLink to="" end className="nav_link">
                  <i className="fa-regular fa-user"></i>
                  معلوماتي
                </NavLink>

                <NavLink to="my-notifications" className="nav_link">
                  <i className="fa-regular fa-bell"></i>
                  الإشعارات
                </NavLink>

                <NavLink to="my-wallet" className="nav_link">
                  <i className="fa-solid fa-wallet"></i>
                  محفظتي
                </NavLink>

                <NavLink to="Interests" className="nav_link">
                  <i className="fa-solid fa-clipboard-list"></i>
                  اهتماماتي
                </NavLink>

                <NavLink to="savings" className="nav_link">
                  <i className="fa-solid fa-bookmark"></i>
                  محفوظاتي
                </NavLink>

                <NavLink to="communities" className="nav_link">
                  <i className="fa-solid fa-users"></i>
                  مجتمعاتي
                </NavLink>

                <NavLink to="followers" className="nav_link">
                  <i className="fa-solid fa-heart"></i>
                  متابعاتي
                </NavLink>
              </div>

              <button className="assistant_btn" onClick={() => setShowAssistantModal(true)}>
               <i className="fa-solid fa-robot"></i>
              منصة المساعد الشخصي
             </button>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 col-12 p-0">
            <Outlet />
          </div>
        </div>
      </div>
        <AssistantModal
          showModal={showAssistantModal}
          setShowModal={setShowAssistantModal}
        />
    </section>
    
  );
}
