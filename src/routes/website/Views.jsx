import React from "react";
import CustomButton from "../../ui/CustomButton";
import { useState } from "react";
import AddCommentModal from "../../ui/modals/AddCommentModal";
export default function Views() {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const comments = [
    {
      id: 1,
      text: "محتوى رائع ومفيد جدًا.",
      desc: "سعيد بمتابعة اللقاء واستفدت كثيرًا.",
      date: "25 يونيو 2025",
    },
    {
      id: 2,
      text: "معلومات قيمة",
      desc: "كان اللقاء منظم والمحتوى واضح.",
      date: "26 يونيو 2025",
    },
     {
      id: 3,
      text: "معلومات قيمة",
      desc: "برنامج جيمب يعتبر من الأدوات الفعالة لتحرير الصور، ويتيح للمستخدمين إمكانية التعديل على الصور بسهولة تامة.",
      date: "26 يونيو 2025",
    },
     {
      id: 4,
      text: "معلومات قيمة",
      desc: "برنامج جيمب يعتبر من الأدوات الفعالة لتحرير الصور، ويتيح للمستخدمين إمكانية التعديل على الصور بسهولة تامة.",
      date: "26 يونيو 2025",
    },
  ];

  return (
    <div className="views-section">
      <div className="video-box">
        <iframe
          src="https://www.youtube.com/embed/"
          title="فيديو اللقاء"
          allowFullScreen
        ></iframe>
      </div>

      <p className="desc">
        هذا الفيديو يناقش أحدث استراتيجيات الإدارة الحديثة وكيفية تطوير
        بيئة العمل.
      </p>

      <div className="icons-row">
        <span>
          <div className="icon-circle">
            <i className="fa-regular fa-eye"></i>
          </div>
          120
        </span>
        <span>
          <div className="icon-circle">
            <i className="fa-regular fa-share"></i>
          </div>
          35
        </span>
        <span>
          <div className="icon-circle">
            <i className="fa-regular fa-heart"></i>
          </div>
          60
        </span>
        <span>
          <div className="icon-circle">
            <i className="fa-regular fa-comment"></i>
          </div>
          22
        </span>
      </div>

      <h5 className="mt-4">التعليقات</h5>

     <div className="row comments-list">
  {comments.map((c) => (
    <div className="col-lg-4 col-md-6 mt-3" key={c.id}>
      <div className="comment-card">
        <p className="title">{c.text}</p>
        <p className="desc">{c.desc}</p>
        <p className="date">{c.date}</p>
      </div>
    </div>
  ))}
</div>
<AddCommentModal showModal={showCommentModal} setShowModal={setShowCommentModal} />
 <CustomButton className="add-comment-btn" onClick={() => setShowCommentModal(true)} >
        <i className="fa-light fa-plus"></i> أضف تعليق
 </CustomButton>
    
    </div>
  );
}
