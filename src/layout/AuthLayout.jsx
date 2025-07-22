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
     <section className="auth_section ">
       <div className="container">
        <div className="row">

          <div className="col-lg-6 col-12 p-2 d-flex flex-column">
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
          
           
            {location.pathname.includes("dashboard") && <></>}
          </div>

          <Outlet />
        </div>
      </div>
      </div>
      <div className="col-lg-6 col-12 p-2 d-lg-block d-none">
            <div className="img">
              <img src="/images/regiester-image.webp" alt="auth" />
            </div>
          </div>

      </div></div>
    </section>
  );
};

export default AuthLayout;
