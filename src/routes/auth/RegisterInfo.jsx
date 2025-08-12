import { useEffect, useState } from "react";
import PersonalInfoForm from "../../ui/auth/PersonalInfoForm";
import AccountInfoForm from "../../ui/auth/AccountInfoForm";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export default function RegisterInfo() {
  const [searchparams] = useSearchParams();
  const step = searchparams.get("step");

  const [formType, setFormType] = useState("personalInfo");

  useEffect(() => {
    if (step === "2") {
      setFormType("accountInfo");
    } else {
      setFormType("personalInfo");
    }
  }, [step]);

  const { t } = useTranslation();
  return (
    <section className="personal-info-form">
      {(step === "1" || step === null) && (
        <p className="form-head">
          {t("auth.registerInfoPrompt")}
        </p>
      )}
      {step === "2" && (
        <p className="form-head">{t("auth.accountInfoPrompt")}</p>
      )}
      <form className="form_ui  ">
        {formType === "personalInfo" && (
          <PersonalInfoForm setFormType={setFormType} />
        )}
        {formType === "accountInfo" && (
          <AccountInfoForm setFormType={setFormType} />
        )}
      </form>
    </section>
  );
}
