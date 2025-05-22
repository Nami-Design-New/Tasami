import { Link, Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();

  // Determine heading text based on current path
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
                <img src="/images/logo.png" alt="logo" />
              </Link>
              <span />
              <h1>{getHeadingText()}</h1>
            </div>
            {location.pathname === "/login" ? (
              <h6>
                <span> ليس لديك حساب ؟ </span>
                <Link to={"/register"}> انشاء حساب </Link>
              </h6>
            ) : (
              <h6>
                <span> لديك حساب بالفعل ؟ </span>
                <Link to={"/login"}> تسجيل الدخول </Link>
              </h6>
            )}
          </div>

          <Outlet />
        </div>
      </div>
      <div
        className="image_wrapper"
        style={{
          backgroundImage: "url(/images/regiester-image.jpeg)",
          backgroundPosition: "50% 72%",
        }}
      />
    </section>
  );
};

export default AuthLayout;
