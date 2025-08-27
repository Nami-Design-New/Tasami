import { useTranslation } from "react-i18next";
import EmailLoginForm from "../../ui/dashboard-auth/EmailLoginForm";

export default function DashboardLoginPage() {
  const { t } = useTranslation();

  return (
    <div className="form">
      <h2 className="head">{t("auth.greeting")}</h2>
      <EmailLoginForm />
    </div>
  );
}
