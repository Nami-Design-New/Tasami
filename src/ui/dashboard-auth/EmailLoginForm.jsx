import { useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import CustomButton from "../CustomButton";
import { Link } from "react-router";

export const getLoginSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.passwordMin")),
  });

export default function EmailLoginForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label={t("auth.email")}
        id="email"
        placeholder={t("auth.emailPlaceholder")}
        {...register("email")}
        error={errors.email?.message}
      />
      <PasswordField
        label={t("auth.password")}
        name="password"
        placeholder={t("auth.passwordPlaceholder")}
        {...register("password")}
        error={errors.password?.message}
      />
      <Link to={"/dashboard/reset-password"}>{t("auth.forgotPassword")}</Link>
      <div className="buttons">
        <CustomButton fullWidth size="large" type="submit">
          {t("auth.loginButton")}
        </CustomButton>
      </div>
    </form>
  );
}
