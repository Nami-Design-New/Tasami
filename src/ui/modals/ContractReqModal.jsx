import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import CustomButton from "../CustomButton";
import SubmitButton from "../../ui/forms/SubmitButton";
import SelectField from "../../ui/forms/SelectField";
import TextField from "../../ui/forms/TextField";
import CheckField from "../../ui/forms/CheckField";
import DatePicker from "../forms/DatePicker";

const ContractReq = ({ showModal, setShowModal }) => {
    const {
            register,
            handleSubmit,
            watch,
            setValue,
            formState: { errors }
        } = useForm({ mode: "onChange", defaultValues: { Date: false } });
    
        const Date = watch("Date");

    return (
        <Modal
            show={showModal}
            size="lg"
            onHide={() => setShowModal(false)}
            centered
        >
            <Modal.Header closeButton className="m-2">
<h5 className="fw-bold">ارسال طلب تعاقد</h5>
            </Modal.Header>

            <Modal.Body>
                <form className="form_ui">
                    
                   <div className="row">
                    <div className="col-12 col-lg-6 p-1">
                    <SelectField
                        label="نوع المساعد"
                        id="type"
                        options={[
                            { value: " مساعدة ضمن مجموعة" , name: " مساعدة ضمن مجموعة" },
                            { value: " مساعدة الشخصية" , name: " مساعدة الشخصية" }
                        ]}
                    />
                        </div>
                          <div className="col-12 col-lg-6 p-1">
                        <CheckField
                            label="تاريخ المساعدة"
                            id="Date"
                            value={Date}
                            activeValue={true}
                            inactiveValue={false}
                            activeLabel="محدد"
                            inactiveLabel="غير محدد"
                            onChange={(e) => setValue("Date", e.target.value)}
                        />

                        {Date === true && (
                            <div className="col-12  p-1">
                                <DatePicker
                                    id="date"
                                />
                            </div>
                        )}
                    </div>                   

                      </div>
                   <div className="col-12 p-1">

                    <TextField
                        label='بنود إضافية '
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

export default ContractReq;
