import React, { useState } from "react";
import WorksDetailsTabs from "./WorkDetailsTabs";
import SectionHeader from "../../../ui/website/SectionHeader";
import { Outlet } from "react-router";
import CancelConfirmationModal from "../../../ui/modals/CancelConfirmationModal";

export default function WorksDetails() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="works-details page">
      <div className="container">
        <div className="row">
          <div className="header">
            <SectionHeader title="OB-1729577487610" />

            <div className="options-menu">
              <i className="fas fa-ellipsis-v" onClick={toggleMenu}></i>
              {menuOpen && (
                <div className="options-list">
                  <button
                    onClick={() => {
                      setShowCancelModal(true);
                      setMenuOpen(false);
                    }}
                    className="text-danger"
                  >
                    إلغاء طلب التعاقد
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-12 mb-4">
            <WorksDetailsTabs />
          </div>

          <div className="col-lg-9 col-md-8 col-12">
            <Outlet />
          </div>
        </div>
      </div>
      <CancelConfirmationModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
      />
    </div>
  );
}
