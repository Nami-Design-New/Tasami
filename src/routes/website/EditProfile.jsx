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
import { useEffect, useRef } from "react";
import useGetCountries from "../../hooks/countries/useGetCountries";
import useGetNationalities from "../../hooks/countries/useGetNationalities";
import useGetCities from "../../hooks/countries/useGetCities";

export default function EditProfile() {
  const { user } = useSelector((state) => state.authRole);
  const inputFileRef = useRef();
  const { countries, isLoading } = useGetCountries("", "off");
  const { nationalities, isLoading: isNationaliesLoading } =
    useGetNationalities("", "off");
  const { cities, isCitiesLoading } = useGetCities("", "off");
  console.log(user);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      profilePicture: "",
      firstName: "",
      lastName: "",
      date: "",
      gender: "",
      nationality: "",
      country: "",
      city: "",
      phone: "",
      email: "",
      wantChangePassword: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const profilePicture = watch("profilePicture");
  const wantChangePassword = watch("wantChangePassword");
  const gender = watch("gender");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profilePicture", file);
  };

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  const onSubmit = (data) => {
    console.log("بيانات الحساب:", data);
  };

  useEffect(() => {
    if (user) {
      reset({
        profilePicture: user.image,
        firstName: user.first_name,
        lastName: user.last_name,
        date: user.birthdate,
        gender: user.gender,
        nationality: String(user.nationality?.id ?? ""),
        country: String(user.country_id ?? ""),
        city: String(user.city?.id ?? ""),
        phone: user.phone,
        email: user.email,
        wantChangePassword: false,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  return (
    <div className="edit-profile-page">
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 p-2">
            <p className="image-label">
              <span>{t("auth.profilePicture")}</span>{" "}
              <span>&apos;{t("auth.optional")}&apos;</span>
            </p>
            <label className="images-input">
              <div className="image-input-wrapper">
                {profilePicture ? (
                  typeof profilePicture === "string" ? (
                    <img
                      src={profilePicture}
                      alt="preview"
                      className="preview-img"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(profilePicture)}
                      alt="preview"
                      className="preview-img"
                    />
                  )
                ) : (
                  <img src="/icons/add-photo.svg" alt="placeholder" />
                )}
                <button
                  onClick={handleButtonClick}
                  type="button"
                  className="add-image-buttton"
                >
                  <i className="fa-light fa-plus"></i>{" "}
                </button>
              </div>
              <input
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
            </label>
          </div>
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
              loading={isNationaliesLoading}
              label={t("profile.nationality")}
              id="nationality"
              options={nationalities?.data?.map((nationality) => ({
                value: nationality.id,
                name: nationality.title,
              }))}
              {...register("nationality")}
              error={errors.nationality?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label={t("profile.country")}
              id="country"
              options={countries?.data?.map((country) => ({
                value: country.id,
                name: country.title,
              }))}
              {...register("country")}
              error={errors.country?.message}
            />
          </div>
          <div className="col-12 col-lg-6 p-2">
            <SelectField
              loading={isCitiesLoading}
              label={t("profile.city")}
              id="city"
              options={cities?.data?.map((city) => ({
                value: city.id,
                name: city.title,
              }))}
              {...register("city")}
              error={errors.city?.message}
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
