import { Modal } from "react-bootstrap";

export default function EncounterDetailsModal({ show, setShow, encounter }) {
    if (!encounter) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ الرابط!");
    };

    return (
        <Modal
            show={show}
            size="lg"
            onHide={() => setShow(false)}
            centered
            className="encounter-modal"
        >
            <Modal.Header closeButton className="m-2">
                <h5 className="fw-bold">{encounter.title}</h5>
            </Modal.Header>

            <Modal.Body>
                <p className="desc">{encounter.desc}</p>

                <div className="info-grid mt-3">
                    <div>
                        <strong>المجال:</strong>
                        <span>{encounter.field }</span>
                    </div>
                    <div>
                        <strong>التخصص:</strong>
                        <span>{encounter.specialty }</span>
                    </div>
                    <div>
                        <strong>رابط اللقاء:</strong>
                      <span className="url">{encounter.url}</span>
                        <button onClick={handleCopy} className="copy-btn">
                            <i className="fa-light fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div className="meta">
                    <span><i className="fa-light fa-calendar-days"></i> {encounter.date}</span>
                    <span><i className="fa-light fa-clock"></i> {encounter.time}</span>
                    <span><i className="fa-solid fa-rotate-left"></i> {encounter.duration}</span>
                </div>
            </Modal.Body>
        </Modal>
    );
}
