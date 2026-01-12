import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useGetcategories from "../../../hooks/area-of-interests/useGetcategories";
import useGetHelpMechanisms from "../../../hooks/useGetHelpMechanisms";
import useAddNewAssistance from "../../../hooks/website/my-assistances/useAddNewAssistance";
import useAddAssistanceForm from "../../../validations/add-assistance/add-assistance-validation";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import useGenerateDes from "../../../hooks/website/my-assistances/useGenerateDes";
import TextField from "../../forms/TextField";
import useEditAssistance from "../../../hooks/website/my-assistances/useEditAssistance";
import { Link } from "react-router";
import ToastSuccessModal from "../gaols/ToastSuccessModal";
import addphoto from "../../../assets/icons/add-photo.svg";
import successMark from "../../../assets//icons/toasts/success-mark.svg";
import maleIcon from "../../../assets/icons/male-outlined.svg";
import femaleIcon from "../../../assets/icons/female-outlined.svg";
const genderIcons = {
  male: maleIcon,
  female: femaleIcon,
};
export default function AddAssistanceModal({
  showModal,
  setShowModal,
  offer,
  isEdit = false,
}) {
  const { t } = useTranslation();
  const { categories, isLoading } = useGetcategories();
  const { helpMechanisms, isLoading: helpLoading } = useGetHelpMechanisms();
  const { generateDes, isPending: isGenerating } = useGenerateDes();
  const { addNewAssistance, isPending } = useAddNewAssistance();
  const { editYourAssistance, isPending: isEditing } = useEditAssistance();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const queryClient = useQueryClient();
  const inputFileRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useAddAssistanceForm();

  const profilePicture = watch("profilePicture");
  const selectedFieldId = watch("field");
  const selectedGender = watch("gender");
  const selectedAgeOption = watch("ageOption");
  const month = watch("month");
  const day = watch("day");
  const durationInDays = Number(month) * 30 + Number(day);

  const selectedHelpMechanism = watch("helpMechanism") || [];

  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profilePicture", file);
  };

  /**  Prefill form when editing */
  useEffect(() => {
    if (isEdit && offer) {
      const months = offer?.help_service?.duration
        ? Math.floor(offer?.help_service?.duration / 30)
        : "";
      const days = offer?.help_service?.duration
        ? offer?.help_service?.duration % 30
        : "";

      reset({
        field: String(offer?.category_id) || "",
        specialization: String(offer?.sub_category_id) || "",
        title: offer?.title || "",
        price: offer?.help_service?.price || "",
        gender: offer?.help_service?.preferred_gender || "both",
        ageOption:
          offer?.help_service?.from_age || offer?.help_service?.to_age
            ? "defined"
            : "notDefined",
        fromAge: offer?.help_service?.from_age || "",
        toAge: offer?.help_service?.to_age || "",
        month: months,
        day: days,
        extraTerms: offer?.help_service?.notes || "",
        helpMechanism:
          offer?.mechanisms?.map((m) => String(m.mechanism_id)) || [],
        profilePicture: offer.help_service.image || "",
      });
    }
  }, [isEdit, offer, reset]);

  /**  Submit Handler */
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data?.profilePicture instanceof File) {
      formData.append("image", data?.profilePicture);
    }

    if (data.ageOption === "defined") {
      formData.append("from_age", data.fromAge);
      formData.append("to_age", data.toAge);
    }

    formData.append("category_id", data.field);
    formData.append("sub_category_id", data.specialization);
    formData.append("title", data.title);
    formData.append("duration", durationInDays);
    formData.append("price", data.price);
    formData.append("preferred_gender", data.gender);
    formData.append("notes", data.extraTerms);

    data.helpMechanism.forEach((id) => {
      formData.append("help_mechanism_ids[]", id);
    });

    const commonSuccess = (res) => {
      reset();

      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["my-assistances"] });
      queryClient.invalidateQueries({ queryKey: ["offer-details"] });
      queryClient.invalidateQueries({ queryKey: ["personal-assistants"] });
      queryClient.refetchQueries({ queryKey: ["homeData"] });
      toast.success(res?.message);
    };

    const commonError = (error) => {
      toast.error(error?.message);
    };

    if (isEdit && offer?.id) {
      formData.append("_method", "PUT");
      editYourAssistance(
        { id: offer?.id, body: formData },
        {
          onSuccess: commonSuccess,
          onError: commonError,
        }
      );
    } else {
      // Add Mode
      addNewAssistance(formData, {
        onSuccess: () => {
          setShowSuccessModal(true);
          commonSuccess();
        },
        onError: commonError,
      });
    }
  };

  const handleGeneratDes = async () => {
    const title = watch("title");

    if (!title) {
      toast.error(t("pleaseFillRequiredFields"));
      return;
    }

    generateDes(
      { text: title, page: "help_service" },
      {
        onSuccess: (res) => {
          setValue("title", res?.text || "");
        },
        onError: (error) => {
          toast.error(error?.message || t("failedToGenerate"));
        },
      }
    );
  };

  return (
    <>
      <Modal
        centered
        show={showModal}
        onHide={() => {
          setShowModal(false);
          reset();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <h6>
            {/* {t("website.platform.myAssistance.addNewOffer")} */}
            {isEdit
              ? t("website.platform.myAssistance.editOffer")
              : t("website.platform.myAssistance.addNewOffer")}
          </h6>
        </Modal.Header>
        <Modal.Body>
          <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {" "}
              <div className="col-12 p-2">
                <p className="image-label">
                  <span>{t("website.platform.myCommunity.coverPicture")}</span>{" "}
                  <span></span>
                </p>
                <label className="images-input w-100">
                  <div className="image-input-wrapper community-cover">
                    {profilePicture ? (
                      <img
                        src={
                          profilePicture instanceof File
                            ? URL.createObjectURL(profilePicture)
                            : profilePicture
                        }
                        alt="preview"
                        className="preview-img"
                      />
                    ) : (
                      <img src={addphoto} alt="placeholder" />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={inputFileRef}
                    onChange={handleFileChange}
                  />
                  <p className="error-text">{errors.profilePicture?.message}</p>
                </label>
              </div>
              {/* Field */}
              <div className="col-12 col-md-6 p-2">
                <SelectField
                  loading={isLoading}
                  label={t("website.platform.cv.field")}
                  {...register("field")}
                  options={categories?.map((category) => ({
                    value: category?.id,
                    name: category?.title,
                  }))}
                  error={errors.field?.message}
                />
              </div>
              {/* Specialization */}
              <div className="col-12 col-md-6 p-2">
                <SelectField
                  label={t("website.platform.cv.specialization")}
                  {...register("specialization")}
                  options={subCategories.map((sub) => ({
                    value: sub.id,
                    name: sub.title,
                  }))}
                  error={errors.specialization?.message}
                >
                  <p className="contact-hint">
                    {t("website.platform.cv.specializationHint1")}
                    <Link to={"/contact"} className="customer-service-link">
                      {t("website.platform.cv.specializationHintLink")}
                    </Link>
                    <span className="contact-hint">
                      {t("website.platform.cv.specializationHint2")}
                    </span>
                  </p>
                </SelectField>
              </div>
              {/* Offer Title */}
              <div className="col-12 p-2">
                <TextField
                  label={t("website.platform.myAssistance.offerTitle")}
                  {...register("title")}
                  error={errors.title?.message}
                />
                <CustomButton
                  type="button"
                  size="large"
                  onClick={handleGeneratDes}
                  loading={isGenerating}
                  fullWidth
                  icon={<i className="fa-solid fa-sparkles"></i>}
                  className="generate-button"
                  style={{
                    opacity: !watch("title")?.trim() || isGenerating ? 0.5 : 1,
                    cursor:
                      !watch("title")?.trim() || isGenerating
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={!watch("title")?.trim() || isGenerating}
                >
                  {t("generate")}
                </CustomButton>
              </div>
              {/* Gender */}
              <div className="col-12  p-2">
                <div className="identity-selector">
                  <h6 className="identity-title">
                    {t("beneficiaryIdentityPreference")}
                  </h6>
                  <div className="identity-container">
                    {["both", "male", "female"].map((g) => (
                      <label
                        key={g}
                        className={`identity-option ${
                          selectedGender === g ? "active" : ""
                        }`}
                      >
                        {g !== "both" && (
                          <img src={genderIcons[g]} alt={t(`auth.${g}`)} />
                        )}
                        <span>{t(`auth.${g}`)}</span>
                        <input type="radio" value={g} {...register("gender")} />
                      </label>
                    ))}
                  </div>
                  <p className="error-text">{errors.gender?.message}</p>
                </div>
              </div>
              {/* Age Range */}
              <div className="col-12  p-2">
                <div className="identity-selector">
                  <h6 className="identity-title">
                    {t("website.platform.myAssistance.age")}
                  </h6>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="identity-container"
                      style={{ flexWrap: "nowrap" }}
                    >
                      <label
                        className={`identity-option ${
                          selectedAgeOption === "defined" ? "active" : ""
                        }`}
                      >
                        <span>
                          {t("website.platform.myAssistance.defined")}
                        </span>
                        <input
                          type="radio"
                          value="defined"
                          {...register("ageOption")}
                        />
                      </label>
                      <label
                        className={`identity-option ${
                          selectedAgeOption === "notDefined" ? "active" : ""
                        }`}
                      >
                        <span>
                          {t("website.platform.myAssistance.notDefined")}
                        </span>
                        <input
                          type="radio"
                          value="notDefined"
                          {...register("ageOption")}
                        />
                      </label>
                    </div>
                    {selectedAgeOption === "defined" && (
                      <div className="d-flex gap-2 flex-grow-1">
                        <InputField
                          placeholder={t("from")}
                          {...register("fromAge")}
                        />
                        <InputField
                          placeholder={t("to")}
                          {...register("toAge")}
                        />
                      </div>
                    )}
                  </div>
                  <p className="error-text">
                    <span>{errors?.fromAge && errors.fromAge.message}</span>
                    <span>
                      {errors?.toAge && ` , ${errors.toAge.message} `}{" "}
                    </span>
                  </p>
                </div>
              </div>
              {/* Duration */}
              <div className="col-12  p-2">
                <div className="d-flex align-items-end gap-2">
                  <InputField
                    label={t("website.platform.myAssistance.duration")}
                    {...register("month")}
                    icon={"/icons/month.svg"}
                  />
                  <InputField {...register("day")} icon={"/icons/day.svg"} />
                </div>
                {!isNaN(durationInDays) && (
                  <p className="mt-2" style={{ color: "gray" }}>
                    {t("website.platform.myAssistance.totalDuration", {
                      duration: durationInDays,
                    })}
                  </p>
                )}
                <p className="error-text d-block">
                  {errors?.month?.message}
                  {errors?.day?.message}
                </p>
              </div>
              {/* Price */}
              <div className="col-12 col-md-6 p-2">
                <InputField
                  label={t("website.platform.myAssistance.price")}
                  icon="/icons/ryal.svg"
                  {...register("price")}
                  error={errors.price?.message}
                />
              </div>
              {/* Extra Terms */}
              <div className="col-12 col-md-6 p-2">
                <InputField
                  label={t("website.platform.myAssistance.extraTerms")}
                  hint={t("optional")}
                  placeholder={t(
                    "website.platform.myAssistance.extraTermsPlaceholder"
                  )}
                  {...register("extraTerms")}
                />
              </div>
              {/* Help Mechanism */}
              <div className="col-12 p-2">
                <div className="identity-selector">
                  <h6 className="identity-title">
                    {t("website.platform.myAssistance.helpMechanism")}{" "}
                    <span className="d-block input-label-hint">
                      {t("website.platform.myAssistance.subTitle")}
                    </span>
                  </h6>
                  <div className="identity-container">
                    {!helpLoading &&
                      helpMechanisms?.map((option) => (
                        <label
                          key={option.id}
                          className={`identity-option ${
                            selectedHelpMechanism.includes(String(option.id))
                              ? "active"
                              : ""
                          }`}
                        >
                          <span>{option.title}</span>
                          <input
                            type="checkbox"
                            value={option.id}
                            {...register("helpMechanism")}
                          />
                        </label>
                      ))}
                  </div>
                  <p className="error-text">{errors.helpMechanism?.message}</p>
                </div>
              </div>
              {/* Buttons */}
              <div className="col-12 p-2">
                <div className="buttons">
                  <CustomButton
                    type="submit"
                    loading={isEdit ? isEditing : isPending}
                    size="large"
                    fullWidth
                  >
                    {isEdit ? t("edit") : t("add")}
                  </CustomButton>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastSuccessModal
        showModal={showSuccessModal}
        setShowModal={setShowSuccessModal}
        title={""}
      >
        <div className="d-flex align-items-center justify-content-center flex-column gap-3">
          <img src={successMark} width={100} height={100} />

          {/* <h4 className="toast-header">{t("goalSuccesMessage1")}</h4> */}
          <p className="toast-message">{t("offerSuccesMessage2")}</p>
        </div>
        <div className="w-100 d-flex  justify-content-end py-2 mt-2">
          <CustomButton
            color="success"
            onClick={() => setShowSuccessModal(false)}
          >
            {t("ok")}
          </CustomButton>
        </div>
      </ToastSuccessModal>
    </>
  );
}
