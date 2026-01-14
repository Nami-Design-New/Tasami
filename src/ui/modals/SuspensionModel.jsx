import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import CustomButton from "../CustomButton";
import FileUploader from "../forms/FileUPloader";
import InputField from "../forms/InputField";
import TextField from "../forms/TextField";
import useSuspendEmployee from "../../hooks/dashboard/employee/useSuspendEmployee";
import { toast } from "sonner";
import useSuspendUser from "../../hooks/dashboard/subscription/useSuspendUser";
import { useQueryClient } from "@tanstack/react-query";

const SuspensionModel = ({ showModal, setShowModal, id, isUser = false }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const queryClient = useQueryClient();

  const { suspendEmployee, isPending: isEmployeePending } =
    useSuspendEmployee();
  const { suspendUser, isPending: isUserPending } = useSuspendUser();

  const isPending = isUser ? isUserPending : isEmployeePending;
  const suspendAction = isUser ? suspendUser : suspendEmployee;

  const schema = yup.object().shape({
    duration: yup.boolean(),
    startDate: yup.date().when("duration", {
      is: true,
      then: (schema) =>
        schema.required(t("dashboard.suspensionModal.startRequired")),
      otherwise: (schema) => schema.notRequired(),
    }),
    endDate: yup.date().when("duration", {
      is: true,
      then: (schema) =>
        schema
          .required(t("dashboard.suspensionModal.endRequired"))
          .typeError(t("dashboard.suspensionModal.endTypeError"))
          .test(
            "is-after-start",
            t("dashboard.suspensionModal.endAfterStart"),
            function (value) {
              const { startDate } = this.parent;
              return (
                !startDate || !value || new Date(value) > new Date(startDate)
              );
            }
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
    files: yup
      .array()
      .min(1, t("dashboard.suspensionModal.filesMin"))
      .max(5, t("dashboard.suspensionModal.filesMax")),
    notes: yup.string().max(500, t("dashboard.suspensionModal.notesMax")),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: "",
      endDate: "",
      duration: true,
      notes: "",
      files: [],
    },
  });

  const duration = watch("duration");

  useEffect(() => {
    if (duration) {
      setValue("endDate", null);
      setValue("startDate", null);
    }
  }, [duration, setValue]);

  const onSubmit = (data) => {
    const idKey = isUser ? "user_id" : "employee_id";

    const payload = {
      [idKey]: id,
      reason: data.notes,
      from_date: data.startDate,
      to_date: data.endDate,
      files: data.files,
    };

    suspendAction(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setShowModal(false);
        queryClient.invalidateQueries({
          queryKey: isUser ? ["user-details", id] : null,
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <GlobalModal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      centered
      className="suspend-modal"
    >
      <GlobalModal.Header closeButton>
        <h6>{t("dashboard.suspensionModal.title")}</h6>
      </GlobalModal.Header>

      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-2">
            <Form.Check
              type="switch"
              label={t("dashboard.suspensionModal.fixedDuration")}
              size="lg"
              id="duration-check"
              style={{ direction: "rtl" }}
              reverse={true}
              {...register("duration")}
            />

            {duration && (
              <>
                <div className="col-md-6">
                  <InputField
                    type="date"
                    label={t("dashboard.suspensionModal.from")}
                    {...register("startDate")}
                    error={errors.startDate?.message}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    type="date"
                    label={t("dashboard.suspensionModal.to")}
                    {...register("endDate")}
                    error={errors.endDate?.message}
                  />
                </div>
              </>
            )}

            <TextField
              label={t("dashboard.suspensionModal.notes")}
              {...register("notes")}
              errors={errors.notes?.message}
            />
          </div>

          <div className="col-12 mt-2">
            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <>
                  <FileUploader
                    files={field.value}
                    onFilesChange={(updatedFiles) => {
                      field.onChange(updatedFiles);
                      setFiles(updatedFiles);
                    }}
                    label={t("dashboard.suspensionModal.addFiles")}
                  />
                  {errors.files && (
                    <p className="text-danger mt-1">{errors.files.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div className="col-12 mt-3 d-flex align-items-center justify-content-end gap-2">
            <CustomButton
              size="meduim"
              type="button"
              color="secondary"
              onClick={() => setShowModal(false)}
            >
              {t("dashboard.suspensionModal.cancel")}
            </CustomButton>

            <CustomButton
              size="meduim"
              color="primary"
              loading={isPending}
              type="submit"
            >
              {t("dashboard.suspensionModal.confirm")}
            </CustomButton>
          </div>

          <DevTool control={control} />
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
};

export default SuspensionModel;
