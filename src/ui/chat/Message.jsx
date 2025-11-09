import { useState } from "react";
import { useLocation } from "react-router";

const Message = ({
  sender,
  creatorId,
  time = null,
  filePath,
  type = "text",
  from,
  text,
  avatar,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { pathname } = useLocation();

  const isContractChat = pathname.includes("user-chat");

  const isSender = from === "sender";

  const baseClass = isSender ? "message--sender" : "message--receiver";

  let colorClass = "";

  if (isContractChat) {
    colorClass = isSender ? "message--main" : "message--gray";
  } else {
    if (isSender) {
      colorClass =
        sender?.id === creatorId ? "message--main" : "message--second";
    } else {
      colorClass = sender?.id === creatorId ? "message--main" : "message--gray";
    }
  }

  const messageClass = `message ${baseClass} ${colorClass}`;

  console.log(filePath);

  const renderMessageContent = () => {
    switch (type) {
      case "text":
        return <div className="message__text">{text}</div>;

      case "image":
        return (
          <div className="message__content-wrapper">
            <div className="message__image-container">
              {/* {!imageLoaded && (
                <div className="message__image-loading shimmer">
                  <span>جارٍ تحميل الصورة...</span>
                </div>
              )} */}
              <img
                src={filePath}
                alt="Shared image"
                className={`message__image ${imageLoaded ? "loaded" : ""}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        );

      case "video":
        return (
          <div className="message__content-wrapper">
            <div className="message__video-container">
              {!videoLoaded && (
                <div className="message__video-loading shimmer">
                  <span>جارٍ تحميل الفيديو...</span>
                </div>
              )}
              <video
                src={filePath}
                controls
                className={`message__video ${videoLoaded ? "loaded" : ""}`}
                onLoadedData={() => {
                  setVideoLoaded(true);
                }}
                onCanPlayThrough={() => {
                  console.log("🎬 Video fully ready to play");
                  setVideoLoaded(true);
                }}
                onError={(e) => console.error("❌ Video failed to load", e)}
              />
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="message__content-wrapper">
            {text && <div className="message__text mb-2">{text}</div>}
            <audio src={filePath} controls className="message__audio" />
          </div>
        );

      default:
        return <div className="message__text">{text}</div>;
    }
  };

  return (
    <div className={messageClass}>
      <img
        src={avatar}
        alt={sender?.name || "User"}
        className="message__avatar"
      />

      <div className="message__content">
        {renderMessageContent()}
        {time && <div className="message__time">{time}</div>}
      </div>
    </div>
  );
};

export default Message;
