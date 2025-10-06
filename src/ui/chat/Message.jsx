// export default Message;
import { useState } from "react";

const Message = ({
  message,
  sender,
  creatorId,
  time = null,
  isCurrentUser = false,
  type = "text",
  from,
  text,
  avatar,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const displayText = message || text;
  const displayAvatar = sender?.image || avatar;

  const isSender = from === "sender";

  const baseClass = isSender ? "message--sender" : "message--receiver";

  let colorClass = "";
  if (isSender) {
    colorClass = sender?.id === creatorId ? "message--main" : "message--second";
  } else {
    colorClass = sender?.id === creatorId ? "message--main" : "message--gray";
  }

  const messageClass = `message ${baseClass} ${colorClass}`;

  const renderMessageContent = () => {
    switch (type) {
      case "text":
        return <div className="message__text">{displayText}</div>;

      case "image":
      case "text_with_image":
        return (
          <div className="message__content-wrapper">
            {type === "text_with_image" && displayText && (
              <div className="message__text mb-2">{displayText}</div>
            )}
            <div className="message__image-container">
              {!imageLoaded && (
                <div className="message__image-loading">Loading image...</div>
              )}
              <img
                src={sender?.file_path}
                alt="Shared image"
                className="message__image"
                style={{ display: imageLoaded ? "block" : "none" }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        );

      case "video":
      case "text_with_video":
        return (
          <div className="message__content-wrapper">
            {type === "text_with_video" && displayText && (
              <div className="message__text mb-2">{displayText}</div>
            )}
            <div className="message__video-container">
              {!videoLoaded && (
                <div className="message__video-loading">Loading video...</div>
              )}
              <video
                src={sender?.file_path}
                controls
                className="message__video"
                style={{ display: videoLoaded ? "block" : "none" }}
                onLoadedData={() => setVideoLoaded(true)}
              />
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="message__content-wrapper">
            {displayText && (
              <div className="message__text mb-2">{displayText}</div>
            )}
            <audio
              src={sender?.file_path}
              controls
              className="message__audio"
            />
          </div>
        );

      case "file":
      case "text_with_file":
        return (
          <div className="message__content-wrapper">
            {type === "text_with_file" && displayText && (
              <div className="message__text mb-2">{displayText}</div>
            )}
            <div className="message__file">
              <a
                href={sender?.file_path}
                target="_blank"
                rel="noopener noreferrer"
                className="message__file-link"
              >
                <i className="fas fa-file-download me-2"></i>
                Download File
              </a>
            </div>
          </div>
        );

      default:
        return <div className="message__text">{displayText}</div>;
    }
  };

  return (
    <div className={messageClass}>
      {!isSender && displayAvatar && (
        <img
          src={displayAvatar || sender?.image?.replace(/`/g, "").trim()}
          alt={sender?.name || "User"}
          className="message__avatar"
        />
      )}

      <div className="message__content">
        {renderMessageContent()}
        {time && <div className="message__time">{time}</div>}
      </div>
    </div>
  );
};

export default Message;
