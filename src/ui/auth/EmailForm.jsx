import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import useLogin from "../../hooks/auth/useLogin";
import { setUser } from "../../redux/slices/authRole";
import { setToken } from "../../utils/token";
import { useLoginEmail } from "../../validations/auth/login-email-schema";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";

const EmailForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginEmail();
  const { login, isPending } = useLogin();

  const onSubmit = async (data) => {
    login(
      { email_or_phone: data.email, password: data.password },
      {
        onSuccess: (res) => {
          setToken(res.data.token);
          dispatch(setUser({ user: res.data, isAuthed: true }));
          toast.success(res.message);
          navigate("/");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
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
