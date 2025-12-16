import { useState } from "react";
import EncounterDetailsModal from "./EncounterDetailsModal";

export default function MeetingCard({ item, isMyCommuntiy }) {
  const [showDetails, setShowDetails] = useState(false);

  const meetingDate = new Date(item.start_date + " " + item.start_time);

  const isPast = meetingDate < new Date();

  return (
    <>
      <div className="meeting-card" onClick={() => setShowDetails(true)}>
        <p className="title">{item.title}</p>
        <p className="desc text-2lines">{item.desc}</p>
        <div className="meta">
          <span>
            <i className="fa-light fa-calendar-days"></i>{" "}
            <span style={{ color: isPast ? "#ff7a59" : "" }}>
              {" "}
              {item.start_date}
            </span>
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
          isMyCommuntiy={isMyCommuntiy}
        />
      )}
    </>
  );
}
