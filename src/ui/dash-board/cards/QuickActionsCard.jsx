import { useState } from "react";
import PasswordChangeModal from "../../modals/PasswordChangeModal";

const QuickActionsCard = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  return (
    <div className="quick-actions">
      <h4 className="quick-actions__title"> اجراءت سريعه </h4>
      <ul className="quick-actions__list">
        <li className="quick-actions__item">
          <button onClick={() => setShowChangePasswordModal(true)}>
            <i className="fa-solid fa-key"></i>
            <span> تغيير كلمه المرور </span>
          </button>
        </li>
        {/* <li className="quick-actions__item">
          <i className="fa-solid fa-file-export"></i>
          <span> تصدير بيانات الملف الشخصي </span>
        </li> */}
        <PasswordChangeModal
          showModal={showChangePasswordModal}
          setShowModal={setShowChangePasswordModal}
        />
      </ul>
    </div>
  );
};

export default QuickActionsCard;
