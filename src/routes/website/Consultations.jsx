import ConsultationCard from "../../ui/cards/ConsultationCard";

export default function Consultations() {
 
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
    <div className="consultations-section">
      <div className="row">
        <h5>الاستشارات العامة</h5>
        {publicConsultations.map((item, idx) => (
          <div className="col-lg-6" key={idx}>
            <ConsultationCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
