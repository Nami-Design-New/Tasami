import SectionHeader from "../../ui/website/SectionHeader";

export default function GroupChat() {
  const messages = [
    {
      id: 1,
      sender: "منى",
      time: "10:00 ص",
      text: "السلام عليكم شكرا لقبول الطلب",
      side: "right",
      avatar: "/images/profile1.png",
    },
    {
      id: 2,
      sender: "محمد",
      time: "10:05 ص",
      text: "أنا المساعد",
      side: "left",
      avatar: "/images/p2.png",
    },
    {
      id: 3,
      sender: "سارة",
      time: "10:10 ص",
      text: "عليكم السلام يا مساعد معك العضو محمود ",
      side: "left",
      avatar: "/images/p1.png",
    },
   
  ];

  return (
    <div className="chat page container">
      <div className="chat-header">
        <SectionHeader title={"المحادثات"} />
      </div>
      <p className="group-info-note">هذه محادثة جماعية، رسائلك مرئية للجميع</p>
      <div className="chat-body group-chat">
        {messages.map((msg) => (
          <div className={`message ${msg.side}`} key={msg.id}>
            <img src={msg.avatar} alt={msg.sender} className="avatar" />

            <div className="bubble-wrapper">
              <div className="bubble">
                <div>{msg.text}</div>
              </div>
              <div className="time">{msg.time}</div>
            </div>
          </div>
        ))}
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
