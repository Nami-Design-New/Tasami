import { Modal } from "react-bootstrap";

const GlobalModal = ({ children, ...props }) => {
  return (
    <Modal
      {...props}
      // These props override any accidental local settings
      backdrop="static"
      keyboard={false}
    >
      {children}
    </Modal>
  );
};

// Map sub-components so you can use GlobalModal.Header, etc.
GlobalModal.Header = Modal.Header;
GlobalModal.Title = Modal.Title;
GlobalModal.Body = Modal.Body;
GlobalModal.Footer = Modal.Footer;

export default GlobalModal;
