import { useSearchParams } from "react-router";
import ChatList from "./ChatList";
import { useTranslation } from "react-i18next";

const ChatSidebar = ({ isOpen, onClose, onChatSelect, activeChat }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  return (
    <aside className={`chat-sidebar ${isOpen || !chatId ? "chat-sidebar--open" : ""}`}>
      <div className="chat-sidebar__header">
        <img />
        <h3></h3>
      </div>
      <div className="chat-sidebar__search">
        <input type="text" placeholder="بحث..." />
      </div>
      <div className="chat-sidebar__section">
        <h4 className="chat-sidebar__section-title">
          {t("dashboard.chats.chats")}
        </h4>
        <ChatList onChatSelect={onChatSelect} activeChat={activeChat} />
      </div>
      <button className="chat-sidebar__close" onClick={onClose}>
        ×
      </button>
    </aside>
  );
};

export default ChatSidebar;
