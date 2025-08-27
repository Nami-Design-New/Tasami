import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CheckField from "../../ui/forms/CheckField";
import DatePicker from "../../ui/forms/DatePicker";
import GenderSelect from "../../ui/forms/GenderSelect copy";
import InputField from "../../ui/forms/InputField";
import PhoneField from "../../ui/forms/PhoneField";
import SelectField from "../../ui/forms/SelectField";
import SubmitButton from "../../ui/forms/SubmitButton";

export default function EditProfile() {
  const { user } = useSelector((state) => state.authRole);
  console.log(user);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      date: user.birthdate,
      gender: user.gender,
      nationality: user.nationality,
      country: user.phone_code,
      phone: user.phone,
      email: user.email,
      wantChangePassword: false,
    },
  });

  const wantChangePassword = watch("wantChangePassword");
  const gender = watch("gender");

  const onSubmit = (data) => {
    console.log("بيانات الحساب:", data);
  };

  return (
    <div className="edit-profile-page container">
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 col-lg-6 p-2">
            <InputField
              label={t("profile.firstName")}
              id="firstName"
              {...register("firstName", {
                required: t("validation.required"),
              })}
              error={errors.firstName?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <InputField
              label={t("profile.lastName")}
              id="lastName"
              {...register("lastName", {
                required: t("validation.required"),
              })}
              error={errors.lastName?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <DatePicker
              label={t("profile.date")}
              id="date"
              {...register("date", {
                required: t("validation.required"),
              })}
              error={errors.date?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <GenderSelect
              value={gender}
              onChange={(val) => setValue("gender", val)}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label={t("profile.nationality")}
              id="nationality"
              options={[
                { value: "EG", name: t("EG") },
                { value: "SA", name: t("SA") },
                { value: "AE", name: t("AE") },
                { value: "JO", name: t("JO") },
              ]}
              {...register("nationality")}
              error={errors.nationality?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label={t("profile.country")}
              id="country"
              options={[
                { value: "EG", name: t("EG") },
                { value: "SA", name: t("SA") },
                { value: "AE", name: t("AE") },
                { value: "QA", name: t("QA") },
              ]}
              {...register("country")}
              error={errors.country?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <PhoneField
              label={t("profile.phone")}
              id="phone"
              type="phone"
              country={"eg"}
              {...register("phone", {
                required: t("validation.required"),
              })}
              error={errors.phone?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <InputField
              label={t("profile.email")}
              id="email"
              type="email"
              {...register("email", {
                required: t("validation.required"),
              })}
              error={errors.email?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <CheckField
              label={t("profile.changePassword")}
              id="wantChangePassword"
              value={wantChangePassword}
              activeValue={true}
              inactiveValue={false}
              activeLabel={t("profile.yes")}
              inactiveLabel={t("profile.no")}
              onChange={(e) => setValue("wantChangePassword", e.target.value)}
            />
          </div>

          {wantChangePassword === true && (
            <>
              <div className="col-12 col-lg-6 p-2 mt-2">
                <InputField
                  label={t("profile.oldPassword")}
                  id="oldPassword"
                  type="password"
                  {...register("oldPassword")}
                  error={errors.oldPassword?.message}
                />
              </div>
              <div className="col-12 col-lg-6 p-2">
                <InputField
                  label={t("profile.newPassword")}
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  error={errors.newPassword?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <InputField
                  label={t("profile.confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </>
          )}

          <div className="col-12 p-2 mt-3">
            <div className="buttons">
              <SubmitButton text={t("profile.save")} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
