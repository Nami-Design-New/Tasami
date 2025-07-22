import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CustomButton from "../CustomButton";

const ResetForm = ({ setResetPasswordStep }) => {
  const [phone, setPhone] = useState();
  const lang = useSelector((state) => state.language.lang);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setResetPasswordStep("s2");
  };

  return (
    <div className="reset-form">
      <form className="form_ui" onSubmit={handleSubmit}>
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
            <div className="buttons">
              <Link to="/login" className="back">
                {lang === "ar" ? (
                  <i className="fa-light fa-arrow-right" />
                ) : (
                  <i className="fa-light fa-arrow-left" />
                )}
              </Link>
              <CustomButton fullWidth size="large">
                تأكيد
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetForm;
