import ChatSidebar from "../ui/chat/ChatSidebar";
import ChatWindow from "../ui/chat/ChatWindow";
import "../assets/styles/chats.css";
import { useState } from "react";
const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="chat-page">
      <button
        className="chat-page__toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
