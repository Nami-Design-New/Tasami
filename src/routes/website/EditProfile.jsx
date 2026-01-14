import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useGetCities from "../../hooks/countries/useGetCities";
import useGetCountries from "../../hooks/countries/useGetCountries";
import useGetNationalities from "../../hooks/countries/useGetNationalities";
import useDeleteAccount from "../../hooks/website/profile/useDeleteAccount";
import useEditProfile from "../../hooks/website/profile/useEditProfile";
import { clearAuth, setUser } from "../../redux/slices/authRole";
import CustomButton from "../../ui/CustomButton";
import CustomPhoneInput from "../../ui/forms/CustomPhoneInput";
import DatePicker from "../../ui/forms/DatePicker";
import GenderSelect from "../../ui/forms/EditProfileGenderSelect";
import InputField from "../../ui/forms/InputField";
import PasswordField from "../../ui/forms/PasswordField";
import SelectField from "../../ui/forms/SelectField";
import AlertModal from "../../ui/website/platform/my-community/AlertModal";
import OtpModal from "../../ui/website/profile/OtpModal";
import { removeToken } from "../../utils/token";
import useProfileValidation from "../../validations/my-profile/my-profile-validation";
import DeleteAccountModal from "./DeleteAccountModal";
import usePhoneRegister from "../../hooks/auth/useSendOtpCode";
import addPhoto from "../../assets/icons/add-photo.svg";

