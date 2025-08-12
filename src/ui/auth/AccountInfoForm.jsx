import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate, useSearchParams } from "react-router";
import CustomButton from "../CustomButton";
import BackButton from "../forms/BackButton";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";
import { useTranslation } from "react-i18next";

export default function AccountInfoForm({ setFormType }) {
  const [phone, setPhone] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  function handleBack(e) {
    e.preventDefault();
    setSearchParams({ step: "1" });
    setFormType("personalInfo");
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/areas-of-interest");
  }
  const { t } = useTranslation();
  return (
    <div className="row">
      <div className="col-12 p-2">
        <label className="phone-label">{t("auth.phoneLabel")}</label>
        <PhoneInput
          country={"sa"}
          value={phone}
          onChange={setPhone}
          enableSearch={true}
          preferredCountries={["us", "gb", "fr", "de"]}
          placeholder="05XX XXXX XXX"
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
        />
      </div>
      <div className="col-12 p-2">
        <InputField type="email" label={t("auth.emailAddress")} />
      </div>
      <div className="col-12 p-2">
        <PasswordField type="password" label={t("auth.password")} />
      </div>
      <div className="col-12 p-2">
        <PasswordField type="password" label={t("auth.confirmPassword")} />
      </div>
      <div className="col-12 p-2">
        <div className="buttons">
          <BackButton onClick={handleBack} />
          <CustomButton
            type="button"
            onClick={handleSubmit}
            fullWidth
            size="large"
          >
            {t("auth.next")}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
