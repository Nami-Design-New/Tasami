import { useState } from "react";
import EncounterDetailsModal from "./EncounterDetailsModal";

export default function MeetingCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="meeting-card" onClick={() => setShowDetails(true)}>
        <p className="title">{item.title}</p>
        <p className="desc">{item.desc}</p>
        <div className="meta">
          <span>
            <i className="fa-light fa-calendar-days"></i> {item.date}
          </span>
          <span>
            <i className="fa-light fa-clock"></i> {item.time}
          </span>
          <span>
            <i className="fa-solid fa-rotate-left"></i> {item.duration}
          </span>
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
