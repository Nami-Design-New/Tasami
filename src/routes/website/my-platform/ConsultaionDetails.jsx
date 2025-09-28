import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useGetConsultaionDetails from "../../../hooks/website/communities/useGetConsultaionDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import AnswerModal from "../../../ui/website/communities/consultations/AnswerModal";
import CustomButton from "../../../ui/CustomButton";
import ConsultionActions from "./ConsultionActions";
import ConsultaionComments from "../../../ui/website/communities/consultations/ConsultaionComments";

export default function ConsultaionDetails() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const { lang } = useSelector((state) => state.language);

  const { consultaionDetails, isLoading } = useGetConsultaionDetails();

  if (isLoading) return <Loading />;

  const isOwner = user.id === consultaionDetails.to_user_id;
  const hasAnswer = Boolean(consultaionDetails.answer);
  console.log(hasAnswer);

  return (
    <section className="consultaion-details page">
      <div className="container">
        {/* Header */}
        <div className="header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <RoundedBackButton onClick={() => navigate(-1)}>
              {lang === "ar" ? (
                <i className="fa-solid fa-angle-right"></i>
              ) : (
                <i className="fa-solid fa-angle-left"></i>
              )}
            </RoundedBackButton>
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
            <h2>
              {isOwner
                ? t("community.yourAnswer")
                : t("community.assistantAnswer")}
            </h2>

            <p>{consultaionDetails.answer}</p>

            <ConsultionActions consultaionDetails={consultaionDetails} />
          </div>
        )}

        {hasAnswer && <ConsultaionComments />}
      </div>

      <AnswerModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}
