import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SubmitButton from "../../ui/forms/SubmitButton";
import SelectField from "../../ui/forms/SelectField";
import TextField from "../../ui/forms/TextField";
import CheckField from "../../ui/forms/CheckField";
import DatePicker from "../forms/DatePicker";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import useContractOffer from "../../hooks/website/personal-assistances/useContractOffer";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ContractReq = ({ showModal, setShowModal }) => {
    const { t } = useTranslation();
    const { id } = useParams()
    const queryClient = useQueryClient();
    const { contractOffer, isPending } = useContractOffer();
    const schema = yup.object().shape({
        work_id: yup.number().required(t("validation.required")),
        help_start_date: yup.date().required(t("validation.required")),
        notes: yup.string().optional(),
    });
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({ mode: "onChange", defaultValues: { Date: false } });

    const Date = watch("Date");

    const onSubmit = (data) => {
        const payload = {
            work_id: Number(id),
            help_start_date: data.Date ? data.help_start_date : null,
            notes: data.groupAdditionalTerms || "",
        };

        console.log("Form submitted:", payload);
        contractOffer(payload, {
            onSuccess: (res) => {
                toast.success(res.message);
                reset();
                setShowModal(false);
                queryClient.invalidateQueries({ queryKey: ["offer-details"] });
            },
            onError: (error) => {
                toast.error(error.message);
                setShowModal(false);
            },
        });

    };

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
                <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>

                    <div className="row">

                        <div className="col-12 p-1">
                            <CheckField
                                label="تاريخ المساعدة"
                                id="Date"
                                value={Date}
                                activeValue={true}
                                inactiveValue={false}
                                activeLabel="محدد"
                                inactiveLabel="غير محدد"
                                {...register("Date")}
                                onChange={(e) => setValue("Date", e.target.value)}
                            />

                            {Date === true && (
                                <div className="col-12 p-1 mt-2">
                                    <DatePicker
                                        id="help_start_date"
                                        {...register("help_start_date")}
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
                            {...register("groupAdditionalTerms")}
                        />
                    </div>

                    <div className="mt-3">
                        <SubmitButton
                            type="submit"
                            loading={isPending}
                            fullWidth
                            size="large"
                            text="ارسال" />

                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ContractReq;