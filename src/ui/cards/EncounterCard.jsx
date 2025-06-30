import React, { useState } from "react";
import EncounterDetailsModal from "../../ui/modals/EncounterDetailsModal";

export default function EncounterCard({ item }) {
const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="col-lg-4 col-md-6 col-12">
        <div className="encounter-card" onClick={() => setShowDetails(true)}>
          <p className="title">{item.title}</p>
          <p className="desc">{item.desc}</p>
          <div className="meta">
            <span><i className="fa-light fa-calendar-days"></i> {item.date}</span>
            <span><i className="fa-light fa-clock"></i> {item.time}</span>
            <span><i className="fa-solid fa-rotate-left"></i> {item.duration}</span>
          </div>
        </div>
      </div>

     <EncounterDetailsModal
    show={showDetails}
    setShow={setShowDetails}
    encounter={item}
  />
    </>
  );
}
