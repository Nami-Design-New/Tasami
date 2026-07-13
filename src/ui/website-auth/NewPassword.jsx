import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useResetPassword from "../../hooks/auth/useResetPassword";
import useFormApiError from "../../hooks/shared/useFormApiError";
import { getErrorMessage } from "../../lib/apiError";
import { persistor } from "../../redux/store";
import CustomButton from "../CustomButton";
import BackButton from "../forms/BackButton";
import PasswordField from "../forms/PasswordField";
import ApiErrorAlert from "../common/ApiErrorAlert";

// Password validation schema
const newPasswordSchema = (t) =>
  yup.object().shape({
    password: yup
      .string()
      .min(6, t("validation.passwordLength"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        t("validation.passwordStrength"),
      )
      .required(t("validation.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("validation.passwordMatch"))
      .required(t("validation.required")),
  });

const NewPassword = ({ setResetPasswordStep }) => {
  const { phone, phoneCode } = useSelector((state) => state.phone);
  const { t } = useTranslation();
  const { resetPassword, isPending } = useResetPassword();
  const navigate = useNavigate();

  // Get user data from sessionStorage
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

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setResetPasswordStep("s1");
  };

  const onSubmit = async (data) => {
    clearApiError();
    const payload = {
      password: data.password,
      password_confirmation: data.confirmPassword,
      phone,
      phone_code: phoneCode,
    };

    resetPassword(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        persistor.purge();
        navigate("/login");
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
          <CustomButton loading={isPending} fullWidth size="large">
            {t("auth.confirm")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
