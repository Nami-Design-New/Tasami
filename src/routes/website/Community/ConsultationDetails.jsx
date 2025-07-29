import { useState } from "react";
import { useParams } from "react-router";
import SectionHeader from "../../../ui/website/SectionHeader";
import AddCommentModal from "../../../ui/modals/AddCommentModal";
import CommentCard from "../../../ui/cards/CommentCard"; 

export default function ConsultationDetails() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false); 

  const questionText =
    "كيف يمكنني تحسين مهاراتي في إدارة الوقت لتجنب التأخير في مواعيد التسليم؟";

  const assistantOpinion =
    "لتحقيق التميز في مسارك الوظيفي، ركّز على تحديد مهاراتك الأساسية والمستقبلية، وضع خططاً واضحة لتعزيزها...";

  const stats = [
    { icon: "fa-regular fa-share", value: 12 },
    { icon: "fa-regular fa-heart", value: 45 },
    { icon: "fa-regular fa-comment", value: 8 },
    { icon: "fa-regular fa-eye", value: 60 },
  ];

  const comments = [
    {
      id: 1,
      name: "سارة الكشّاف",
      text: "برنامج جيّد يحتوي على أدوات لتحديد المهام...",
      date: "16 فبراير 2025 | 09:30",
    },
    {
      id: 2,
      name: "يوسف الغالي",
      text: "يتيح فرص تدريبية ويستخدم الذكاء الاصطناعي...",
      date: "16 فبراير 2025 | 09:30",
    },
    {
      id: 3,
      name: "ليلى المدني",
      text: "واجهة مريحة لقراءة النصوص بدقة واحتراف...",
      date: "16 فبراير 2025 | 09:30",
    },
  ];

  return (
    <div className="consultation-details-page page">
      <div className="container">
        <SectionHeader title="تحدي إدارة الوقت" />
        <h5 className="question-text my-4">{questionText}</h5>

        <div className="assistant-card card p-3 mb-4">
          <h6 className="assistant-title">رأي المساعد</h6>
          <p className="mb-3">{assistantOpinion}</p>

          <div className="stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="icon-circle">
                  <i className={stat.icon}></i>
                </div>
                <span>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <h6 className="hed">التعليقات</h6>
        <div className="row g-3 mb-4">
          {comments.map((c) => (
            <div className="col-12 col-md-6 col-lg-4" key={c.id}>
              <CommentCard comment={c} />
            </div>
          ))}
        </div>

        <div className="add-comment ">
          <button
            className="add-comment-btn"
            onClick={() => setShowModal(true)} 
          >
            <i className="fa-solid fa-plus me-2"></i> أضف تعليق
          </button>
        </div>

        <AddCommentModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
}
