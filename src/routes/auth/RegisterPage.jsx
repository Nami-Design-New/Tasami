import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import usePhoneRegister from "../../hooks/auth/useSendOtpCode";
import { setPhoneData } from "../../redux/slices/phoneSlice";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";

// validation schema
const registerSchema = (t) =>
  yup.object().shape({
    fullPhone: yup.string().required(t("validation.fullPhoneRequired")),
    phone: yup.string().required(t("validation.phoneRequired")),
    code: yup.string().required(t("validation.countryCodeRequired")),
  });

const RegisterPage = ({ setRegisterStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sendCode, isPending } = usePhoneRegister();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema(t)),
    defaultValues: { phone: "", code: "", fullPhone: "" },
  });

  // Submit
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
      }
    );
  };

  return (
    <div className="form_wrapper  register">
      <p className="text-header">{t("auth.registerHeader")}</p>
      <form
        className="form_ui register-form "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>{t("auth.phoneLabel")}</label>

        {/* Controlled phone input */}
        <Controller
          name="fullPhone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              country={"sa"}
              value={field.value}
              onChange={(value, country) => {
                // full input for UI
                field.onChange(value);
                // extract parts for API
                const dialCode = `+${country.dialCode}`;
                const localPhone = value.replace(country.dialCode, "");
                setValue("code", dialCode);
                setValue("phone", localPhone);
              }}
              enableSearch
              preferredCountries={["us", "gb", "fr", "de"]}
              placeholder={t("auth.phoneInputPlaceholder")}
              inputProps={{
                name: "fullPhone",
                required: true,
                autoFocus: true,
              }}
            />
          )}
        />

        {/* Show errors */}
        {errors.phone && <p className="error-text">{errors.phone.message}</p>}
        {errors.code && <p className="error-text">{errors.code.message}</p>}

        <p className="terms-text">
          <span>{t("auth.termsPrefix")}</span>
          <span>
            <Link to={"/privacy-policy"}>{t("auth.privacyPolicy")}</Link>{" "}
            {t("auth.and")}{" "}
            <Link to={"/terms-conditions"}>{t("auth.termsConditions")}</Link>
          </span>
        </p>
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
      <div className="social-login-buttons">
        <button>
          <img src="/icons/google-icon.svg" alt="Google" />
          <span>{t("auth.continueWithGoogle")}</span>
        </button>
        <button>
          <img src="/icons/apple-icon.svg" alt="Apple" />
          <span>{t("auth.continueWithApple")}</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
