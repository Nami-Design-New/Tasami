import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import * as yup from "yup";
import BackButton from "../../ui/forms/BackButton";
import CustomButton from "../../ui/CustomButton";
import PasswordField from "../../ui/forms/PasswordField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import useResetPassord from "../../hooks/auth/dashboard/useResetPassord";
import { toast } from "sonner";
import { persistor } from "../../redux/store";
import useFormApiError from "../../hooks/shared/useFormApiError";
import { getErrorMessage } from "../../lib/apiError";
import ApiErrorAlert from "../../ui/common/ApiErrorAlert";

// Password validation schema
const newPasswordSchema = (t) =>
  yup.object().shape({
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.passwordMin")),
    confirmPassword: yup
      .string()
      .required(t("validation.required"))
      .oneOf([yup.ref("password")], t("validation.passwordMatch")),
  });

export default function NewPassword({ setResetPasswordStep }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { email } = useSelector((state) => state.phone);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema(t)),
    mode: "onChange",
  });
  const { apiErrorMessage, clearApiError, handleApiError } =
    useFormApiError(watch);
  const { resetPassword, isPending } = useResetPassord();
  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setResetPasswordStep("s1");
  };

  const onSubmit = async (data) => {
    clearApiError();
    const payload = {
      password: data.password,
      password_confirmation: data.confirmPassword,
      email,
    };

    resetPassword(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        persistor.purge();
        navigate("/dashboard/login");
      },
      onError: (error) => {
        if (!handleApiError(error)) {
          toast.error(getErrorMessage(error, t));
        }
      },
    });
  };

  return (
    <div className="reset-form">
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <ApiErrorAlert message={apiErrorMessage} />
        <PasswordField
          label={t("auth.password")}
          name="password"
          id="new_password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordField
          label={t("auth.newPassword")}
          name="confirmPassword"
          id="confirm_password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <div className="buttons">
          <BackButton onClick={handleBackButtonClick} />
          <CustomButton fullWidth size="large" loading={isPending}>
            {t("auth.confirm")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
