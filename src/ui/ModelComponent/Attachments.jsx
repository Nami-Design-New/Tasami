const attachments = [
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
];

const Attachments = () => (
  <div className="attachments">
    <h4>المرفقات</h4>
    <ul className="attachments__list">
      {attachments.map((item) => (
        <li key={item.id} className="attachments__item">
          {item.icon}
          <span className="attachments__name">{item.name}</span>
        </li>
      ))}
    </ul>
    <button className="attachments__add">
      <i className="fa-solid fa-circle-plus"></i>
      <span>اضف مرفق جديد</span>
    </button>
  </div>
);

export default Attachments;
