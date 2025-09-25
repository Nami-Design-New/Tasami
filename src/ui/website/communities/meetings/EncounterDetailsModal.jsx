import { Modal } from "react-bootstrap";
import useGetMeetingDetails from "../../../../hooks/website/communities/mettings/useGetMeetingDetails";

export default function EncounterDetailsModal({ show, setShow, meetingId }) {
  const { meetingDetails } = useGetMeetingDetails(meetingId);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      centered
      className="encounter-modal"
    >
      <Modal.Header closeButton className="m-2">
        <h5 className="fw-bold">{meetingDetails?.title}</h5>
      </Modal.Header>

      <Modal.Body>
        <p className="desc">{meetingDetails?.desc}</p>

        <div className="info-grid mt-3">
          <div>
            <strong>المجال:</strong>
            <span>{meetingDetails?.category_title}</span>
          </div>
          <div>
            <strong>التخصص:</strong>
            <span>{meetingDetails?.sub_category_title}</span>
          </div>
          <div>
            <strong>رابط اللقاء:</strong>
            <span className="url">{meetingDetails?.link}</span>
            <button onClick={handleCopy} className="copy-btn">
              <i className="fa-light fa-copy"></i>
            </button>
          </div>
        </div>
        <div className="meta">
          <span>
            <i className="fa-light fa-calendar-days"></i>{" "}
            {meetingDetails?.start_date}
          </span>
          <span>
            <i className="fa-light fa-clock"></i> {meetingDetails?.start_time}
          </span>
          <span>
            <i className="fa-solid fa-rotate-left"></i>{" "}
            {meetingDetails?.duration}
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
}
