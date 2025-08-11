import { Modal } from "react-bootstrap";
import { useState } from "react";
import CustomButton from "../CustomButton";
import { Link } from "react-router";

const AssistantModal = ({ showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false);

  return (
    <Modal
      show={showModal}
      size="md"
      onHide={handleClose}
      centered
      className="assistant-modal"
    >
      <Modal.Header closeButton className="m-2">
        <h5>انشاء حساب مساعد شخصي اساسي - مجاني </h5>
      </Modal.Header>

      <Modal.Body>
        <div className="text-center">
          <p className="title">اهلاً بك مجتمع الملهمين في "تسامي"</p>
          <p className="sub-title">
            يتيح لك حساب المساعد الشخصي نشر برامج المساعده وتقديم العروض للاخرينز كما يمكنك انشاء مجموعات العمل كمساحات افتراضيه للتعلم الاجتماعي .بالاضافه الي تفعيل قنواتك الخاصة لنشر المحتوي الحصري واستقبال اشتراكات العضوية ضمن مجتمع المساعد الشخصي !
          </p>
          <Link to="/personal-assistant-platform">
          <CustomButton size="medium" color="primary">
            الموافقة والاستمرار
          </CustomButton>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssistantModal;
