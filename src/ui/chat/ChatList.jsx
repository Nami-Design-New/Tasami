import ChatItem from "./ChatItem";

const chats = [
  {
    id: 1,
    name: "وليد رابح",
    message: "أوصي أصدقاءك. احصل على المكافآت.",
    time: "منذ 5 دقائق",
    avatar: "https://avatar.iran.liara.run/public/42",
  },
  {
    id: 2,
    name: "محمود عباس",
    message: "أرسل لي صورة من الصور.",
    time: "الآن",
    avatar: "https://avatar.iran.liara.run/public/1",
  },
];

const ChatList = () => {
  return (
    <ul className="chat-list">
      {chats.map((chat) => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </ul>
  );
};

export default ChatList;
