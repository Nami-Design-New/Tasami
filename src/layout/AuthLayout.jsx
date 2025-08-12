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
  if (route === "/areas-of-interest") {
    return "مجالات الاهتمام";
  }
  if (route === "/customize-platform-services") {
    return "تخصيص خدمات المنصة";
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
      <div className="form_container">
        <div className="form-header">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="logo" />
            </Link>
            <span />
            <h1>{getHeadingText(route, step)}</h1>
          </div>

          {location.pathname.includes("dashboard") && <></>}
        </div>
        <Outlet />
      </div>

      <div className="img">
        <img src="/images/regiester-image.webp" alt="auth" />
      </div>
    </section>
  );
};

export default AuthLayout;
