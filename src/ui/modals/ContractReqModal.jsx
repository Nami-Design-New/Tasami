import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useContractOffer from "../../hooks/website/personal-assistances/useContractOffer";
import CheckField from "../../ui/forms/CheckField";
import SubmitButton from "../../ui/forms/SubmitButton";
import TextField from "../../ui/forms/TextField";
import DatePicker from "../forms/DatePicker";

const ContractReq = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const { id } = useParams();
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
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: { Date: false } });

  const Date = watch("Date");

  const onSubmit = (data) => {
    const payload = {
      work_id: Number(id),
      help_start_date: data.Date ? data.help_start_date : null,
      notes: data.groupAdditionalTerms || "",
    };

    contractOffer(payload, {
      onSuccess: (res) => {
        toast.success(res.message || t("messages_success"));
        reset();
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["offer-details"] });
      },
      onError: (error) => {
        toast.error(error.message || t("messages_error"));
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
        <h6 className="fw-bold">{t("contractReq_title")}</h6>{" "}
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-1">
              <CheckField
                label={t("contractReq_helpDate")}
                id="Date"
                value={Date}
                activeValue={true}
                inactiveValue={false}
                activeLabel={t("contractReq_defined")}
                inactiveLabel={t("contractReq_undefined")}
                {...register("Date")}
                onChange={(e) => setValue("Date", e.target.value)}
              />

              {Date === true && (
                <div className="col-12 p-1 mt-2">
                  <DatePicker
                    label={t("contractReq_startDate")}
                    placeholder={t("contractReq_pickDate")}
                    id="help_start_date"
                    {...register("help_start_date")}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-12 p-1">
            <TextField
              label={t("contractReq_additionalTerms")}
              hint={t("contractReq_optional")}
              placeholder={t("contractReq_writeTerms")}
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
              text={t("contractReq_send")}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ContractReq;
