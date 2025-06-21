import { useState } from "react";
import PasswordChangeModal from "../../modals/PasswordChangeModal";
import CustomButton from "../../CustomButton";

const QuickActionsCard = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  return (
    <div className="quick-actions">
      <h4 className="quick-actions__title"> اجراءت سريعه </h4>
      <ul className="quick-actions__list">
        <li className="quick-actions__item">
          <CustomButton
            size="large"
            fullWidth
            icon={<i className="fa-solid fa-key"></i>}
            onClick={() => setShowChangePasswordModal(true)}
          >
            تغيير كلمه المرور
          </CustomButton>
        </li>

        <PasswordChangeModal
          showModal={showChangePasswordModal}
          setShowModal={setShowChangePasswordModal}
        />
      </ul>
    </div>
  );
};

export default QuickActionsCard;
