const QuickActionsCard = () => {
  return (
    <div className="quick-actions">
      <h4 className="quick-actions__title"> اجراءت سريعه </h4>
      <ul className="quick-actions__list">
        <li className="quick-actions__item">
          <i className="fa-solid fa-key"></i>
          <span> تغيير كلمه المرور </span>
        </li>
        <li className="quick-actions__item">
          <i className="fa-solid fa-file-export"></i>
          <span> تصدير بيانات الملف الشخصي </span>
        </li>
      </ul>
    </div>
  );
};

export default QuickActionsCard;
