import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import * as yup from "yup";
import CustomButton from "../CustomButton";
import usePhoneRegister from "../../hooks/auth/useSendOtpCode";
import { toast } from "sonner";
import { setPhoneData } from "../../redux/slices/phoneSlice";
import CustomPhoneInput from "../forms/CustomPhoneInput";
import useGetCountries from "../../hooks/countries/useGetCountries";

const resetPasswordSchema = (t) =>
  yup.object().shape({
    fullPhone: yup.string().required(t("validation.fullPhoneRequired")),
    phone: yup.string().required(t("validation.phoneRequired")),
    code: yup.string().required(t("validation.countryCodeRequired")),
  });

const ResetForm = ({ setResetPasswordStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sendCode, isPending } = usePhoneRegister();
  const lang = useSelector((state) => state.language.lang);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema(t)),
    defaultValues: { phone: "", code: "", fullPhone: "" },
  });

  const watchPhone = watch("phone");
  const watchCode = watch("code");
  const {
    data: countries,
    isLoading: countriesLoading,
    fetchNextPage,
  } = useGetCountries();

  // Submit
  const onSubmit = ({ phone, code, fullPhone }) => {
    sendCode(
      { phone, code, type: "reset_password" },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(setPhoneData({ fullPhone, phone, phoneCode: code }));
          setResetPasswordStep("s2");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="reset-form">
      <form className="form_ui " onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 p-2">
            <label>{t("auth.phoneLabel")}</label>
            {/* Controlled phone input */}
            {/* <Controller
              name="fullPhone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country={"sa"}
                  value={field.value}
                  onChange={(value, country) => {
                    // full input for UI
                    field.onChange(value);
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
                    setValue("fullPhone", val.fullPhone, {
                      shouldValidate: true,
                    });
                    field.onChange(val.fullPhone);
                  }}
                  isLoadingMore={countriesLoading}
                  error={errors.fullPhone?.message || errors.phone?.message}
                />
              )}
            />
            {/* Show errors */}
            {/* {errors.phone && (
              <p className="error-text">{errors.phone.message}</p>
            )} */}
            {/* {errors.code && <p className="error-text">{errors.code.message}</p>} */}
          </div>
          <div className="col-12 p-2">
            <div className="buttons">
              <Link to="/login" className="back">
                {lang === "ar" ? (
                  <i className="fa-light fa-arrow-right" />
                ) : (
                  <i className="fa-light fa-arrow-left" />
                )}
              </Link>
              <CustomButton fullWidth size="large" loading={isPending}>
                {t("auth.confirm")}
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetForm;
