import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import OtpForm from "../../ui/auth/OtpForm";
import BackButton from "../../ui/forms/BackButton";
import DatePicker from "../../ui/forms/DatePicker";
import InputField from "../../ui/forms/InputField";
import PasswordField from "../../ui/forms/PasswordField";
import PhoneField from "../../ui/forms/PhoneField";
import SelectField from "../../ui/forms/SelectField";
import SubmitButton from "../../ui/forms/SubmitButton";
import {
  accountInfoSchema,
  personalInfoSchema,
} from "../../validations/registerSchema";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router";
import CustomButton from "../../ui/CustomButton";

const RegisterPage = () => {
  const navigate = useNavigate();
  // Form state management
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = currentForm;

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

  // Handle back button
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (showOtpForm) {
      setShowOtpForm(false);
    }
  };

  return (
    <div className="form_wrapper  register">
      <p className="text-header">
        {" "}
        اشترك في منصة “تسامي” كمستفيد بخطوات بسيطة ...
      </p>

      <form
        className="form_ui register-form "
        onSubmit={handleSubmit(step === 1 ? onSubmitStep1 : onSubmitStep2)}
      >
        <label>رقم الجوال</label>
        <PhoneInput
          country={"sa"}
          value={phone}
          onChange={setPhone}
          enableSearch={true}
          preferredCountries={["us", "gb", "fr", "de"]}
          placeholder="05XX XXXX XXX"
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
        />
        <p className="terms-text">
          <span>بمواصلتك، فإنك توافق على</span>
          <span>
            <Link>سياسة الخصوصية</Link> و <Link>الشروط والأحكام</Link>
          </span>
        </p>
        <div className="buttons">
          <CustomButton fullWidth size="large">
            إرسال
          </CustomButton>
          <BackButton onClick={() => navigate(-1)} />
        </div>

        {/* {step === 1 && (
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
          )} */}
      </form>
      <div className="seperator"> أو </div>
      <div className="social-login-buttons">
        <button>
          <img
            src="/icons/google-icon.svg
          "
          />
          <span>المتابعة باستخدام Google</span>
        </button>
        <button>
          <img src="/icons/apple-icon.svg" />
          <span> المتابعة باستخدام Apple </span>
        </button>
      </div>
      {/* 
      <OtpForm
        email={watch("email")}
        setShowOtpForm={setShowOtpForm}
        showOtpForm={showOtpForm}
      /> */}
    </div>
  );
};

export default RegisterPage;
