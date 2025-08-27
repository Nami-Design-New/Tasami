import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomButton from "../CustomButton";
import BackButton from "../forms/BackButton";
import InputField from "../forms/InputField";

export default function PersonalInfoForm({ setFormType, setRegisterStep }) {
  const inputFileRef = useRef();
  const { t } = useTranslation();
  const {
    register,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedGender = watch("gender");
  const profilePicture = watch("profilePicture");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profilePicture", file);
  };

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  async function handleNext() {
    const isValid = await trigger([
      "profilePicture",
      "firstName",
      "middleName",
      "dateOfBirth",
      "gender",
    ]);
    if (!isValid) return;
    setFormType("accountInfo");
  }
  return (
    <div className="row ">
      <div className="col-12 p-2">
        <p className="image-label">
          <span>{t("auth.profilePicture")}</span>{" "}
          <span>&apos;{t("auth.optional")}&apos;</span>
        </p>
        <label className="images-input">
          <div className="image-input-wrapper">
            {profilePicture ? (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="preview"
                className="preview-img"
              />
            ) : (
              <img src="/icons/add-photo.svg" />
            )}
            <button
              onClick={handleButtonClick}
              type="button"
              className="add-image-buttton"
            >
              <i className="fa-light fa-plus"></i>{" "}
            </button>
          </div>
          <input type="file" ref={inputFileRef} onChange={handleFileChange} />
        </label>
      </div>
      <div className="col-12 p-2">
        <InputField
          type="text"
          label={t("auth.firstName")}
          {...register("firstName")}
          error={errors.firstName?.message}
        />
      </div>
      <div className="col-12 p-2">
        <InputField
          type="text"
          label={t("auth.middleNameOrInitial")}
          {...register("middleName")}
          error={errors.middleName?.message}
        />
      </div>
      <div className="col-12 p-2">
        <InputField
          type="date"
          label={t("auth.dateOfBirth")}
          {...register("dateOfBirth")}
          error={errors.dateOfBirth?.message}
        />
      </div>
      <div className="col-12 p-2">
        <div className="identity-selector">
          <h6 className="identity-title">{t("auth.identity")}</h6>
          <div className="identity-container">
            <label
              className={`identity-option ${
                selectedGender === "male" ? "active" : ""
              }`}
            >
              <img src="/icons/male-outlined.svg" alt={t("auth.male")} />
              <span>{t("auth.male")}</span>
              <input
                type="radio"
                name="gender"
                value="male"
                {...register("gender")}
              />
            </label>
            <label
              className={`identity-option ${
                selectedGender === "female" ? "active" : ""
              }`}
            >
              <img src="/icons/female-outlined.svg" alt={t("auth.female")} />
              <span>{t("auth.female")}</span>
              <input
                type="radio"
                name="gender"
                value="female"
                {...register("gender")}
              />
            </label>
          </div>
          <p className="error-text">{errors.gender?.message}</p>
        </div>
      </div>
      <div className="col-12 p-2">
        <div className="buttons">
          <BackButton onClick={() => setRegisterStep(1)} />
          <CustomButton
            type="button"
            fullWidth
            size="large"
            onClick={handleNext}
          >
            {t("auth.next")}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
