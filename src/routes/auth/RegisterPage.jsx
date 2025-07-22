import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";

const RegisterPage = () => {
  const [phone, setPhone] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirm-otp");
  };

  return (
    <div className="form_wrapper  register">
      <p className="text-header">
        {" "}
        اشترك في منصة “تسامي” كمستفيد بخطوات بسيطة ...
      </p>

      <form className="form_ui register-form " onSubmit={handleSubmit}>
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
            <Link to={"/privacy-policy"}>سياسة الخصوصية</Link> و <Link to={"/terms-conditions"}>الشروط والأحكام</Link>
          </span>
        </p>
        <div className="buttons">
          <BackButton onClick={() => navigate(-1)} />
          <CustomButton fullWidth size="large">
            إرسال
          </CustomButton>
        </div>
        <div className="account-link mt-4">
          {location.pathname === "/register" && (
              <h6>
                <span> لديك حساب بالفعل ؟ </span>
                <Link to={"/login"}> تسجيل الدخول </Link>
              </h6>
            )}
            </div>
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
    </div>
  );
};

export default RegisterPage;
