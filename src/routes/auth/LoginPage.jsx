import LoginForm from "../../ui/auth/LoginForm";

const LoginPage = () => {
  return (
    <section>
      <LoginForm />
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
