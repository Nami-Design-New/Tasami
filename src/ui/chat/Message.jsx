const Message = ({ from, text, time, avatar }) => {
  return (
    <>
      <div className={`message message--${from}`}>
        {avatar && (
          <img src={avatar} alt="avatar" className="message__avatar" />
        )}
        <div className="message__content">
          <div className="message__text ">{text}</div>
          {time && <div className="message__time">{time}</div>}
        </div>
      </div>
    </>
  );
};

export default Message;
