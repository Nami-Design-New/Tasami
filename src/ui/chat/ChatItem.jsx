import { useSearchParams } from "react-router";

const ChatItem = ({ chat, onChatSelect, activeChat }) => {
  const {
    chater: { name, image },
    last_message,
  } = chat;
  console.log(activeChat);

  return (
    <li
      key={chat.id}
      className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
      onClick={() => onChatSelect(chat)}
    >
      <img className="chat-item__avatar" src={image} alt={name} />
      <div className="chat-item__info">
        <div className="d-flex align-items-center  justify-content-between">
          <span className="chat-item__name">{name} </span>
          <span className="chat-item__time">
            <i className="fa-light fa-timer"></i>
            {last_message?.from_date}
          </span>
        </div>
        <span className="chat-item__last-message">{last_message?.message}</span>
      </div>
    </li>
  );
};

export default ChatItem;
