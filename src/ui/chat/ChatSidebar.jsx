import ChatList from "./ChatList";

const ChatSidebar = ({ isOpen, onClose, onChatSelect, activeChat }) => {
  return (
    <aside className={`chat-sidebar ${isOpen ? "chat-sidebar--open" : ""}`}>
      <div className="chat-sidebar__header">
        <img />
        <h3></h3>
      </div>
      <div className="chat-sidebar__search">
        <input type="text" placeholder="بحث..." />
      </div>
      <div className="chat-sidebar__section">
        <h4 className="chat-sidebar__section-title">المحادثات</h4>
        <ChatList onChatSelect={onChatSelect} activeChat={activeChat} />
      </div>
      <button className="chat-sidebar__close" onClick={onClose}>
        ×
      </button>
    </aside>
  );
};

export default ChatSidebar;
