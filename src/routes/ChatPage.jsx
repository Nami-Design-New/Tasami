import { useState } from "react";
import ChatSidebar from "../ui/chat/ChatSidebar";
import ChatWindow from "../ui/chat/ChatWindow";
import { useSearchParams } from "react-router";
const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const [activeChat, setActiveChat] = useState(Number(chatId));
  const [activeUser, setActiveUser] = useState(null);

  const handleChatSelect = (chat) => {
    setActiveChat(chat?.id);
    setActiveUser(chat);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("chatId", chat?.id);
      return newParams;
    });
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
        activeUser={activeUser}
      />
    </div>
  );
};

export default ChatPage;
