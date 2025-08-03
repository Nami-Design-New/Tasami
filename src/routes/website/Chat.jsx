// pages/.../Chat.jsx
import { useParams, useLocation } from "react-router";
import SectionHeader from "../../ui/website/SectionHeader";

export default function Chat() {
  const { id } = useParams();
  const location = useLocation();
  const helperName = location.state?.name || "اسم المساعد";

  return (
    <div className="chat page container">
      <div className="chat-header">
        <SectionHeader title={helperName} />
      </div>

  <div className="chat-body">
  <div className="message left">
    <div className="bubble">السلام عليكم<br />شكراً لقبول الطلب</div>
    <div className="time">10:00 ص</div>
  </div>

  <div className="message right">
    <div className="bubble">وعليكم السلام ممكن نبدأ من بكره</div>
    <div className="time">10:30 ص</div>
  </div>
</div>
      <div className="chat-input">
        <button className="send-btn">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
        <button className="icon-btn">
          <i className="fa-solid fa-microphone"></i>
        </button>
        <button className="icon-btn">
          <i className="fa-solid fa-camera"></i>
        </button>
        <input type="text" placeholder="اكتب هنا ..." />
      </div>
    </div>
  );
}
