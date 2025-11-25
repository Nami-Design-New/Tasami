import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import AnswerModal from "../../../ui/website/communities/consultations/AnswerModal";
import CustomButton from "../../../ui/CustomButton";
// import ConsultionActions from "./ConsultionActions";
import ConsultaionComments from "../../../ui/website/communities/consultations/ConsultaionComments";
import useGetConsultaionDashDetails from "../../../hooks/dashboard/subscription/useGetConsultaionDashDetails";
import Loading from "../../../ui/loading/Loading";
import ConsultaionDashComments from "./ConsultaionDashComments";

export default function ConsultaionDashDetails() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  // const { user } = useSelector((state) => state.authRole);
  const { id } = useParams();
  const { consultaionDashDetails, isLoading } =
    useGetConsultaionDashDetails(id);
  console.log("coonst dash details ", consultaionDashDetails);

  if (isLoading) return <Loading />;

  // const isOwner = user.id === consultaionDashDetails.to_user_id;
  const hasAnswer = Boolean(consultaionDashDetails.answer);

  return (
    <section className="consultaion-details page">
      <div className="container">
        {/* Header */}
        <div className="header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <RoundedBackButton onClick={() => navigate(-1)}></RoundedBackButton>
            <h1 className="title">{consultaionDashDetails?.title}</h1>
          </div>

          {/* <CustomButton onClick={() => setShowModal(true)}>
              {t("community.answer")}
            </CustomButton> */}
        </div>

        <p className="decription">{consultaionDashDetails?.desc}</p>

        <div className="answer-container">
          <h2>
            {t("community.yourAnswer")}
            {/* t("community.assistantAnswer") */}
          </h2>

          <p>{consultaionDashDetails.answer}</p>

          {/* <ConsultionActions consultaionDashDetails={consultaionDashDetails} /> */}
        </div>

        <ConsultaionDashComments />
      </div>

      <AnswerModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}
