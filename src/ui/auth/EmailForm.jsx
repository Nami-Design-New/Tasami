import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { loginSchema } from "../../validations/loginschema";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";
import { useTranslation } from "react-i18next";

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const role = useSelector((state) => state.authRole.role);
  const { t } = useTranslation();

  const onSubmit = (data) => {
    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "user") {
      navigate("/");
    }
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
        <CustomButton fullWidth size="large" type="submit">
          {t("auth.loginButton")}
        </CustomButton>
      </div>
    </form>
  );
};

export default EmailForm;
