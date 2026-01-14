import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import * as yup from "yup";
import useReplyToConsultaion from "../../../../hooks/website/communities/useReplyToConsultaion";
import CustomButton from "../../../CustomButton";
import TextField from "../../../forms/TextField";
import { toast } from "sonner";
import useEditReplyToConsultation from "../../../../hooks/website/communities/useEditReplyToConsultaion";
import GlobalModal from "../../../GlobalModal";

export default function AnswerModal({
  showModal,
  setShowModal,
  showEditModal,
  setShowEditModal,
  consultaionDetails,
}) {
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
  const { editReplyToConsultation, isPending: editReplyLoading } =
    useEditReplyToConsultation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      answer: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (showEditModal && consultaionDetails?.answer) {
      setValue("answer", consultaionDetails.answer);
    } else {
      setValue("answer", "");
    }
  }, [showEditModal, consultaionDetails?.answer, setValue]);

  const handleClose = () => {
    if (showModal) setShowModal(false);
    if (showEditModal) setShowEditModal(false);
    reset();
  };

  const onSubmit = (data) => {
    if (showEditModal) {
      editReplyToConsultation(data.answer, {
        onSuccess: () => {
          handleClose();
          queryClient.invalidateQueries({ queryKey: ["consultaion-details"] });
        },
        onError: (error) => {
          console.error("Error editing reply:", error);
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              t("errors.somethingWentWrong")
          );
        },
      });
    } else {
      replyToConsultaion(data.answer, {
        onSuccess: () => {
          handleClose();
          queryClient.invalidateQueries({ queryKey: ["consultaion-details"] });
        },
        onError: (error) => {
          console.error("Error replying to consultation:", error);
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              t("errors.somethingWentWrong")
          );
        },
      });
    }
  };

  const isOpen = showModal || showEditModal;
  const isLoading = isPending || editReplyLoading;

  return (
    <GlobalModal onHide={handleClose} show={isOpen} centered size="md">
      <GlobalModal.Header closeButton>
        <h6>
          {showEditModal ? t("community.editTitle") : t("community.title")}
        </h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
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
                loading={isLoading}
                fullWidth
                size="large"
              >
                {showEditModal ? t("community.update") : t("community.save")}
              </CustomButton>
            </div>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
