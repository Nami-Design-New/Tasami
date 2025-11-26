import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useCheckDashboard from "../../../../hooks/dashboard/checkDashboard/useCheckDashboard";
import useGetMeetingDetails from "../../../../hooks/website/communities/mettings/useGetMeetingDetails";
import { handleCopy } from "../../../../utils/helper";
import AddMeetingModal from "./AddMeetingModal";
import useGetMeetingDashDetails from "../../../../hooks/dashboard/subscription/useGetMeetingDashDetails";

export default function EncounterDetailsModal({ show, setShow, meetingId }) {
  const isDashboard = useCheckDashboard();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const dash = useGetMeetingDashDetails(meetingId, show);
  const normal = useGetMeetingDetails(meetingId, show);

  const meetingData = isDashboard
    ? dash.meetingDashDetails
    : normal.meetingDetails;
  const isLoadingData = isDashboard ? dash.isLoading : normal.isLoading;

  const meetingDate = new Date(
    meetingData?.start_date + " " + meetingData?.start_time
  );
  const isPast = meetingDate < new Date();
  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      centered
      className="encounter-modal"
    >
      <Modal.Header closeButton className="m-2">
        <h6 className="fw-bold flex-grow-1 ">{meetingData?.title}</h6>
        {!isDashboard && (
          <button className=" fs-6  " onClick={() => setShowModal(true)}>
            <i className="fa-regular fa-edit"></i>{" "}
          </button>
        )}
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
                <span style={{ color: isPast ? "#ff7a59" : "" }}>
                  {meetingData?.start_date}
                </span>
              </span>
              <span>
                <i className="fa-light fa-clock"></i>
                {meetingData?.start_time}
              </span>
              <span>
                <i className="fa-solid fa-rotate-left"></i>{" "}
                {meetingData?.duration}
              </span>
            </div>
          </>
        )}{" "}
        {!isDashboard && (
          <AddMeetingModal
            showModal={showModal}
            setShowModal={setShowModal}
            isEdit={true}
            meeting={meetingData}
            setShowDetailsModal={setShow}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}
