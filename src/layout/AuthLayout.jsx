import { Link, Outlet, useLocation, useSearchParams } from "react-router";

const getHeadingText = (route, step) => {
  if (route === "/login") {
    return "تسجيل الدخول";
  }

  if (route === "/register") {
    return "إنشاء حساب جديد";
  }

  if (route === "/confirm-otp") {
    return "أدخل رمز التحقق";
  }

  if (route.startsWith("/register-info")) {
    if (step === "1") return "المعلومات الشخصية";
    if (step === "2") return "معلومات الحساب";
    return "المعلومات الشخصية";
  }

  return "تسجيل الدخول";
};

const AuthLayout = () => {
  const location = useLocation();
  const route = location.pathname;
  const [searchParmas, setSearchParams] = useSearchParams();
  const step = searchParmas.get("step");

  return (
    <section className="auth_section">
      <div className="form_wrapper">
        <div className="form_container">
          <div className="form-header">
            <div className="logo">
              <Link to="/">
                <img src="/images/logo.svg" alt="logo" />
              </Link>
              <span />
              <h1>{getHeadingText(route, step)}</h1>
            </div>
            {location.pathname === "/login" && (
              <h6>
                <span> ليس لديك حساب ؟ </span>
                <Link to={"/register"}> انشاء حساب </Link>
              </h6>
            )}{" "}
            {location.pathname === "/register" && (
              <h6>
                <span> لديك حساب بالفعل ؟ </span>
                <Link to={"/login"}> تسجيل الدخول </Link>
              </h6>
            )}
            {location.pathname === "/confirm-otp" && (
              <h6>
                <span> لم تستلم الرمز؟ </span>
                <Link to={"/register"}> تعديل الرقم </Link>
              </h6>
            )}
            {location.pathname.includes("dashboard") && <></>}
          </div>

          <Outlet />
        </div>
      </div>
      <div
        className="image_wrapper"
        style={{
          backgroundImage: "url(/images/regiester-image.webp)",
          backgroundPosition: "50% 72%",
        }}
      />
    </section>
  );
};

export default AuthLayout;
