import { useState } from "react";
import EncounterDetailsModal from "./EncounterDetailsModal";

export default function MeetingCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);
console.log("item::::: meeting card ", item);

  return (
    <>
      <div className="meeting-card" onClick={() => setShowDetails(true)}>
        <p className="title">{item.title}</p>
        <p className="desc text-2lines">{item.desc}</p>
        <div className="meta">
          <span>
            <i className="fa-light fa-calendar-days"></i> {item.start_date}
          </span>
          <span>
            <i className="fa-light fa-clock"></i> {item.start_time}
          </span>
          <span>
            <i className="fa-solid fa-rotate-left"></i> {item.duration}
          </span>
        </div>
      </div>

      {setShowDetails && (
        <EncounterDetailsModal
          show={showDetails}
          setShow={setShowDetails}
          meetingId={item?.id}
        />
      )}
    </>
  );
}
