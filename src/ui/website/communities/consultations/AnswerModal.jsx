import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useReplyToConsultaion from "../../../../hooks/website/communities/useReplyToConsultaion";
import CustomButton from "../../../CustomButton";
import TextField from "../../../forms/TextField";
import { toast } from "sonner";

export default function AnswerModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const minChars = 15;
  const schema = yup.object().shape({
    answer: yup
      .string()
      .required(t("validation.required"))
      .min(
        minChars,
        t("validation.min", {
          field: t("community.fieldLabel"),
          min: minChars,
        })
      ),
  });
  const { replyToConsultaion, isPending } = useReplyToConsultaion();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    replyToConsultaion(data.answer, {
      onSuccess: () => {
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["consultaion-details"] });
        reset();
      },
      onError: (error) => {
        console.error("Error replying to consultation:", error);
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            t("errors.somethingWentWrong")
        );
        reset();
      },
    });
  };

  return (
    <Modal
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      show={showModal}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <h6>{t("community.title")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <TextField
                rows="8"
                label={t("community.fieldLabel")}
                placeholder={t("community.fieldPlaceholder")}
                {...register("answer")}
                error={errors?.answer?.message}
              />
            </div>
            <div className="col-12 p-2">
              <CustomButton
                type="submit"
                loading={isPending}
                fullWidth
                size="large"
              >
                {t("save")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
