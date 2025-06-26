import { Modal } from "react-bootstrap";
import { useState } from "react";
import RadioInput from "../forms/RadioInput";
import TextField from "../../ui/forms/TextField";
import SubmitButton from "../forms/SubmitButton";

const ReportModal = ({ showModal, setShowModal }) => {
    const [selectedReason, setSelectedReason] = useState("");

    const handleReasonChange = (e) => {
        setSelectedReason(e.target.value);
    };

    const reports = [
        "معلومات الزائفة، أو الموضوعات والوسائط المحظورة الدينية والأمنية والسياسية والجنسية",
        "الترويج للمواد غير المصرحة او الممارسات المضرة او الااخلاقية",
        "استخدام العبارات المهينة أو العنصرية أو الخادشة",
        "التعدي علي خصوصيات الغير او تقديم المحتوي المحمي بحقوق  الناشرين وأصحاب العلامات التجارية او انتحال شخصية",
        "سبب اخر ",
    ];

    return (
        <Modal
            show={showModal}
            size="lg"
            onHide={() => setShowModal(false)}
            centered
        >
            <Modal.Header closeButton className="m-2">
                <h5 className="fw-bold">إبلاغ عن مخالفة</h5>
            </Modal.Header>

            <Modal.Body>
                <form className="form_ui">
                    {reports.map((reason, index) => (
                        <div className="col-12 my-3" key={index}>
                            <RadioInput
                                label={reason}
                                name="reportReason"
                                value={reason}
                                active={selectedReason}
                                onChange={handleReasonChange}
                            />
                        </div>
                    ))}
                    <div className="col-12 my-3">
                        <TextField placeholder="اكتب هنا..." />
                    </div>
                    <div className="col-12 my-3 d-flex gap-1">
                        <div className="col-6">
                            <SubmitButton text="ارسال" />

                        </div>
                        <div className="col-6">
                            <button className="cancle">إلغاء</button>

                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ReportModal;
