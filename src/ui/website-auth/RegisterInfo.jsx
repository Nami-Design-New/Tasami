import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AccountInfoForm from "../../ui/website-auth/AccountInfoForm";
import PersonalInfoForm from "../../ui/website-auth/PersonalInfoForm";
import { useRegisterValidation } from "../../validations/auth/register-schema";

export default function RegisterInfo({ setRegisterStep }) {
  const { t } = useTranslation();
  const methods = useRegisterValidation();
  const [formType, setFormType] = useState("personalInfo");

  return (
    <section className="personal-info-form">
      {formType === "personalInfo" && (
        <p className="form-head">{t("auth.registerInfoPrompt")}</p>
      )}
      {formType === "accountInfo" && (
        <p className="form-head">{t("auth.accountInfoPrompt")}</p>
      )}
      <FormProvider {...methods}>
        <form className="form_ui  ">
          {formType === "personalInfo" && (
            <PersonalInfoForm
              setFormType={setFormType}
              setRegisterStep={setRegisterStep}
            />
          )}
          {formType === "accountInfo" && (
            <AccountInfoForm setFormType={setFormType} />
          )}
        </form>
      </FormProvider>
    </section>
  );
}
