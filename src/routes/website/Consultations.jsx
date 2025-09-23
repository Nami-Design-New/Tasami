import { useTranslation } from "react-i18next";
import ConsultationCard from "../../ui/cards/ConsultationCard";
import CustomButton from "../../ui/CustomButton";
import AddConsultationModal from "../../ui/website/profile/my-communities/AddConsultationModal";
import { useState } from "react";

export default function Consultations() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState();
  const publicConsultations = [
    {
      title: "تحدي إدارة الوقت",
      desc: "كيف يمكنني تحسين مهاراتي في إدارة الوقت لتجنب التأخير في مواعيد التسليم؟",
      type: "qes",
      stats: [
        { icon: "fa-regular fa-share", value: 12 },
        { icon: "fa-regular fa-heart", value: 45 },
        { icon: "fa-regular fa-comment", value: 8 },
        { icon: "fa-regular fa-eye", value: 60 },
      ],
    },
    {
      title: "مخاطر التغيير",
      desc: "ما هي الاستراتيجيات للتعامل مع المخاطر الناتجة عن التغييرات المفاجئة؟",
      type: "qes",
      stats: [
        { icon: "fa-regular fa-share", value: 12 },
        { icon: "fa-regular fa-heart", value: 45 },
        { icon: "fa-regular fa-comment", value: 8 },
        { icon: "fa-regular fa-eye", value: 60 },
      ],
    },
  ];

  return (
    <>
      <div className="consultations-section">
        <div className="row">
          <div className="col-12 p-2">
            <div className="consultations-header">
              <h5>الاستشارات العامة</h5>{" "}
              <CustomButton onClick={() => setShowModal(true)}>
                {t("community.addConsultation")}
              </CustomButton>
            </div>
          </div>
          {publicConsultations.map((item, idx) => (
            <div className="col-lg-6 p-2" key={idx}>
              <ConsultationCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <AddConsultationModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
