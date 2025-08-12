import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate, useSearchParams } from "react-router";
import CustomButton from "../CustomButton";
import BackButton from "../forms/BackButton";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";

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

  return (
    <div className="row">
      <div className="col-12 p-2">
        <label className="phone-label">رقم الجوال</label>
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
        <InputField label="البريد الالكتروني" type="email" />
      </div>
      <div className="col-12 p-2">
        <PasswordField label="كلمة المرور" type="password" />
      </div>
      <div className="col-12 p-2">
        <PasswordField label="تأكيد كلمة المرور" type="password" />
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
            تأكيد
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
