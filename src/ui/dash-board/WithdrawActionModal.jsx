import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useUpdateWithdrawRequest from "../../hooks/dashboard/withdrawRequests/useUpdateWithdrawRequest";
import CustomButton from "../CustomButton";
import FileUploader from "../forms/FileUPloader";
import TextField from "../forms/TextField";
import * as yup from "yup";
import GlobalModal from "../GlobalModal";

export default function WithdrawActionModal({
  show,
  setShow,
  actionType,
  request,
}) {
  const { t } = useTranslation();
  const [files, setFiles] = useState();
  const { updateWithdrawRequest, isPending } = useUpdateWithdrawRequest();
  const queryClient = useQueryClient();

  const withdrawSchema = yup.object().shape({
    file: yup.mixed().required(t("withdraw.errors.fileRequired")),

    notes: yup
      .string()
      .nullable()
      .when("$actionType", (actionValue, schema, options) => {
        if (actionType === "refused") {
          return schema.required(t("withdraw.errors.notesRequired"));
        }
        return schema.notRequired();
      }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(withdrawSchema),
    context: { actionType },
  });

  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
    setValue("file", updatedFiles, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    const payload = {
      _method: "put",
      status: actionType,
      reason: data.notes,
      file: data.file?.[0],
    };

    updateWithdrawRequest(
      { id: request, payload },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          setShow(false);
          reset();
          queryClient.refetchQueries({ queryKey: ["withdraw-requests"] });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  const isReject = actionType === "refused";
  const handleClose = () => {
    setShow(false);
    reset();
  };
  return (
    <GlobalModal show={show} onHide={handleClose} centered>
      <GlobalModal.Header closeButton>
        <h6>
          {isReject
            ? t("withdraw.reject_request")
            : t("withdraw.accept_request")}
        </h6>
      </GlobalModal.Header>

      <GlobalModal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
          <div className="row">
            {/* FILE */}
            <div className="col-12 p-2">
              <FileUploader
                multiple={false}
                label={t("withdraw.uploadFile")}
                files={files}
                onFilesChange={handleFilesChange}
              />
              <p className="text-danger small mt-2">{errors.file?.message}</p>
            </div>

            {/* NOTES */}
            <div className="col-12 p-2">
              <TextField
                label={
                  isReject ? t("withdraw.rejectReason") : t("withdraw.notes")
                }
                {...register("notes")}
                placeholder={t("withdraw.enterNotes")}
                error={errors.notes?.message}
              />
            </div>

            <div className="col-12 p-2">
              <div className="d-flex justify-content-end">
                <CustomButton loading={isPending}>{t("submit")}</CustomButton>
              </div>
            </div>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
