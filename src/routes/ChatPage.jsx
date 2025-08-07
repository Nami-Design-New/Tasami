import ChatSidebar from "../ui/chat/ChatSidebar";
import ChatWindow from "../ui/chat/ChatWindow";
import { useState } from "react";
const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    setSidebarOpen(false);
  };

  return (
    <div className="chat-page">
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onChatSelect={handleChatSelect}
        activeChat={activeChat}
      />
      <ChatWindow
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activeChat={activeChat}
      />
    </div>
  );
};

export default ChatPage;
