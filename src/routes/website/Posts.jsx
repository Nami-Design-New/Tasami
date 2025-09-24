// import React from 'react'

import ConsultationCard from "../../ui/website/communities/consultations/ConsultationCard";

// export default function Posts() {
//   return (
//     <div>Posts</div>
//   )
// }

export default function Posts() {
  const posts = [
    {
      desc: "كيف يمكنني تحسين مهاراتي في إدارة الوقت لتجنب التأخير في مواعيد التسليم؟",
      type: "qes",
      date: "1 يوليو 2025",
      stats: [
        { icon: "fa-regular fa-share", value: 12 },
        { icon: "fa-regular fa-heart", value: 45 },
        { icon: "fa-regular fa-comment", value: 8 },
        { icon: "fa-regular fa-eye", value: 60 },
      ],
    },
    {
      desc: "ما هي الاستراتيجيات للتعامل مع المخاطر الناتجة عن التغييرات المفاجئة؟",
      type: "qes",
      date: "1 يوليو 2025",
      stats: [
        { icon: "fa-regular fa-share", value: 12 },
        { icon: "fa-regular fa-heart", value: 45 },
        { icon: "fa-regular fa-comment", value: 8 },
        { icon: "fa-regular fa-eye", value: 60 },
      ],
    },
    {
      desc: "ما هي الاستراتيجيات للتعامل مع المخاطر الناتجة عن التغييرات المفاجئة؟",
      type: "qes",
      date: "1 يوليو 2025",
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
        {posts.map((item, idx) => (
          <div className="col-lg-4 mt-3" key={idx}>
            <ConsultationCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
