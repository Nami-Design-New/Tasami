// export default Message;
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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

  // --------------------------
  // Fancybox Initialization WITH DOWNLOAD BUTTON
  // --------------------------
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      Toolbar: {
        display: [
          { id: "counter", position: "center" },
          "zoom",
          "slideshow",
          "fullscreen",
          "download",
          "thumbs",
          "close",
        ],
      },
    });

    return () => Fancybox.destroy();
  }, []);

  const isContractChat = pathname.includes("user-chat");

  const isSender = from === "sender";

  const baseClass = isSender ? "message--sender" : "message--receiver";

  let colorClass = "";

  if (isContractChat) {
    colorClass = isSender ? "message--gray" : "message--main";
  } else {
    if (isSender) {
      colorClass = sender?.id === creatorId ? "message--main" : "message--gray";
    } else {
      colorClass =
        sender?.id === creatorId ? "message--main" : "message--second";
    }
  }

  const messageClass = `message ${baseClass} ${colorClass}`;

  // --------------------------
  // 🔥 Content Renderer
  // --------------------------
  const renderMessageContent = () => {
    switch (type) {
      case "text":
        return <div className="message__text">{text}</div>;

      // --------------------------
      // 🔥 IMAGE WITH FANCYBOX
      // --------------------------
      case "image":
        return (
          <div className="message__content-wrapper">
            <div className="message__image-container p-2">
              {/* Wrap image with Fancybox */}
              <a data-fancybox="chat-gallery rounded-3" href={filePath}>
                <img
                  src={filePath}
                  alt="Shared"
                  className={`message__image rounded-3  ${
                    imageLoaded ? "loaded" : ""
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
          </div>
        );

      // --------------------------
      // 🔥 VIDEO
      // --------------------------
      case "video":
        return (
          <div className="message__content-wrapper">
            <div className="message__video-container p-2">
              {!videoLoaded && (
                <div className="message__video-loading shimmer">
                  <span>جارٍ تحميل الفيديو...</span>
                </div>
              )}
              <video
                src={filePath}
                controls
                className={`message__video rounded-3 ${
                  videoLoaded ? "loaded" : ""
                }`}
                onLoadedData={() => setVideoLoaded(true)}
                onCanPlayThrough={() => setVideoLoaded(true)}
                onError={(e) => console.error(" Video failed to load", e)}
              />
            </div>
          </div>
        );

      // --------------------------
      // 🔥 AUDIO
      // --------------------------
      case "audio":
        return (
          <div className="message__content-wrapper">
            {text && <div className="message__text mb-2">{text}</div>}
            <audio
              src={filePath}
              controls
              className="message__audio p-2 rounded-pill "
            />
          </div>
        );

      default:
        return <div className="message__text">{text}</div>;
    }
  };

  // --------------------------
  // 🔥 Component Return
  // --------------------------
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
