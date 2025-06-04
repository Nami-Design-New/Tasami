const ChatItem = ({ name, message, time, avatar }) => {
  return (
    <li className="chat-item">
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
