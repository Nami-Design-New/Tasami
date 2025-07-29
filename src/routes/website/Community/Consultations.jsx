import { useState } from "react";
import ConsultationCard from "../../../ui/cards/ConsultationCard";
import CustomButton from "../../../ui/CustomButton";
import ConsultationModal from "../../../ui//modals/ConsultationModal";

export default function Consultations() {
  const [showModal, setShowModal] = useState(false);

  const Consultations = [
    {
      id: 1,
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
      id: 2,
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
    <div className="consultations-section">
      <div className="row">
        <h5>الاستشارات العامة</h5>
        {Consultations.map((item, idx) => (
          <div className="col-lg-6" key={idx}>
            <ConsultationCard item={item} />
          </div>
        ))}
      </div>

      <CustomButton onClick={() => setShowModal(true)}>
        طلب استشارة
      </CustomButton>

      <ConsultationModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
