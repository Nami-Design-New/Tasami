// export default Attachments;
import { useState, useRef } from "react";

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  switch (ext) {
    case "pdf":
      return <i className="fa-solid fa-file-pdf"></i>;
    case "doc":
    case "docx":
      return <i className="fa-regular fa-file-word"></i>;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return <i className="fa-solid fa-image"></i>;
    default:
      return <i className="fa-regular fa-file"></i>;
  }
};

const Attachments = () => {
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      name: "Attachment Colf",
      icon: <i className="fa-solid fa-paperclip-vertical"></i>,
    },
    {
      id: 2,
      name: "5-0000-1111-22.pdf",
      icon: <i className="fa-solid fa-file-pdf"></i>,
    },
    {
      id: 3,
      name: "5-0000-1111-22.docx",
      icon: <i className="fa-regular fa-file"></i>,
    },
    {
      id: 4,
      name: "5-0000-1111-22.png",
      icon: <i className="fa-solid fa-image"></i>,
    },
  ]);

  const fileInputRef = useRef();

  const handleAddAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAttachment = {
        id: Date.now(),
        name: file.name,
        icon: getFileIcon(file.name),
      };
      setAttachments((prev) => [...prev, newAttachment]);
    }
  };

  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="attachments">
      <h4>المرفقات</h4>
      <ul className="attachments__list">
        {attachments.map((item) => (
          <li key={item.id} className="attachments__item">
            {item.icon}
            <span className="attachments__name">{item.name}</span>
            <button
              className="attachments__remove"
              onClick={() => handleRemoveAttachment(item.id)}
              aria-label="Remove"
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </li>
        ))}
      </ul>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleAddAttachment}
      />
      <button
        className="attachments__add"
        onClick={() => fileInputRef.current.click()}
      >
        <i className="fa-solid fa-circle-plus"></i>
        <span>اضف مرفق جديد</span>
      </button>
    </div>
  );
};

export default Attachments;
