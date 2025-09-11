import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useRegister from "../../hooks/auth/useRegister";
import { persistor } from "../../redux/store";
import { formatYMD } from "../../utils/helper";
import CustomButton from "../CustomButton";
import BackButton from "../forms/BackButton";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";
import { setToken } from "../../utils/token";
import { setAuthed, setUser } from "../../redux/slices/authRole";

export default function AccountInfoForm({ setFormType }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { phoneCode, phone } = useSelector((state) => state.phone);
  const { signup, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  function handleBack(e) {
    e.preventDefault();
    setFormType("personalInfo");
  }

  async function onSubmit(data) {
    const payload = {
      phone,
      phone_code: phoneCode,
      first_name: data.firstName,
      last_name: data.middleName,
      birthdate: formatYMD(data.dateOfBirth),
      password: data.password,
      password_confirmation: data.confirmPassword,
      gender: data.gender,
      email: data.email,
      image: data.profilePicture,
    };

    signup(payload, {
      onSuccess: (data) => {
        navigate("/areas-of-interest");
        setToken(data.data.token);
        // dispatch(setUser(data.data));
        // dispatch(setAuthed(true));
        toast.success(data.message);
        persistor.purge();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  return (
    <div className="row">
      <div className="col-12 p-2">
        <label className="phone-label">{t("auth.phoneLabel")}</label>
        <PhoneInput
          country={"sa"}
          value={`${phoneCode}${phone}`}
          disableCountryCode
          disableDropdown
          disabled
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
        <InputField
          type="email"
          label={t("auth.emailAddress")}
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
      <div className="col-12 p-2">
        <PasswordField
          type="password"
          label={t("auth.password")}
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <div className="col-12 p-2">
        <PasswordField
          type="password"
          label={t("auth.confirmPassword")}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>
      <div className="col-12 p-2">
        <div className="buttons">
          <BackButton onClick={handleBack} />
          <CustomButton
            type="button"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            loading={isPending}
            size="large"
          >
            {t("auth.next")}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
