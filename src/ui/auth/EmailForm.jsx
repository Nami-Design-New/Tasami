import { Link } from "react-router";
import BackButton from "../forms/BackButton";
import InputField from "../forms/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "../forms/SubmitButton";
import PasswordField from "../forms/PasswordField";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validations/loginschema";

const EmailForm = ({ setShowLoginForm, SetShowOtpForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };
  return (
    <form
      className="form_ui"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <InputField
        id="email"
        placeholder="مثال: mail@mail.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <PasswordField
        name="password"
        placeholder="كلمه المرور"
        {...register("password")}
        error={errors.password?.message}
      />
      <Link to={"/reset-password"}> نسيت كلمه المرور ؟ </Link>

      <div className="buttons">
        <BackButton onClick={handleBackButtonClick} />
        <SubmitButton text="تسجيل" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default EmailForm;
