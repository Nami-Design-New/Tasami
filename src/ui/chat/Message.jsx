// export default Message;
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Message = ({
  sender,
  creatorId,
  time = null,
  filePath,
  type = "text",
  from,
  text,
  avatar,
  onReply,
  replyTo,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state?.language);
  // --------------------------
  // Helper Functions
  // --------------------------
  const getFileName = (url) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.substring(pathname.lastIndexOf("/") + 1) || "file";
    } catch (e) {
      return url.split("/").pop() || "file";
    }
  };

  const getFileExtension = (filename) => {
    if (!filename) return "";
    return filename.split(".").pop().toLowerCase();
  };

  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);

    const iconMap = {
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      xls: "📊",
      xlsx: "📊",
      ppt: "📊",
      pptx: "📊",
      zip: "🗜️",
      rar: "🗜️",
      txt: "📃",
      csv: "📊",
    };

    return iconMap[ext] || "📎";
  };

  const handleFileDownload = (e) => {
    e.preventDefault();
    const name = getFileName(filePath);

    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.warn("Download failed:", err);
        const link = document.createElement("a");
        link.href = filePath;
        link.download = name;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

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
                      err,
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
  //  Content Renderer
  // --------------------------
  const renderMessageContent = () => {
    switch (type) {
      case "text":
        return <div className="message__text">{text}</div>;

      // --------------------------
      //  IMAGE WITH FANCYBOX
      // --------------------------
      case "image":
        return (
          <div className="message__content-wrapper">
            <div className="message__image-container p-2">
              {" "}
              {!imageLoaded && (
                <div className="message__image-loading shimmer">
                  <span> {t("loadingImage")}</span>
                </div>
              )}
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
      //  VIDEO
      // --------------------------
      case "video":
        return (
          <div className="message__content-wrapper">
            <div className="message__video-container p-2">
              {!videoLoaded && (
                <div className="message__video-loading shimmer">
                  <span> {t("loadingVideo")}</span>
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
      //  AUDIO
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
      // --------------------------
      // FILE (PDF, DOC, etc.)
      // --------------------------
      case "file":
        const displayFileName = getFileName(filePath);
        const fileIcon = getFileIcon(displayFileName);

        return (
          <div className="message__content-wrapper">
            {text && <div className="message__text mb-2">{text}</div>}
            <div
              className="message__file-container p-3 rounded-3 d-flex align-items-center gap-3"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={handleFileDownload}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
              }}
            >
              <div className="message__file-icon" style={{ fontSize: "2rem" }}>
                {fileIcon}
              </div>
              <div className="message__file-info flex-grow-1">
                <div
                  className="message__file-name fw-semibold text-truncate"
                  style={{ maxWidth: "200px" }}
                  title={displayFileName}
                >
                  {displayFileName}
                </div>
                <div
                  className="message__file-action color-main small"
                  style={{ fontSize: "0.85rem" }}
                >
                  {t("download")}
                </div>
              </div>
              <div className="message__download-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12" />
                </svg>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="message__text">{text}</div>;
    }
  };

  // --------------------------
  // Parent message (small / muted)
  // --------------------------
  const renderParent = () => {
    if (!replyTo) return null;

    switch (replyTo.type) {
      case "text":
        return <div className="reply-parent__text">{replyTo.message}</div>;

      case "image":
        return (
          <div className="reply-parent__media">
            <img src={replyTo.file_path} alt="" />
          </div>
        );

      case "video":
        return (
          <div className="reply-parent__media vedio">
            <video src={replyTo.file_path} />
            <span className="icon-wrapper">
              <i className="fa-regular fa-play"></i>
            </span>
          </div>
        );

      case "audio":
        return (
          <div className="reply-parent__file">🎧 {t("reply.attachment")}</div>
        );

      case "file":
        return (
          <div className="reply-parent__file">
            📎 {getFileName(replyTo.file_path)}
          </div>
        );

      default:
        return null;
    }
  };

  // --------------------------
  //  Component Return
  // --------------------------
  return (
    <div className={messageClass}>
      <img
        src={avatar}
        alt={sender?.name || "User"}
        className="message__avatar"
      />

      <div className="message__content">
        <div className="parent-wrapper">
          {replyTo && (
            <div
              className="reply-parent"
              style={
                isSender
                  ? { [lang === "en" ? "marginLeft" : "marginRight"]: "auto" }
                  : null
              }
            >
              {renderParent()}
            </div>
          )}
          <div
            style={
              replyTo
                ? { marginTop: "-20px", zIndex: "12", position: "relative" }
                : null
            }
            className={`d-flex gap-2  ${isSender ? "flex-row-reverse" : ""} `}
          >
            {renderMessageContent()}
            <i className="fa-solid fa-reply" onClick={onReply}></i>
          </div>
        </div>
        {time && <div className="message__time">{time}</div>}
      </div>
    </div>
  );
};

export default Message;
