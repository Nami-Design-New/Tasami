import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useCheckDashboard from "../../../../hooks/dashboard/checkDashboard/useCheckDashboard";
import useGetMeetingDetails from "../../../../hooks/website/communities/mettings/useGetMeetingDetails";
import { handleCopy } from "../../../../utils/helper";
import AddMeetingModal from "./AddMeetingModal";
import useGetMeetingDashDetails from "../../../../hooks/dashboard/subscription/useGetMeetingDashDetails";
import AlertModal from "../../platform/my-community/AlertModal";
import useDeleteMeeting from "../../../../hooks/website/communities/mettings/useDeleteMeeting";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useDeletDhMeeting from "../../../../hooks/dashboard/subscription/community/useDeleteDhMeeting";
import GlobalModal from "../../../GlobalModal";
import UnavailableResource from "../../UnavailableResource";

function EncounterDetailsModalView({
  show,
  setShow,
  meetingId,
  isMyCommuntiy,
  isDashboard,
  meetingData,
  isLoadingData,
  meetingError,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { deleteMeeting, isMeetingDelete } = useDeleteMeeting();
  const { deleteDhMeeting, isDhMeetingDelete } = useDeletDhMeeting();

  const handleDeleteMeeting = () => {
    if (isDashboard) {
      deleteDhMeeting(meetingId, {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.refetchQueries({ queryKey: ["dh-community-meetings"] });
          setShowAlertModal(false);
          setShow(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      deleteMeeting(meetingId, {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.refetchQueries({ queryKey: ["meetings"] });
          setShowAlertModal(false);
          setShow(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  const meetingDate = new Date(
    meetingData?.start_date + " " + meetingData?.start_time,
  );
  const isPast = meetingDate < new Date();
  return (
    <GlobalModal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      centered
      className="encounter-modal"
    >
      <GlobalModal.Header closeButton className="m-2">
        <h6 className="fw-bold flex-grow-1 ">{meetingData?.title}</h6>{" "}
        {!isDashboard && isMyCommuntiy && (
          <>
            <button
              className=" fs-6 mx-2  text-danger"
              onClick={() => setShowAlertModal(true)}
            >
              <i className="fa-regular fa-trash"></i>
            </button>
            <button className=" fs-6  " onClick={() => setShowModal(true)}>
              <i className="fa-regular fa-edit"></i>
            </button>
          </>
        )}
        {isDashboard && (
          <>
            <button
              className=" fs-6 mx-2  text-danger"
              onClick={() => setShowAlertModal(true)}
            >
              <i className="fa-regular fa-trash"></i>
            </button>
          </>
        )}
      </GlobalModal.Header>

      <GlobalModal.Body>
        {isLoadingData ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : !meetingData ? (
          <UnavailableResource
            error={meetingError}
            fallbackMessage={t("notification.referenceUnavailable")}
            height="200px"
          />
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
          <>
            {showModal && (
              <AddMeetingModal
                showModal={showModal}
                setShowModal={setShowModal}
                isEdit={true}
                meeting={meetingData}
                setShowDetailsModal={setShow}
              />
            )}{" "}
          </>
        )}{" "}
        {showAlertModal && (
          <AlertModal
            showModal={showAlertModal}
            setShowModal={setShowAlertModal}
            loading={isDashboard ? isDhMeetingDelete : isMeetingDelete}
            onConfirm={handleDeleteMeeting}
            confirmButtonText={t("confirm")}
          >
            {t("meetingDeleteAlert")}
          </AlertModal>
        )}
      </GlobalModal.Body>
    </GlobalModal>
  );
}

// Each context loads from its own source, so the dashboard query is never
// registered in the cache while browsing the website meetings list.
function DashboardEncounterDetails(props) {
  const { meetingDashDetails, isLoading } = useGetMeetingDashDetails(
    props.meetingId,
    props.show,
  );

  return (
    <EncounterDetailsModalView
      {...props}
      isDashboard
      meetingData={meetingDashDetails}
      isLoadingData={isLoading}
      meetingError={null}
    />
  );
}

function WebsiteEncounterDetails(props) {
  const { meetingDetails, isLoading, error } = useGetMeetingDetails(
    props.meetingId,
    props.show,
  );

  return (
    <EncounterDetailsModalView
      {...props}
      isDashboard={false}
      meetingData={meetingDetails}
      isLoadingData={isLoading}
      meetingError={error}
    />
  );
}

export default function EncounterDetailsModal(props) {
  const isDashboard = useCheckDashboard();

  return isDashboard ? (
    <DashboardEncounterDetails {...props} />
  ) : (
    <WebsiteEncounterDetails {...props} />
  );
}
