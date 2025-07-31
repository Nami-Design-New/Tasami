import { Modal } from "react-bootstrap";

export default function ViewMemberModal({ member, onClose }) {
  if (!member) return null;

  return (
    <Modal
      show={!!member}
      onHide={onClose}
      centered
      size="md"
      className="member-modal"
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">{member.name} </h5>
      </Modal.Header>
      <Modal.Body>
          <div className="info-grid">
          <div className="info-box">
            <div className="label">المجال </div>
            <div className="value">{member.type} </div>
          </div>
            <div className="info-box">
            <div className="label"> التخصص</div>
            <div className="value">{member.section} </div>
          </div>
          <div className="info-box">
            <div className="label">الهدف</div>
            <div className="value">{member.description}</div>
          </div>
        </div>
      
      </Modal.Body>
    </Modal>
  );
}
