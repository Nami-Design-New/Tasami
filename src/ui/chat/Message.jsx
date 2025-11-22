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
    const getFileName = (url) => {
      try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        return (
          pathname.substring(pathname.lastIndexOf("/") + 1) || "downloaded-file"
        );
      } catch (e) {
        return url.split("/").pop() || "downloaded-file";
      }
    };

    // Bind Fancybox with native download button support
    Fancybox.bind("[data-fancybox]", {
      Carousel: {
        Toolbar: {
          display: {
            left: ["infobar"],
            middle: [],
            right: [
              "zoom",
              "slideshow",
              "fullscreen",
              "download",
              "thumbs",
              "close",
            ],
          },
          items: {
            download: {
              tpl: '<button class="f-button" title="Download"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></button>',
              click: (event, carousel) => {
                const currentSlide = event.getSlides()[event.getPageIndex()];

                // Use the src attribute of the slide (which comes from the href attribute)
                const imageSrc = currentSlide.src;
                const fileName = getFileName(imageSrc);

                // Use the Fetch API to force a download dialog
                fetch(imageSrc)
                  .then((response) => response.blob())
                  .then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = fileName; // Force download with a specific filename
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url); // Clean up the object URL
                  })
                  .catch((err) => {
                    // Fallback if fetch fails (e.g., severe CORS issues)
                    console.warn(
                      "Fetch failed, using direct download fallback:",
                      err
                    );
                    const link = document.createElement("a");
                    link.href = imageSrc;
                    link.download = fileName; // Try the download attribute fallback
                    link.target = "_blank";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  });
              },
            },
          },
        },
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
              <a
                data-fancybox="chat-gallery"
                className="rouded-3"
                href={filePath}
                // data-download-src={filePath}
              >
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
