import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useGetConsultaionDetails from "../../../hooks/website/communities/useGetConsultaionDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import AnswerModal from "../../../ui/website/communities/consultations/AnswerModal";
import CustomButton from "../../../ui/CustomButton";
import ConsultionActions from "./ConsultionActions";
import ConsultaionComments from "../../../ui/website/communities/consultations/ConsultaionComments";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import useDeleteConsultation from "../../../hooks/website/communities/useDeleteConsultation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function ConsultaionDetails() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { consultaionDetails, isLoading } = useGetConsultaionDetails();
  const { deleteConsultation, isDeletingConsultation } =
    useDeleteConsultation();

  if (isLoading) return <Loading />;

  const isOwner = user.id === consultaionDetails.to_user_id;
  const hasAnswer = Boolean(consultaionDetails.answer);

  const handleDeleteConsultation = () => {
    deleteConsultation(id, {
      onSuccess: (res) => {
        navigate("/my-community");
        setShowAlertModal(false);
        queryClient.invalidateQueries({ queryKey: ["consultaion-details"] });
        toast.success(res.message || "success delete Consultation ");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <section className="consultaion-details page">
      <div className="container">
        {/* Header */}
        <div className="header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <RoundedBackButton onClick={() => navigate(-1)}></RoundedBackButton>
            <h1 className="title">{consultaionDetails.title}</h1>
          </div>

          {isOwner && !hasAnswer && (
            <CustomButton onClick={() => setShowModal(true)}>
              {t("community.answer")}
            </CustomButton>
          )}
        </div>

        <p className="decription">{consultaionDetails.desc}</p>

        {hasAnswer && (
          <div className="answer-container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>
                {isOwner
                  ? t("community.yourAnswer")
                  : t("community.assistantAnswer")}
              </h2>
              {user?.id === consultaionDetails?.to_user_id && (
                <div className="d-flex gap-2">
                  <button
                    className=" fs-6 mx-2  text-danger"
                    onClick={() => setShowAlertModal(true)}
                  >
                    <i className="fa-regular fa-trash"></i>
                  </button>
                  <button
                    className=" fs-6  "
                    onClick={() => setShowEditModal(true)}
                  >
                    <i className="fa-regular fa-edit"></i>
                  </button>
                </div>
              )}
            </div>
            <p>{consultaionDetails.answer}</p>

            <ConsultionActions consultaionDetails={consultaionDetails} />
          </div>
        )}

        {hasAnswer && (
          <ConsultaionComments
            isSubscribed={consultaionDetails?.is_subscribed}
            isMyCommunity={user?.id === consultaionDetails?.to_user_id}
          />
        )}
      </div>

      <AnswerModal
        showModal={showModal}
        setShowModal={setShowModal}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        consultaionDetails={consultaionDetails}
      />
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={handleDeleteConsultation}
        loading={isDeletingConsultation}
      >
        {t("profile.deleteAlertMessage")}
      </AlertModal>
    </section>
  );
}
