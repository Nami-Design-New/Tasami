import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../forms/InputField";
import BackButton from "../forms/BackButton";
import SubmitButton from "../forms/SubmitButton";
import PasswordField from "../forms/PasswordField";
import { phoneSchema } from "../../validations/phoneSchema";

const PhoneForm = ({ setShowLoginForm, SetShowOtpForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(phoneSchema),
  });

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic here
    // If successful, you can call SetShowOtpForm(true) if needed
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="tel"
        placeholder="مثال: +455 567888 555"
        {...register("phone")}
        error={errors.phone?.message}
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

export default PhoneForm;
