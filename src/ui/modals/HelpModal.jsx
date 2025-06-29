import { Modal } from "react-bootstrap";
import InputField from "../../ui/forms/InputField";
// import CustomButton from "../CustomButton";
import SubmitButton from "../../ui/forms/SubmitButton";
import SelectField from "../../ui/forms/SelectField";
import TextField from "../../ui/forms/TextField";

const HelpModal = ({ showModal, setShowModal }) => {
    return (
        <Modal
            show={showModal}
            size="lg"
            onHide={() => setShowModal(false)}
            centered
        >
            <Modal.Header closeButton className="m-2">
                <h5 className="fw-bold">تقديم عرض مساعدة</h5>
            </Modal.Header>

            <Modal.Body>
                <form className="form_ui">
                                        <div className="row">

                    <div className="col-12 col-lg-6 p-1">
                        <InputField
                            label="قيمة العرض"
                            placeholder="اكتب القيمة"
                            id="personalHelpValue"
                        />
                    </div>
                    <div className="col-12 col-lg-6 p-1">
                        <SelectField
                            label="المجموعة"
                            id="group"
                            options={[
                                { value: "g1", name: "g1 " },
                                { value: "g2", name: "g2 " }
                            ]}
                        />
                    </div>
                    </div>
                    <div className="col-12 p-1">
                        <TextField
                            label='بنود إضافية للمجموعة'
                            hint="*اختياري*"
                            placeholder="اكتب البنود الإضافية هنا..."
                            id="groupAdditionalTerms"
                        />
                    </div>

                    <div className="mt-3">
                        <SubmitButton text="ارسال" />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default HelpModal;
