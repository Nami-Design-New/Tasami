import { Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useGetCancelReasons from "../../../hooks/website/MyWorks/useGetCancelReasons";
import useCancelContract from "../../../hooks/website/MyWorks/useCancelContract";
import { useTranslation } from "react-i18next";
import TextField from "../../forms/TextField";
import CustomButton from "../../CustomButton";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

//  Validation schema
const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason"),
  anotherReason: yup.string().when("reason", {
    is: "another",
    then: (schema) => schema.required("Please enter your reason"),
    otherwise: (schema) => schema.optional(),
  }),
});

export default function CancelContractModal({
  showModal,
  setShowModal,
  workId,
}) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { cancelReasons, isLoading } = useGetCancelReasons();
  const { cancelContract, isPending } = useCancelContract();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "",
      anotherReason: "",
    },
  });

  const selectedReason = watch("reason");

  //  Handle form submit
  const onSubmit = (data) => {
    const payload = {
      id,
      reason: data.reason === "another" ? data.anotherReason : data.reason,
    };

    cancelContract(payload, {
      onSuccess: (res) => {
        reset();
        setShowModal(false);
        toast.success(res?.message);
        navigate(`/my-works/${workId}/assistants`);
        queryClient.refetchQueries({ queryKey: ["assistants"] });
        queryClient.refetchQueries({ queryKey: ["work-group"] });
        queryClient.refetchQueries({ queryKey: ["work-details"] });
      },
    });
  };

  //  Handle cancel (reset + close)
  const handleCancel = () => {
    reset();
    setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) reset();
  }, [showModal, reset]);

  return (
    <Modal show={showModal} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <h5>{t("cancelContract")}</h5>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          {cancelReasons?.map((reason) => (
            <div key={reason?.id} className="col-12 p-2">
              <div className="reason-form-input flex items-center gap-2">
                <label htmlFor={reason?.id}>{reason?.title}</label>
                <Controller
                  name="reason"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="radio"
                      value={reason?.title}
                      checked={field.value === reason?.title}
                      id={reason?.id}
                    />
                  )}
                />
              </div>
            </div>
          ))}

          {/* Another reason option */}
          <div className="col-12 p-2">
            <div className="reason-form-input flex items-center gap-2">
              <label htmlFor="another-reason">{t("anotherReason")}</label>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="another"
                    checked={field.value === "another"}
                    id="another-reason"
                  />
                )}
              />
            </div>
          </div>

          {/* Conditional text field */}
          {selectedReason === "another" && (
            <div className="col-12 p-2">
              <Controller
                name="anotherReason"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder={t("community.fieldPlaceholder")}
                    error={errors.anotherReason?.message}
                  />
                )}
              />
            </div>
          )}

          {/* Validation error for radio group */}
          {errors.reason && (
            <p className="text-danger small px-2">{errors.reason.message}</p>
          )}

          {/* Buttons */}
          <div className="col-12 p-2">
            <div className="buttons flex justify-end gap-2">
              <CustomButton
                type="button"
                variant="outlined"
                onClick={handleCancel}
              >
                {t("cancel")}
              </CustomButton>
              <CustomButton
                type="submit"
                fullWidth
                loading={isPending}
                disabled={isPending}
              >
                {t("send")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
