// // export default Message;
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router";

// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

// const Message = ({
//   sender,
//   creatorId,
//   time = null,
//   filePath,
//   type = "text",
//   from,
//   text,
//   avatar,
// }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const { pathname } = useLocation();

//   // --------------------------
//   // Fancybox Initialization WITH DOWNLOAD BUTTON
//   // --------------------------
//   useEffect(() => {
//     const getFileName = (url) => {
//       try {
//         const urlObj = new URL(url);
//         const pathname = urlObj.pathname;
//         return (
//           pathname.substring(pathname.lastIndexOf("/") + 1) || "downloaded-file"
//         );
//       } catch (e) {
//         return url.split("/").pop() || "downloaded-file";
//       }
//     };

//     // Bind Fancybox with native download button support
//     Fancybox.bind("[data-fancybox]", {
//       Carousel: {
//         Toolbar: {
//           display: {
//             left: ["infobar"],
//             middle: [],
//             right: [
//               "zoom",
//               "slideshow",
//               "fullscreen",
//               "download",
//               "thumbs",
//               "close",
//             ],
//           },
//           items: {
//             download: {
//               tpl: '<button class="f-button" title="Download"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></button>',
//               click: (event, carousel) => {
//                 const currentSlide = event.getSlides()[event.getPageIndex()];

//                 // Use the src attribute of the slide (which comes from the href attribute)
//                 const imageSrc = currentSlide.src;
//                 const fileName = getFileName(imageSrc);

//                 // Use the Fetch API to force a download dialog
//                 fetch(imageSrc)
//                   .then((response) => response.blob())
//                   .then((blob) => {
//                     const url = window.URL.createObjectURL(blob);
//                     const link = document.createElement("a");
//                     link.href = url;
//                     link.download = fileName; // Force download with a specific filename
//                     document.body.appendChild(link);
//                     link.click();
//                     document.body.removeChild(link);
//                     window.URL.revokeObjectURL(url); // Clean up the object URL
//                   })
//                   .catch((err) => {
//                     // Fallback if fetch fails (e.g., severe CORS issues)
//                     console.warn(
//                       "Fetch failed, using direct download fallback:",
//                       err
//                     );
//                     const link = document.createElement("a");
//                     link.href = imageSrc;
//                     link.download = fileName; // Try the download attribute fallback
//                     link.target = "_blank";
//                     document.body.appendChild(link);
//                     link.click();
//                     document.body.removeChild(link);
//                   });
//               },
//             },
//           },
//         },
//       },
//     });

//     return () => Fancybox.destroy();
//   }, []);

//   const isContractChat = pathname.includes("user-chat");

//   const isSender = from === "sender";

//   const baseClass = isSender ? "message--sender" : "message--receiver";

//   let colorClass = "";

//   if (isContractChat) {
//     colorClass = isSender ? "message--gray" : "message--main";
//   } else {
//     if (isSender) {
//       colorClass = sender?.id === creatorId ? "message--main" : "message--gray";
//     } else {
//       colorClass =
//         sender?.id === creatorId ? "message--main" : "message--second";
//     }
//   }

//   const messageClass = `message ${baseClass} ${colorClass}`;

//   // --------------------------
//   //  Content Renderer
//   // --------------------------
//   const renderMessageContent = () => {
//     switch (type) {
//       case "text":
//         return <div className="message__text">{text}</div>;

//       // --------------------------
//       //  IMAGE WITH FANCYBOX
//       // --------------------------
//       case "image":
//         return (
//           <div className="message__content-wrapper">
//             <div className="message__image-container p-2">
//               {/* Wrap image with Fancybox */}
//               <a
//                 data-fancybox="chat-gallery"
//                 className="rouded-3"
//                 href={filePath}
//                 // data-download-src={filePath}
//               >
//                 <img
//                   src={filePath}
//                   alt="Shared"
//                   className={`message__image rounded-3  ${
//                     imageLoaded ? "loaded" : ""
//                   }`}
//                   onLoad={() => setImageLoaded(true)}
//                   style={{ cursor: "pointer" }}
//                 />
//               </a>
//             </div>
//           </div>
//         );

//       // --------------------------
//       //  VIDEO
//       // --------------------------
//       case "video":
//         return (
//           <div className="message__content-wrapper">
//             <div className="message__video-container p-2">
//               {!videoLoaded && (
//                 <div className="message__video-loading shimmer">
//                   <span>جارٍ تحميل الفيديو...</span>
//                 </div>
//               )}
//               <video
//                 src={filePath}
//                 controls
//                 className={`message__video rounded-3 ${
//                   videoLoaded ? "loaded" : ""
//                 }`}
//                 onLoadedData={() => setVideoLoaded(true)}
//                 onCanPlayThrough={() => setVideoLoaded(true)}
//                 onError={(e) => console.error(" Video failed to load", e)}
//               />
//             </div>
//           </div>
//         );

//       // --------------------------
//       // AUDIO
//       // --------------------------
//       case "audio":
//         return (
//           <div className="message__content-wrapper">
//             {text && <div className="message__text mb-2">{text}</div>}
//             <audio
//               src={filePath}
//               controls
//               className="message__audio p-2 rounded-pill "
//             />
//           </div>
//         );

