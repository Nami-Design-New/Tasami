import { Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useGetMeetingDetails from "../../../../hooks/website/communities/mettings/useGetMeetingDetails";
import { handleCopy } from "../../../../utils/helper";

export default function EncounterDetailsModal({ show, setShow, meetingId }) {
  const { t } = useTranslation();
  const { meetingDetails, isLoading } = useGetMeetingDetails(meetingId, show);

  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      centered
      className="encounter-modal"
    >
      <Modal.Header closeButton className="m-2">
        <h6 className="fw-bold">{meetingDetails?.title}</h6>
      </Modal.Header>

      <Modal.Body>
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {" "}
            <p className="desc">{meetingDetails?.desc}</p>
            <div className="info-grid mt-3">
              <div>
                <strong>{t("field")}:</strong>
                <span>{meetingDetails?.category_title}</span>
              </div>
              <div>
                <strong>{t("specialty")}:</strong>
                <span>{meetingDetails?.sub_category_title}</span>
              </div>
              <div>
                <strong>{t("meetingLink")}:</strong>
                <span className="url">{meetingDetails?.link}</span>
                <button
                  onClick={() => handleCopy(meetingDetails?.link)}
                  className="copy-btn"
                >
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
                <i className="fa-light fa-clock"></i>{" "}
                {meetingDetails?.start_time}
              </span>
              <span>
                <i className="fa-solid fa-rotate-left"></i>{" "}
                {meetingDetails?.duration}
              </span>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