export default function EditProfile() {
  const { user } = useSelector((state) => state.authRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editProfile, isEditingProfile } = useEditProfile();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
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
    getValues,
    formState: { errors },
  } = useProfileValidation();
  const { sendCode } = usePhoneRegister();
  const { data: countries, fetchNextPage } = useGetCountries();

  const profilePicture = watch("profilePicture");
  const wantChangePassword = watch("wantChangePassword");
  const gender = watch("gender");
  const countryId = watch("country");
  const phone = watch("phone");
  const phoneCode = watch("code");
  const phoneFlag = watch("phoneFlag");

  const { data, isLoading: isCountriesLoading } = useGetCountries({
    search: "",
    pagination: "off",
  });

  const { nationalities, isLoading: isNationaliesLoading } =
    useGetNationalities("", "off");
  const { cities, isCitiesLoading } = useGetCities({
    search: "",
    pagination: "off",
    countryId,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profilePicture", file);
  };

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  const isFirstNameDisabled = !!user?.first_name;
  const isDateDisabled = !!user?.birthdate;
  const isGenderDisabled = !!user?.gender;
  const isPhoneDisabled = !!user?.phone && !!user?.phone_code;

  const onSubmit = (data) => {
    if (!initialValues) return;

    const formData = new FormData();
    let hasChanges = false;

    // Helper function to check if value has changed
    const hasChanged = (field, newValue, oldValue) => {
      // Convert to string for comparison to handle different types
      return String(newValue || "") !== String(oldValue || "");
    };

    // Check and append only changed fields
    if (
      !isFirstNameDisabled &&
      hasChanged("firstName", data.firstName, initialValues.firstName)
    ) {
      formData.append("first_name", data.firstName);
      hasChanges = true;
    }

    if (hasChanged("lastName", data.lastName, initialValues.lastName)) {
      formData.append("last_name", data.lastName);
      hasChanges = true;
    }

    if (!isDateDisabled && hasChanged("date", data.date, initialValues.date)) {
      formData.append("birthdate", data.date);
      hasChanges = true;
    }

    if (
      !isGenderDisabled &&
      hasChanged("gender", data.gender, initialValues.gender)
    ) {
      formData.append("gender", data.gender);
      hasChanges = true;
    }

    if (
      !isPhoneDisabled &&
      hasChanged("phone", data.phone, initialValues.phone)
    ) {
      formData.append("phone", data.phone);
      hasChanges = true;
    }

    if (!isPhoneDisabled && hasChanged("code", data.code, initialValues.code)) {
      formData.append("phone_code", data.code);
      hasChanges = true;
    }

    if (hasChanged("email", data.email, initialValues.email)) {
      formData.append("email", data.email);
      hasChanges = true;
    }

    if (
      hasChanged("nationality", data.nationality, initialValues.nationality)
    ) {
      formData.append("nationality_id", data.nationality);
      hasChanges = true;
    }

    if (hasChanged("country", data.country, initialValues.country)) {
      formData.append("country_id", data.country);
      hasChanges = true;
    }

    if (hasChanged("city", data.city, initialValues.city)) {
      formData.append("city_id", data.city);
      hasChanges = true;
    }

    // Handle password change
    if (data.wantChangePassword) {
      formData.append("old_password", data.oldPassword || "");
      formData.append("password", data.newPassword || "");
      formData.append("password_confirmation", data.confirmPassword || "");
      hasChanges = true;
    }

    // Handle profile picture - only if it's a new file
    if (data.profilePicture && typeof data.profilePicture !== "string") {
      formData.append("image", data.profilePicture);
      hasChanges = true;
    }

    // If no changes, show a message
    if (!hasChanges) {
      toast.info(t("profile.noChanges") || "No changes to save");
      return;
    }

    editProfile(formData, {
      onSuccess: (res) => {
        dispatch(setUser(res.data));
        toast.success(res?.message);
        // Update initial values after successful save
        setInitialValues(data);
        queryClient.setQueryData(["authedUser"], (oldData) => {
          if (!oldData) return oldData;
          return res.data;
        });
        // queryClient.invalidateQueries({ queryKey: ["authedUser"] });
      },
      onError: (err) => {
        console.error("Failed to update profile:", err.message);
        toast.error(err.message);
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
        toast.error(err.message);
      },
    });
  };

  useEffect(() => {
    if (user) {
      const phone = user.phone || "";
      const code = user.phone_code || "";

      const values = {
        profilePicture: user.image,
        firstName: user.first_name,
        lastName: user.last_name,
        date: user.birthdate,
        gender: user.gender,
        nationality: String(user?.nationality?.id) || "",
        country: String(user?.country_id) || "",
        city: String(user?.city?.id) || "",
        phone,
        code,
        phoneFlag: user?.phone_flag,
        fullPhone: `${code}${phone}`,
        email: user.email,
        wantChangePassword: false,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      };

      reset(values);
      // Store initial values for comparison
      setInitialValues(values);
    }
  }, [user, reset]);

  const handleSend = () => {
    sendCode(
      { phone, code: phoneCode, type: "update_profile" },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setShowOtpModal(true);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <div className="edit-profile-page">
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 p-2">
            <p className="image-label">
              <span>{t("auth.profilePicture")}</span>{" "}
              <span>({t("auth.optional")})</span>
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
                  <img src={addPhoto} alt="placeholder" />
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
              disabled={isFirstNameDisabled ? true : false}
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
              disabled={isDateDisabled ? true : false}
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
              disabled={isGenderDisabled ? true : false}
              error={errors?.gender?.message}
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
                  options={data?.map((country) => ({
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
            <label className="label d-flex justify-content-between align-items-center">
              {t("profile.phone")}
              {!isPhoneDisabled && (
                <button
                  type="button"
                  onClick={handleSend}
                  className="link-styles"
                  style={{ fontSize: "12px", color: "#5fcafa" }}
                >
                  {" "}
                  {t("verify")}
                </button>
              )}
            </label>
            <Controller
              name="fullPhone"
              control={control}
              render={() => (
                <CustomPhoneInput
                  countries={countries || []}
                  onScrollEnd={() => {
                    fetchNextPage();
                  }}
                  value={{
                    phone: getValues("phone"),
                    code: getValues("code"),
                    fullPhone: getValues("fullPhone"),
                    image: phoneFlag,
                  }}
                  onChange={(val) => {
                    setValue("phone", val.phone);
                    setValue("code", val.code);
                    setValue("fullPhone", val.fullPhone);
                    setValue("phoneFlag", val.image);
                  }}
                  error={errors.phone?.message || errors.code?.message}
                  t={t}
                  disabled={isPhoneDisabled ? true : false}
                />
              )}
            />
          </div>

          <div className="col-12  p-2">
            <InputField
              label={t("profile.email")}
              id="email"
              type="email"
              disabled
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
              type="button"
              size="large"
              style={{
                display: "block",
                textAlign: "start",
                padding: "0",
                background: "transparent",
                color: "#ff7a59",
              }}
              onClick={() => setShowDeleteModal(true)}
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

      <DeleteAccountModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        showAlertModal={showAlertModal}
        setShowAlertModal={setShowAlertModal}
      />
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={handleDeleteAccount}
        loading={isDeletingAccount}
      >
        {t("profile.deleteAlertMessage")}
      </AlertModal>
      <OtpModal
        show={showOtpModal}
        setShowModal={setShowOtpModal}
        phone={phone}
        phoneCode={phoneCode}
      />
    </div>
  );
}
