const ChatItem = ({ chat, onChatSelect, activeChat }) => {
  const { name, message, time, avatar } = chat;
  return (
    <li
      key={chat.id}
      className={`chat-item ${activeChat?.id === chat.id ? "active" : ""}`}
      onClick={() => onChatSelect(chat)}
    >
      <img className="chat-item__avatar" src={avatar} alt={name} />
      <div className="chat-item__info">
        <div className="d-flex align-items-center  justify-content-between">
          <span className="chat-item__name">{name} </span>
          <span className="chat-item__time">
            <i className="fa-light fa-timer"></i>
            {time}
          </span>
        </div>
        <span className="chat-item__last-message">{message}</span>
      </div>
    </li>
  );
};

export default ChatItem;
