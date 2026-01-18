import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import useInquiry from "../../../hooks/website/inquiries/useInquiry";
import CustomButton from "../../CustomButton";
import TextField from "../../forms/TextField";
import GlobalModal from "../../GlobalModal";

const InquiryModal = ({ showModal, setShowModal, workid }) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
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
          queryClient.setQueryData(
            ["offer-details", String(workid)],
            (oldData) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                can_send_inquiry: !oldData.can_send_inquiry,
              };
            }
          );
          queryClient.refetchQueries({ queryKey: ["inquries"] });
          toast.success(res.message);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <GlobalModal
      show={showModal}
      size="md"
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      centered
    >
      <GlobalModal.Header closeButton className="m-2">
        <h6 className="fw-bold">{t("website.inquiry.title")}</h6>
      </GlobalModal.Header>

      <GlobalModal.Body>
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
                {t("send")}
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
      </GlobalModal.Body>
    </GlobalModal>
  );
};

export default InquiryModal;
