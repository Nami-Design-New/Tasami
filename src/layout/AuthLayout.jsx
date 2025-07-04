import { Link, Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();

  const getHeadingText = () => {
    if (location.pathname === "/login") {
      return "تسجيل الدخول";
    } else if (location.pathname === "/register") {
      return "إنشاء حساب";
    }
    return "تسجيل الدخول";
  };

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
              <h1>{getHeadingText()}</h1>
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
            {location.pathname.includes("dashboard") && <></>}{" "}
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
