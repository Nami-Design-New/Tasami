import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";

import usePhoneRegister from "../../hooks/auth/useSendOtpCode";
import useGetCountries from "../../hooks/countries/useGetCountries";
import { setPhoneData } from "../../redux/slices/phoneSlice";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import CustomPhoneInput from "../forms/CustomPhoneInput";
import appleIcon from "../../assets/icons/apple-icon.svg";
import googleIcon from "../../assets/icons/google-icon.svg";
import useGoogleAuth from "../../hooks/auth/useGoogleAuth";

const registerSchema = (t) =>
  yup.object().shape({
    fullPhone: yup.string().required(t("validation.fullPhoneRequired")),
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .min(7, t("validation.phoneMinLength"))
      .max(15, t("validation.phoneMaxLength")),
    code: yup.string().required(t("validation.countryCodeRequired")),
  });

const RegisterPage = ({ setRegisterStep }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendCode, isPending } = usePhoneRegister();
  const { handleGoogleLogin, loading } = useGoogleAuth();

  const {
    data: countries,
    isLoading: countriesLoading,
    fetchNextPage,
  } = useGetCountries();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema(t)),
    defaultValues: { phone: "", code: "", fullPhone: "" },
  });
  const watchPhone = watch("phone");
  const watchCode = watch("code");
  // const watchFullPhone = watch("fullPhone");
  const onSubmit = ({ phone, code, fullPhone }) => {
    sendCode(
      { phone, code, type: "register" },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(setPhoneData({ fullPhone, phone, phoneCode: code }));
          setRegisterStep(2);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="form_wrapper register">
      <p className="text-header">{t("auth.registerHeader")}</p>

      <form className="form_ui register-form" onSubmit={handleSubmit(onSubmit)}>
        <label>{t("auth.phoneLabel")}</label>

        {/*  Our Custom Bootstrap Phone Input */}
        {/* <Controller
          name="fullPhone"
          control={control}
          render={({ field }) => (
            <CustomPhoneInput
              countries={countries || []}
              onScrollEnd={() => {
                // if (hasNextPage)
                fetchNextPage();
              }}
              value={{
                phone: watchPhone,
                code: watchCode,
                fullPhone: watchFullPhone,
              }}
              onChange={(val) => {
                setValue("phone", val.phone, { shouldValidate: true });
                setValue("code", val.code, { shouldValidate: true });
                setValue("fullPhone", val.fullPhone, { shouldValidate: true });
              }}
              error={errors.phone?.message || errors.code?.message}
              t={t}
            />
          )}
        /> */}
        <Controller
          name="fullPhone"
          control={control}
          render={({ field }) => (
            <CustomPhoneInput
              countries={countries || []}
              onScrollEnd={() => {
                fetchNextPage();
              }}
              value={{
                phone: watchPhone,
                code: watchCode,
              }}
              onChange={(val) => {
                setValue("phone", val.phone, { shouldValidate: true });
                setValue("code", val.code, { shouldValidate: true });
                setValue("fullPhone", val.fullPhone, { shouldValidate: true });
                field.onChange(val.fullPhone);
              }}
              isLoadingMore={countriesLoading}
              error={errors.fullPhone?.message || errors.phone?.message}
            />
          )}
        />

        {/* Terms */}
        <p className="terms-text">
          <span>{t("auth.termsPrefix")}</span>
          <span>
            <Link to={"/privacy-policy"}>{t("auth.privacyPolicy")}</Link>{" "}
            {t("auth.and")}{" "}
            <Link to={"/terms-conditions"}>{t("auth.termsConditions")}</Link>
          </span>
        </p>

        {/* Buttons */}
        <div className="buttons">
          <BackButton onClick={() => navigate(-1)} />
          <CustomButton
            loading={isPending}
            type="submit"
            fullWidth
            size="large"
          >
            {t("auth.sendButton")}
          </CustomButton>
        </div>

        {/* Already have account */}
        <div className="account-link mt-4">
          {location.pathname === "/register" && (
            <h6>
              <span>{t("auth.alreadyHaveAccount")}</span>
              <Link to={"/login"}>{t("auth.login")}</Link>
            </h6>
          )}
        </div>
      </form>

      <div className="seperator">{t("auth.or")}</div>

      {/* Social Login */}
      <div className="social-login-buttons">
        <button onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="Google" />
          <span>{t("auth.continueWithGoogle")}</span>
        </button>
        <button>
          <img src={appleIcon} alt="Apple" />
          <span>{t("auth.continueWithApple")}</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
