import { Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useGetMeetingDetails from "../../../../hooks/website/communities/mettings/useGetMeetingDetails";
import { handleCopy } from "../../../../utils/helper";
import useGetMeetingDashDetails from "../../../../hooks/dashboard/subscription/useGetMeetingDashDetails";
import useCheckDashboard from "../../../../hooks/dashboard/checkDashboard/useCheckDashboard";

export default function EncounterDetailsModal({ show, setShow, meetingId }) {
  const isDashboard = useCheckDashboard();
  const { t } = useTranslation();

  let meetingData = null;
  let isLoadingData = false;

  if (isDashboard) {
    const { meetingDashDetails, isLoading } = useGetMeetingDashDetails(meetingId, show);

    meetingData = meetingDashDetails;
    isLoadingData = isLoading;
    
  } else {
    const { meetingDetails, isLoading } = useGetMeetingDetails(meetingId, show);

    meetingData = meetingDetails;
    isLoadingData = isLoading;
  }
  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      centered
      className="encounter-modal"
    >
      <Modal.Header closeButton className="m-2">
        <h6 className="fw-bold">{meetingData?.title}</h6>
      </Modal.Header>

      <Modal.Body>
        {isLoadingData ? (
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
            <p className="desc">{meetingData?.desc}</p>
            <div className="info-grid mt-3">
              <div>
                <strong>{t("field")}:</strong>
                <span>{meetingData?.category_title}</span>
              </div>
              <div>
                <strong>{t("specialty")}:</strong>
                <span>{meetingData?.sub_category_title}</span>
              </div>
              <div>
                <strong>{t("meetingLink")}:</strong>
                <span className="url">{meetingData?.link}</span>
                <button
                  onClick={() => handleCopy(meetingData?.link)}
                  className="copy-btn"
                >
                  <i className="fa-light fa-copy"></i>
                </button>
              </div>
            </div>
            <div className="meta">
              <span>
                <i className="fa-light fa-calendar-days"></i>{" "}
                {meetingData?.start_date}
              </span>
              <span>
                <i className="fa-light fa-clock"></i>{" "}
                {meetingData?.start_time}
              </span>
              <span>
                <i className="fa-solid fa-rotate-left"></i>{" "}
                {meetingData?.duration}
              </span>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
