import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BackButton from "../../ui/forms/BackButton";
import DatePicker from "../../ui/forms/DatePicker";
import InputField from "../../ui/forms/InputField";
import SelectField from "../../ui/forms/SelectField";
import SubmitButton from "../../ui/forms/SubmitButton";
import PasswordField from "../../ui/forms/PasswordField";
import PhoneField from "../../ui/forms/PhoneField";
import { personalInfoSchema, accountInfoSchema } from "../../validations/registerSchema";
import OtpContainer from "../../ui/forms/OtpContainer";

const RegisterPage = () => {
  // Form state management
  const [step, setStep] = useState(1);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  // Step 1: Personal Information Form
  const personalInfoForm = useForm({
    resolver: yupResolver(personalInfoSchema),
    mode: "onChange",
  });

  // Step 2: Account Information Form
  const accountInfoForm = useForm({
    resolver: yupResolver(accountInfoSchema),
    mode: "onChange",
  });

  // Get the current form based on step
  const currentForm = step === 1 ? personalInfoForm : accountInfoForm;
  const { register, handleSubmit, formState: { errors } } = currentForm;

  // Handle form submission for each step
  const onSubmitStep1 = (data) => {
    console.log("Step 1 data:", data);
    setStep(2);
  };

  const onSubmitStep2 = (data) => {
    console.log("Step 2 data:", data);
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowOtpForm(true);
    }, 1000);
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for OTP verification
    setTimeout(() => {
      setLoading(false);
      // Navigate to success page or dashboard
      console.log("Registration successful with OTP:", otpCode);
    }, 1000);
  };

  // Handle back button
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (showOtpForm) {
      setShowOtpForm(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (!resendDisabled) {
      setTimer(60);
      setResendDisabled(true);
      // Simulate API call to resend OTP
      console.log("Resending OTP...");
    }
  };

  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (showOtpForm && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [showOtpForm, timer]);

  return (
    <div className="form_wrapper register">
      {!showOtpForm ? (
        <form className="form_ui mt-3" onSubmit={handleSubmit(step === 1 ? onSubmitStep1 : onSubmitStep2)}>
          {step === 1 && (
            <div className="row">
              <div className="col-12 col-lg-6 p-2">
                <InputField
                  label="الاسم الاول"
                  placeholder="مثال: سلطان"
                  type="text"
                  id="first_name"
                  {...register("first_name")}
                  error={errors.first_name?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <InputField
                  label="اسم العائلة"
                  placeholder="مثال: م."
                  type="text"
                  id="last_name"
                  {...register("last_name")}
                  error={errors.last_name?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <DatePicker
                  beforeContent="تاريخ الميلاد"
                  id="date_of_birth"
                  {...register("date_of_birth")}
                  error={errors.date_of_birth?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <SelectField
                  label="الجنس"
                  options={[
                    { value: "male", name: "ذكر" },
                    { value: "female", name: "انثى" },
                  ]}
                  id="gender"
                  {...register("gender")}
                  error={errors.gender?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <SelectField
                  label="الجنسية"
                  options={[
                    { value: "Egypt", name: "مصر" },
                    { value: "Saudi Arabia", name: "المملكة العربية السعودية" },
                  ]}
                  id="nationality"
                  {...register("nationality")}
                  error={errors.nationality?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <SelectField
                  label="بلد الاقامة"
                  id="country"
                  options={[
                    { value: "Egypt", name: "مصر" },
                    { value: "Saudi Arabia", name: "المملكة العربية السعودية" },
                  ]}
                  {...register("country")}
                  error={errors.country?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <SelectField
                  label="المدينة"
                  id="city"
                  options={[
                    { value: "Cairo", name: "القاهرة" },
                    { value: "Alex", name: "الإسكندرية" },
                    { value: "Riyadh", name: "الرياض" },
                    { value: "Jeddah", name: "جدة" },
                  ]}
                  {...register("city")}
                  error={errors.city?.message}
                />
              </div>

              <div className="col-12 p-2 mt-3">
                <div className="buttons">
                  <BackButton onClick={() => window.history.back()} />
                  <SubmitButton text="استمرار" loading={loading} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="row">
              <div className="col-12 col-lg-6 p-2">
                <PhoneField
                  label="رقم الهاتف"
                  placeholder="أدخل رقم الهاتف"
                  id="phone"
                  name="phone"
                  {...register("phone")}
                  error={errors.phone?.message}
                  onChange={(e) => {
                    register("phone").onChange(e);
                  }}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <InputField
                  label="البريد الالكتروني"
                  placeholder="example@domain.com"
                  type="email"
                  id="email"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <PasswordField
                  label="كلمة المرور"
                  id="password"
                  placeholder="كلمة المرور"
                  {...register("password")}
                  error={errors.password?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <PasswordField
                  label="تأكيد كلمة المرور"
                  id="confirmPassword"
                  placeholder="تأكيد كلمة المرور"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>

              <div className="col-12 p-2 mt-3">
                <div className="buttons">
                  <BackButton onClick={handleBack} />
                  <SubmitButton text="تسجيل" loading={loading} />
                </div>
              </div>
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="reset-form">
          <h3 className="text-center mb-4">أدخل رمز التحقق</h3>
          <p className="text-center mb-4">تم إرسال رمز التحقق إلى هاتفك</p>
          
          <OtpContainer setCode={setOtpCode} length={4} />
          
          <div className="resend">
            <h6
              onClick={handleResendOtp}
              style={{
                cursor: "pointer",
                pointerEvents: resendDisabled ? "none" : "auto",
              }}
            >
              إعادة إرسال الرمز
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
            <BackButton onClick={handleBack} />
            <SubmitButton loading={loading} text="تأكيد" />
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
