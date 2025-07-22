import LoginForm from "../../ui/auth/LoginForm";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <section >
      <LoginForm />
       <div className="account-link">
      {location.pathname === "/login" && (
        <h6>
          <span> ليس لديك حساب ؟ </span>
          <Link to={"/register"}> انشاء حساب </Link>
        </h6>
      )}{" "}
     </div>
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
    </section>
  );
};

export default LoginPage;
