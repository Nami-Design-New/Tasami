import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InputField from "../forms/InputField";
import CustomButton from "../CustomButton";
import useChangePassword from "../../hooks/auth/dashboard/profile/useChangePassword";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

const PasswordChangeModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const { changePassword, isPending } = useChangePassword();

  // ---------------------------
  // Validation Schema
  // ---------------------------
  const schema = yup.object({
    oldPassword: yup.string().required(t("validation.required")),
    newPassword: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.min", { num: 6 })),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], t("validation.passwordsMustMatch"))
      .required(t("validation.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ---------------------------
  // Submit Handler
  // ---------------------------
  const onSubmit = (data) => {
    const payload = {
      password: data.oldPassword,
      new_password: data.newPassword,
      new_password_confirmation: data.confirmPassword,
    };
    changePassword(payload, {
      onSuccess: (res) => {
        setShowModal(false);
        toast.success(res.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="md"
      centered
    >
      <Modal.Header closeButton>
        <h6>{t("dashboard.employeeProfile.passwordChange.title")}</h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <InputField
                label={t(
                  "dashboard.employeeProfile.passwordChange.oldPassword"
                )}
                type="password"
                error={errors.oldPassword?.message}
                {...register("oldPassword")}
              />
            </div>

            <div className="col-12 p-2">
              <InputField
                label={t(
                  "dashboard.employeeProfile.passwordChange.newPassword"
                )}
                type="password"
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />
            </div>

            <div className="col-12 p-2">
              <InputField
                label={t(
                  "dashboard.employeeProfile.passwordChange.confirmPassword"
                )}
                type="password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>

            <div className="col-12 p-2">
              <CustomButton
                size="large"
                fullWidth
                loading={isPending}
                type="submit"
              >
                {t("dashboard.employeeProfile.passwordChange.confirm")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordChangeModal;
