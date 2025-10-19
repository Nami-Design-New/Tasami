import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useGetCities from "../../hooks/countries/useGetCities";
import useGetCountries from "../../hooks/countries/useGetCountries";
import useGetNationalities from "../../hooks/countries/useGetNationalities";
import useEditProfile from "../../hooks/website/profile/useEditProfile";
import { clearAuth, setUser } from "../../redux/slices/authRole";
import CustomButton from "../../ui/CustomButton";
import DatePicker from "../../ui/forms/DatePicker";
import GenderSelect from "../../ui/forms/GenderSelect copy";
import InputField from "../../ui/forms/InputField";
import PhoneField from "../../ui/forms/PhoneField";
import SelectField from "../../ui/forms/SelectField";
import useProfileValidation from "../../validations/my-profile/my-profile-validation";
import { Controller } from "react-hook-form";
import PasswordField from "../../ui/forms/PasswordField";
import AlertModal from "../../ui/website/platform/my-community/AlertModal";
import { removeToken } from "../../utils/token";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteAccount from "../../hooks/website/profile/useDeleteAccount";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function EditProfile() {
  const { user } = useSelector((state) => state.authRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editProfile, isEditingProfile } = useEditProfile();
  const [showAlertModal, setShowAlertModal] = useState(false);

  const inputFileRef = useRef();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useProfileValidation();

  const profilePicture = watch("profilePicture");
  const wantChangePassword = watch("wantChangePassword");
  const gender = watch("gender");
  const countryId = watch("country");

  const { countries, isLoading: isCountriesLoading } = useGetCountries({
    search: "",
    pagenation: "off",
  });
  const { nationalities, isLoading: isNationaliesLoading } =
    useGetNationalities("", "off");
  const { cities, isCitiesLoading } = useGetCities({
    search: "",
    pagenation: "off",
    countryId,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profilePicture", file);
  };

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // Required fields
    // formData.append("phone", data.phone);
    // formData.append("phone_code", "+966");
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("nationality_id", data.nationality);
    formData.append("country_id", data.country);
    formData.append("city_id", data.city);

    // Optional password fields
    if (data.wantChangePassword) {
      formData.append("old_password", data.oldPassword || "");
      formData.append("password", data.newPassword || "");
      formData.append("password_confirmation", data.confirmPassword || "");
    }

    // Optional profile picture
    if (data.profilePicture && typeof data.profilePicture !== "string") {
      formData.append("profilePicture", data.profilePicture);
    }

    editProfile(formData, {
      onSuccess: (res) => {
        dispatch(setUser(res.data));
      },
      onError: (err) => {
        console.error("Failed to update profile:", err.message);
      },
    });
  };

  const { deleteAccount, isDeletingAccount } = useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount(user.id, {
      onSuccess: (res) => {
        dispatch(clearAuth());
        removeToken();
        localStorage.removeItem("skipAreasOfInterest");
        queryClient.clear();
        queryClient.invalidateQueries();
        queryClient.removeQueries();

        navigate("/login");

        toast.success(res.message);
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.message);
      },
    });
  };

  useEffect(() => {
    if (user) {
      reset({
        profilePicture: user.image,
        firstName: user.first_name,
        lastName: user.last_name,
        date: user.birthdate,
        gender: user.gender,
        nationality: String(user?.nationality?.id) || "",
        country: String(user?.country_id) || "",
        city: String(user?.city?.id) || "",
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
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <SelectField
                  loading={isNationaliesLoading}
                  label={t("profile.nationality")}
                  id="nationality"
                  options={nationalities?.data?.map((nationality) => ({
                    value: nationality.id,
                    name: nationality.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.nationality?.message}
                />
              )}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SelectField
                  label={t("profile.country")}
                  loading={isCountriesLoading}
                  id="country"
                  options={countries?.data?.map((country) => ({
                    value: country.id,
                    name: country.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.country?.message}
                />
              )}
            />
          </div>
          <div className="col-12 col-lg-6 p-2">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <SelectField
                  loading={isCitiesLoading}
                  label={t("profile.city")}
                  id="city"
                  options={cities?.data?.map((city) => ({
                    value: city.id,
                    name: city.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.city?.message}
                />
              )}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <PhoneField
              label={t("profile.phone")}
              id="phone"
              type="phone"
              country="eg"
              disabled
              value={user?.phone_code + watch("phone")}
              {...register("phone")}
              error={errors.phone?.message}
            />
          </div>

          <div className="col-12  p-2">
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

          <div className="col-12  p-2">
            <div className="change-pasowrd">
              <label className="field-label" htmlFor="wantChangePassword">
                {t("profile.changePassword")}
              </label>
              <Form.Switch
                {...register("wantChangePassword")}
                id="wantChangePassword"
                checked={wantChangePassword}
              />
            </div>
          </div>

          {wantChangePassword === true && (
            <>
              <div className="col-12 col-lg-6 p-2">
                <PasswordField
                  label={t("profile.oldPassword")}
                  id="oldPassword"
                  type="password"
                  {...register("oldPassword")}
                  error={errors.oldPassword?.message}
                />
              </div>
              <div className="col-12 col-lg-6 p-2">
                <PasswordField
                  label={t("profile.newPassword")}
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  error={errors.newPassword?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <PasswordField
                  label={t("profile.confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </>
          )}
          <div className="col-12 p-2">
            <CustomButton
              size="large"
              style={{
                display: "block",
                textAlign: "start",
                padding: "0",
                background: "transparent",
                color: "#ff7a59",
              }}
              onClick={() => setShowAlertModal(true)}
            >
              {t("profile.deleteAccount")}
            </CustomButton>
          </div>
          <div className="col-12 p-2 mt-3">
            <div className="buttons justify-content-end">
              <CustomButton
                size="large"
                loading={isEditingProfile}
                type="submit"
              >
                {t("profile.save")}
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={handleDeleteAccount}
        loading={isDeletingAccount}
      >
        {t("profile.deleteAlertMessage")}
      </AlertModal>
    </div>
  );
}
