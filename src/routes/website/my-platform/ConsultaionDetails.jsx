// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import useGetConsultaionDetails from "../../../hooks/website/communities/useGetConsultaionDetails";
// import Loading from "../../../ui/loading/Loading";
// import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
// import AnswerModal from "../../../ui/website/profile/my-communities/AnswerModal";
// import ConsultaionComments from "../../../ui/website/profile/my-communities/ConsultaionComments";
// import CustomButton from "../../../ui/CustomButton";

// export default function ConsultaionDetails() {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const { t } = useTranslation();
//   const { user } = useSelector((state) => state.authRole);
//   const { lang } = useSelector((state) => state.language);

//   const { consultaionDetails, isLoading } = useGetConsultaionDetails();

//   if (isLoading) return <Loading />;

//   return (
//     <section className="consultaion-details page">
//       <div className="container">
//         <div className="header">
//           <div className="d-flex align-items-center gap-3">
//             <RoundedBackButton onClick={() => navigate(-1)}>
//               {lang === "ar" ? (
//                 <i className="fa-solid fa-angle-right"></i>
//               ) : (
//                 <i className="fa-solid fa-angle-left"></i>
//               )}
//             </RoundedBackButton>
//             <h1 className="title">{consultaionDetails.title}</h1>
//           </div>{" "}
//           {user.id === consultaionDetails.to_user_id &&
//           !consultaionDetails.answer ? (
//             <CustomButton onClick={() => setShowModal(true)} >
//               {t("community.answer")}
//             </CustomButton>
//           ) : (
//             <></>
//           )}
//         </div>

//         <p className="decription">{consultaionDetails.desc}</p>

//         {consultaionDetails.answer && (
//           <div className="answer-container">
//             {user.id === consultaionDetails.to_user_id ? (
//               <h2>{t("community.yourAnswer")}</h2>
//             ) : (
//               <h2>{t("community.assistantAnswer")}</h2>
//             )}

//             {consultaionDetails.answer && <p>{consultaionDetails.answer}</p>}

//             {consultaionDetails.answer && (
//               <div className="icons-row details">
//                 <div className="icons-wrapper">
//                   <div className="icon-circle">
//                     <i className="fa-solid fa-eye"></i>
//                   </div>
//                   <span>{consultaionDetails.views_count}</span>
//                 </div>

//                 <div className="icons-wrapper ">
//                   <div className="icon-circle">
//                     <i className="fa-solid fa-heart heart"></i>
//                   </div>
//                   <span>{consultaionDetails.likes_count}</span>
//                 </div>

//                 <div className="icons-wrapper">
//                   <div className="icon-circle">
//                     <i className="fa-solid fa-comment"></i>
//                   </div>
//                   <span>{consultaionDetails.comments_count}</span>
//                 </div>

//                 <div className="icons-wrapper">
//                   <div className="icon-circle">
//                     <i className="fa-solid fa-share"></i>
//                   </div>
//                   <span>{consultaionDetails.shares_count}</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {consultaionDetails.answer && <ConsultaionComments />}
//       </div>

//       <AnswerModal showModal={showModal} setShowModal={setShowModal} />
//     </section>
//   );
// }
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useGetConsultaionDetails from "../../../hooks/website/communities/useGetConsultaionDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import AnswerModal from "../../../ui/website/profile/my-communities/AnswerModal";
import ConsultaionComments from "../../../ui/website/profile/my-communities/ConsultaionComments";
import CustomButton from "../../../ui/CustomButton";
import ConsultionActions from "./ConsultionActions";

export default function ConsultaionDetails() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const { lang } = useSelector((state) => state.language);

  const { consultaionDetails, isLoading } = useGetConsultaionDetails();

  if (isLoading) return <Loading />;

  // ✅ Extract conditions into variables
  const isOwner = user.id === consultaionDetails.to_user_id;
  const hasAnswer = Boolean(consultaionDetails.answer);

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

          {/* Only show Answer button if user is owner and no answer exists */}
          {isOwner && !hasAnswer && (
            <CustomButton onClick={() => setShowModal(true)}>
              {t("community.answer")}
            </CustomButton>
          )}
        </div>

        {/* Description */}
        <p className="decription">{consultaionDetails.desc}</p>

        {/* Answer Section */}
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

        {/* Comments only if answer exists */}
        {hasAnswer && <ConsultaionComments />}
      </div>

      {/* Modal */}
      <AnswerModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}
