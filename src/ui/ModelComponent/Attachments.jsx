// // export default Attachments;
// import { useState, useRef } from "react";

// const getFileIcon = (filename) => {
//   const ext = filename.split(".").pop().toLowerCase();
//   switch (ext) {
//     case "pdf":
//       return <i className="fa-solid fa-file-pdf"></i>;
//     case "doc":
//     case "docx":
//       return <i className="fa-regular fa-file-word"></i>;
//     case "png":
//     case "jpg":
//     case "jpeg":
//     case "gif":
//       return <i className="fa-solid fa-image"></i>;
//     default:
//       return <i className="fa-regular fa-file"></i>;
//   }
// };

// const Attachments = () => {
//   const [attachments, setAttachments] = useState([
//     {
//       id: 1,
//       name: "Attachment Colf",
//       icon: <i className="fa-solid fa-paperclip-vertical"></i>,
//     },
//     {
//       id: 2,
//       name: "5-0000-1111-22.pdf",
//       icon: <i className="fa-solid fa-file-pdf"></i>,
//     },
//     {
//       id: 3,
//       name: "5-0000-1111-22.docx",
//       icon: <i className="fa-regular fa-file"></i>,
//     },
//     {
//       id: 4,
//       name: "5-0000-1111-22.png",
//       icon: <i className="fa-solid fa-image"></i>,
//     },
//   ]);

//   const fileInputRef = useRef();

//   const handleAddAttachment = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newAttachment = {
//         id: Date.now(),
//         name: file.name,
//         icon: getFileIcon(file.name),
//       };
//       setAttachments((prev) => [...prev, newAttachment]);
//     }
//   };

//   const handleRemoveAttachment = (id) => {
//     setAttachments((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="attachments">
//       <h4>المرفقات</h4>
//       <ul className="attachments__list">
//         {attachments.map((item) => (
//           <li key={item.id} className="attachments__item">
//             {item.icon}
//             <span className="attachments__name">{item.name}</span>
//             <button
//               className="attachments__remove"
//               onClick={() => handleRemoveAttachment(item.id)}
//               aria-label="Remove"
//             >
//               <i className="fa-solid fa-circle-xmark"></i>
//             </button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleAddAttachment}
//       />
//       <button
//         className="attachments__add"
//         onClick={() => fileInputRef.current.click()}
//       >
//         <i className="fa-solid fa-circle-plus"></i>
//         <span>اضف مرفق جديد</span>
//       </button>
//     </div>
//   );
// };

// export default Attachments;
import { useState, useRef } from "react";
import { Link } from "react-router";
import AttachmentsModal from "./AttachmentsModal";

const Attachments = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      date: "2025-05-25",
      time: "14:45 PM",
      name: "سلطان م",
      account: "E-2202023-000125",
      title: "شهادة تدريب",
      filename: "FFNFCertificate.pdf",
    },
  ]);

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("---- file-------");
    console.log(file);

    if (!file) return;

    const now = new Date();
    const newAttachment = {
      id: Date.now(),
      date: now.toISOString().split("T")[0],
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      name: "سلطان م",
      account: "E-2202023-000125",
      filename: file.name,
    };
    setAttachments((prev) => [...prev, newAttachment]);
    console.log(" added succussfully!");
  };

  const handleSave = () => {
    // if (!titleInput.trim()) return;
  };

  return (
    <>
      <div className="attachments-container ">
        <h4 className="attachments-title">المرفقات</h4>
        <div className="table-container table-responsive border">
          <table className="custom-table table table-bordered text-center align-middle mb-0  attachments-table">
            <thead className="table-light">
              <tr>
                <th>التاريخ</th>
                <th>الوقت</th>
                <th>الاسم</th>
                <th>رقم الحساب</th>
                {/* <th>العنوان</th> */}
                <th>الملف المرفق</th>
              </tr>
            </thead>
            <tbody>
              {attachments.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.name}</td>
                  <td>
                    <Link
                      to={`/dashboard/employee-details/${item.account}`}
                      className="link-styles"
                    >
                      {item.account}
                    </Link>
                  </td>
                  {/* <td>{item.title}</td> */}
                  <td>
                    {/* <Link to="/dashboard/emplo" className="file-link"> */}
                    {item.filename}
                    {/* </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div className="add-btn-container">
          <button
            className="add-attachment-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <i className="fa-solid fa-circle-plus"></i> إضافة مرفق
          </button>
        </div>
      </div>

      <AttachmentsModal
        showModal={showModal}
        setShowModal={setShowModal}
        titleInput={titleInput}
        setTitleInput={setTitleInput}
        handleSave={handleSave}
      />
    </>
  );
};

export default Attachments;
