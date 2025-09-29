import { Modal } from "react-bootstrap";
import CustomButton from "../CustomButton";
import TextField from "../forms/TextField";
import useInquiry from "../../hooks/website/inquiries/useInquiry";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const InquiryModal = ({ showModal, setShowModal, workid }) => {
  const { t } = useTranslation();
  const querClient = useQueryClient();
  const { inquiry, isPending } = useInquiry();

  const schema = yup.object().shape({
    comment: yup
      .string()
      .required(t("validation.required"))
      .min(15, t("validation.descriptionMin"))
      .max(500, t("validation.descriptionMax")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    inquiry(
      { work_id: workid, message: data.comment },
      {
        onSuccess: (res) => {
          reset();
          setShowModal(false);
          querClient.refetchQueries({ queryKey: ["inquries"] });
          toast.success(res.message);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <Modal
      show={showModal}
      size="md"
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton className="m-2">
        <h5 className="fw-bold">{t("website.inquiry.title")}</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <TextField
                placeholder={t("website.inquiry.placeholder")}
                id="commentText"
                {...register("comment")}
                error={errors.comment?.message}
              />
            </div>

            <div className="col-8 p-2">
              <CustomButton
                fullWidth
                size="large"
                type="submit"
                disabled={isPending}
                loading={isPending}
              >
                {t("submit")}
              </CustomButton>
            </div>

            <div className="col-4 p-2">
              <CustomButton
                fullWidth
                size="large"
                variant="outlined"
                onClick={() => setShowModal(false)}
              >
                {t("cancel")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InquiryModal;
