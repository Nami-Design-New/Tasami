import GlobalModal from "../../GlobalModal";

export default function ToastSuccessModal({
  showModal,
  setShowModal,
  title,
  children,
}) {
  return (
    <GlobalModal
      show={showModal}
      size="md"
      centered
      onHide={() => setShowModal(false)}
    >
      <GlobalModal.Header closeButton>
        <h6>{title}</h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
        <div className="p-2">{children}</div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