//       default:
//         return <div className="message__text">{text}</div>;
//     }
//   };

//   // --------------------------
//   //  Component Return
//   // --------------------------
//   return (
//     <div className={messageClass}>
//       <img
//         src={avatar}
//         alt={sender?.name || "User"}
//         className="message__avatar"
//       />

//       <div className="message__content">
//         {renderMessageContent()}
//         {time && <div className="message__time">{time}</div>}
//       </div>
//     </div>
//   );
// };

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
  fileName = null,
  fileSize = null,
  isUploading = false,
  uploadProgress = 0,
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

  // --------------------------
  // Helper: Get File Extension
  // --------------------------
  const getFileExtension = (filename) => {
    if (!filename) return "";
    return filename.split(".").pop().toLowerCase();
  };

  // --------------------------
  // Helper: Get File Icon
  // --------------------------
  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);

    // PDF
    if (ext === "pdf") {
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14 2 14 8 20 8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="7" y="17" fontSize="6" fill="currentColor" fontWeight="bold">
            PDF
          </text>
        </svg>
      );
    }

    // Excel
    if (["xlsx", "xls", "csv"].includes(ext)) {
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14 2 14 8 20 8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="9" y1="15" x2="15" y2="15" strokeWidth="2" />
          <line x1="9" y1="11" x2="15" y2="11" strokeWidth="2" />
          <line x1="9" y1="19" x2="15" y2="19" strokeWidth="2" />
        </svg>
      );
    }

    // Word
    if (["doc", "docx"].includes(ext)) {
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14 2 14 8 20 8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="16" y1="13" x2="8" y2="13" strokeWidth="2" />
          <line x1="16" y1="17" x2="8" y2="17" strokeWidth="2" />
          <line x1="10" y1="9" x2="8" y2="9" strokeWidth="2" />
        </svg>
      );
    }

    // PowerPoint
    if (["ppt", "pptx"].includes(ext)) {
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14 2 14 8 20 8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="8" y="12" width="8" height="6" strokeWidth="2" />
        </svg>
      );
    }

    // Text files
    if (["txt", "log"].includes(ext)) {
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14 2 14 8 20 8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="16" y1="13" x2="8" y2="13" strokeWidth="2" />
          <line x1="16" y1="17" x2="8" y2="17" strokeWidth="2" />
        </svg>
      );
    }

    // Archive files
    if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) {
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14 2 14 8 20 8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 11v6m-3-3l3 3 3-3" strokeWidth="2" />
        </svg>
      );
    }

    // Default file icon
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="14 2 14 8 20 8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // --------------------------
  // Helper: Format File Size
  // --------------------------
  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // --------------------------
  // Helper: Handle File Download
  // --------------------------
  const handleFileDownload = (url, name) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = name || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.warn("Download failed, using fallback:", err);
        const link = document.createElement("a");
        link.href = url;
        link.download = name || "download";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

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
              {/* Wrap image with Fancybox */}
              <a
                data-fancybox="chat-gallery"
                className="rouded-3"
                href={filePath}
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
      //  FILE (PDF, Excel, Word, etc.)
      // --------------------------
      case "file":
      case "document":
        return (
          <div className="message__content-wrapper">
            {text && <div className="message__text mb-2">{text}</div>}

            <div
              className="message__file-container p-3 rounded-3"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                minWidth: "250px",
                maxWidth: "350px",
              }}
            >
              {isUploading ? (
                // Upload progress
                <div className="message__file-uploading">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div
                      className="message__file-icon"
                      style={{ color: "#666" }}
                    >
                      {getFileIcon(fileName)}
                    </div>
                    <div className="flex-grow-1">
                      <div
                        className="message__file-name fw-semibold text-truncate"
                        style={{ fontSize: "14px" }}
                      >
                        {fileName || "Uploading..."}
                      </div>
                      <div
                        className="message__file-size text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        {uploadProgress}% uploaded
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="progress" style={{ height: "4px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${uploadProgress}%`,
                        backgroundColor: "#5fcafa",
                      }}
                      aria-valuenow={uploadProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              ) : (
                // File preview with download
                <div
                  className="message__file-preview d-flex align-items-center gap-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFileDownload(filePath, fileName)}
                >
                  <div
                    className="message__file-icon"
                    style={{ color: "#5fcafa" }}
                  >
                    {getFileIcon(fileName)}
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <div
                      className="message__file-name fw-semibold text-truncate"
                      style={{ fontSize: "14px" }}
                    >
                      {fileName || "File"}
                    </div>
                    <div
                      className="message__file-size text-muted"
                      style={{ fontSize: "12px" }}
                    >
                      {fileSize ? formatFileSize(fileSize) : ""}
                    </div>
                  </div>
                  <div className="message__file-download">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div className="message__text">{text}</div>;
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
        {renderMessageContent()}
        {time && <div className="message__time">{time}</div>}
      </div>
    </div>
  );
};

export default Message;
