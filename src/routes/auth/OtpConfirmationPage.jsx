import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useOtpConfirmation from "../../hooks/auth/useOtpConfirmation";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import OtpContainer from "../../ui/forms/OtpContainer";

const otpSchema = (t) =>
  yup.object().shape({
    code: yup
      .string()
      .required(t("validation.otpRequired"))
      .length(4, t("validation.otpLength")),
  });
export default function OtpConfirmationPage({ setRegisterStep }) {
  const { phone, phoneCode } = useSelector((state) => state.phone);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { confirmOtp, isPending } = useOtpConfirmation();
  //  useForm with yupResolver
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema(t)),
    defaultValues: { code: "" },
  });

  const onSubmit = async ({ code }) => {
    confirmOtp(
      {
        phone: phone,
        phoneCode: phoneCode,
        otp: code,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setRegisterStep(3);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  return (
    <div className="reset-container">
      <p className="otp-page-des">
        <span>{t("auth.otpPrompt")}</span>
        <span> {`${phoneCode}${phone}`} </span>
        {location.pathname === "/confirm-otp" && (
          <span className="d-block">
            <Link to={"/register"}> {t("auth.editPhoneNumber")} </Link>
          </span>
        )}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <OtpContainer
              length={4}
              value={field.value}
              setCode={field.onChange}
            />
          )}
        />
        {errors.code && <p className="error-text">{errors.code.message}</p>}
        <div className="resend">
          <h6
            style={{
              cursor: "pointer",
              pointerEvents: resendDisabled ? "none" : "auto",
            }}
          >
            {t("auth.resendCode")}
          </h6>
          <p>
            <span>
              {Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}
            </span>{" "}
            : <span>{(timer % 60).toString().padStart(2, "0")}</span>
          </p>
        </div>

        <div className="buttons">
          <BackButton onClick={() => navigate(-1)} />
          <CustomButton
            loading={isPending}
            type="submit"
            fullWidth
            size="large"
          >
            {t("auth.send")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
