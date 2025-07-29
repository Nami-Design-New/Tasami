import { useParams } from "react-router";
import { useState } from "react";
import CommentCard from "../../../ui/cards/CommentCard";
import SectionHeader from "../../../ui/website/SectionHeader";
import AddCommentModal from "../../../ui/modals/AddCommentModal";

export default function PostDetails() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [copiedLinkIdx, setCopiedLinkIdx] = useState(null);

  const post = {
    title: "كيفية تحويل الرسوم الثلاثة الأبعاد إلى تقنية الإسقاط",
    desc: "المقالة تتناول باختصار كيف يمكن دمج تقنيات التصميم الثلاثي الأبعاد والفنون البصرية لخلق تجربة تفاعلية رقمية مذهلة باستخدام تقنيات الإسقاط الضوئي، مع الإشارة إلى بعض التطبيقات الحديثة.",
    links: [
      "https://zoonuz/123sdhx682fh.php",
      "https://zoonuz/123sdhx682fh.php",
      "https://zoonuz/123sdhx682fh.php",
    ],
    video: "/videos/sample-video.mp4",
    stats: [
      { icon: "fa-solid fa-share", value: 5 },
      { icon: "fa-solid fa-heart", value: 5 },
      { icon: "fa-solid fa-comment", value: 115 },
      { icon: "fa-solid fa-eye", value: 5 },
    ],
  };

  const comments = [
    {
      id: 1,
      name: "سارة الكشّاف",
      text: "مقال ممتاز يوضح خطوات التحويل باستخدام التقنيات الحديثة.",
      date: "16 فبراير 2025 | 09:30",
    },
    {
      id: 2,
      name: "يوسف الغالي",
      text: "المقال يختصر الكثير من التفاصيل ويوجه المصممين لمصادر مفيدة.",
      date: "16 فبراير 2025 | 09:30",
    },
    {
      id: 3,
      name: "ليلى المدني",
      text: "برنامج رائع لتحويل الأبعاد الثلاثية ويستحق التجربة.",
      date: "16 فبراير 2025 | 09:30",
    },
  ];

  const handleCopy = (link, idx) => {
    navigator.clipboard.writeText(link);
    setCopiedLinkIdx(idx);
    setTimeout(() => setCopiedLinkIdx(null), 2000); // الرسالة تختفي بعد ثانيتين
  };

  return (
    <div className="posts-details-page page">
      <div className="container">
        <SectionHeader title="تفاصيل المنشور" />

        <div className="content-wrapper row ">
          <div className="col-12 col-lg-6">
            <div className="video-card card p-2">
              <video controls className="w-100 rounded">
                <source src={post.video} type="video/mp4" />
                المتصفح لا يدعم تشغيل الفيديو.
              </video>
              <p className="duration">4:35 / 14:20</p>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="post-info">
              <h5 className="title fw-bold">{post.title}</h5>
              <p className="desc">{post.desc}</p>

              <div className="links">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold m-0">الروابط</h6>
                </div>

                {post.links.map((link, idx) => (
                  <div className="link-item position-relative" key={idx}>
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                    <div
                      className="doc-icon"
                      onClick={() => handleCopy(link, idx)}
                    >
                      <i className="fa-regular fa-copy"></i>
                    </div>
                    {copiedLinkIdx === idx && (
                      <div className="copy-alert">تم النسخ</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="stats d-flex gap-3 flex-wrap">
                {post.stats.map((s, idx) => (
                  <div
                    className="stat-item d-flex align-items-center gap-2"
                    key={idx}
                  >
                    <div className="icon-circle">
                      <i className={s.icon}></i>
                    </div>
                    <span>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
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
        <div className="add-comment">
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
