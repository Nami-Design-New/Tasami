import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import useLogin from "../../hooks/auth/useLogin";
import { setAuthed, setUser } from "../../redux/slices/authRole";
import { setToken } from "../../utils/token";
import { useLoginEmail } from "../../validations/auth/login-email-schema";
import useFormApiError from "../../hooks/shared/useFormApiError";
import { getErrorMessage } from "../../lib/apiError";
import CustomButton from "../CustomButton";
import ApiErrorAlert from "../common/ApiErrorAlert";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";

const EmailForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useLoginEmail();
  const { login, isPending } = useLogin();
  const { apiErrorMessage, clearApiError, handleApiError } =
    useFormApiError(watch);

  const onSubmit = async (data) => {
    clearApiError();
    login(
      { email_or_phone: data.email, password: data.password },
      {
        onSuccess: (res) => {
          setToken(res.data.token);
          dispatch(setAuthed(true));
          dispatch(setUser({ user: res.data }));
          localStorage.setItem("skipAreasOfInterest", "true");
          toast.success(res.message);
          navigate("/", { replace: true });
        },
        onError: (error) => {
          if (!handleApiError(error)) {
            toast.error(getErrorMessage(error, t));
          }
        },
      }
    );
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
      <ApiErrorAlert message={apiErrorMessage} />
      <InputField
        id="email"
        placeholder={t("auth.emailPlaceholder")}
        {...register("email")}
        error={errors.email?.message}
      />

      <PasswordField
        name="password"
        placeholder={t("auth.passwordPlaceholder")}
        {...register("password")}
        error={errors.password?.message}
      />
      <Link to={"/reset-password"}>{t("auth.forgotPassword")}</Link>

      <div className="buttons">
        <CustomButton loading={isPending} fullWidth size="large" type="submit">
          {t("auth.loginButton")}
        </CustomButton>
      </div>
    </form>
  );
};

export default EmailForm;
