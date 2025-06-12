import Message from "./Message";

const ChatWindow = ({ isOpen, setIsOpen, activeChat }) => {
  return (
    <div className="chat-window">
      <header className="chat-window__header">
        <div className="chat-window__info">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className={`chat-window__back ${
              isOpen ? "chat-window__back--open" : ""
            } `}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <img src="https://avatar.iran.liara.run/public/1" />
          <div>
            <h4 className="chat-window__name">{activeChat?.name}</h4>
            <span className="chat-window__role">نشط الان</span>
          </div>
        </div>
        <div className="chat-window__actions">
          <button>
            <i className="fa-solid fa-phone"></i>
          </button>
          <button>
            <i className="fa-solid fa-camera"></i>
          </button>
          <button>
            <i className="fa-solid fa-search"></i>
          </button>
        </div>
      </header>

      <div className="chat-window__messages">
        <Message
          from="other"
          text="مرحبًا جون، أاريد الاستفسار عن الاشتراكات. هل يمكنك مساعدتي؟ 😕"
          time="10:02 ص"
          avatar="https://avatar.iran.liara.run/public/1"
        />
        <Message
          from="self"
          text="كيف يمكننا المساعدة؟ نحن هنا من أجلك! 😄"
          time="10:00 ص"
          avatar="https://avatar.iran.liara.run/public/42"
        />
        <Message
          from="self"
          text=" يحتوي تسامي على جميع المكونات التي ستحتاجها لتحقيق اهدافك."
          avatar="https://avatar.iran.liara.run/public/42"
        />
      </div>

      <footer className="chat-window__footer">
        <input type="text" placeholder="اكتب رسالتك هنا..." />
        <button>
          <i className="fa-solid fa-microphone"></i>
        </button>
        <button>
          <i className="fa-solid fa-paperclip-vertical"></i>
        </button>
        <button className="chat-window__footer--send">
          <i className="fa-solid fa-paper-plane"></i>
          <span >إرسال</span>
        </button>
      </footer>
    </div>
  );
};

export default ChatWindow;
