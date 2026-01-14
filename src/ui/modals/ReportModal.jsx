import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "../../ui/forms/TextField";
import CustomButton from "../CustomButton";
import useReportGoalOrService from "../../hooks/website/useReportGoalOrService";
import { toast } from "sonner";
import GlobalModal from "../GlobalModal";

const ReportModal = ({ showModal, setShowModal, type, objectId }) => {
  const { t } = useTranslation();
  const { reportGoalOrService, isPending } = useReportGoalOrService();

  // Yup validation schema
  const schema = yup.object().shape({
    reason: yup.string().required(t("validation.please_enter_reason")),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const payload = {
      object_id: objectId,
      object_type: type,
      title: data.reason,
    };
    reportGoalOrService(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        setShowModal(false);
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  useEffect(() => {
    if (!showModal) {
      reset();
    }
  }, [showModal, reset]);

  return (
    <GlobalModal
      show={showModal}
      size="md"
      onHide={() => setShowModal(false)}
      centered
    >
      <GlobalModal.Header closeButton className="m-2">
        <h6 className="fw-bold">{t("report_violation")}</h6>
      </GlobalModal.Header>

      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <TextField
                label={t("reason")}
                placeholder={t("write_here")}
                {...register("reason")}
                error={errors.reason?.message}
              />
            </div>
            <div className="col-12 p-2 d-flex justify-content-end gap-1">
              <CustomButton type="submit" loading={isPending}>
                {t("send")}
              </CustomButton>
            </div>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
};

export default ReportModal;
