import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
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

export default function AddAssistanceModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const { categories, isLoading } = useGetcategories();
  const { helpMechanisms, isLoading: helpLoading } = useGetHelpMechanisms();
  const { generateDes, isPending: isGenerating } = useGenerateDes();
  const { addNewAssistance, isPending } = useAddNewAssistance();
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

  const selectedHelpMechanism = watch("helpMechanism") || [];
  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profilePicture", file);
  };

  const onSubmit = async (data) => {
    console.log("Form Submitted: ", data);
    const formData = new FormData();
    if (data.profilePicture instanceof File) {
      formData.append("image", data.profilePicture);
    }
    if (data.ageOption === "defined") {
      formData.append("from_age", data.fromAge);
      formData.append("to_age", data.toAge);
    }
    formData.append("category_id", data.field);
    formData.append("sub_category_id", data.specialization);
    formData.append("title", data.title);
    formData.append("duration", data.duration);
    formData.append("price", data.price);
    formData.append("preferred_gender", data.gender);
    formData.append("notes", data.extraTerms);
    data.helpMechanism.forEach((id) => {
      formData.append("help_mechanism_ids[]", id);
    });
    addNewAssistance(formData, {
      onSuccess: (res) => {
        reset();
        setShowModal(false);
        queryClient.invalidateQueries({
          queryKey: ["my-assistances"],
        });
        toast.success(res?.message);
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
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
          console.log(res.text);

          setValue("title", res?.text || "");
        },
        onError: (error) => {
          toast.error(error?.message || t("failedToGenerate"));
        },
      }
    );
  };

  return (
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
        <h6>{t("website.platform.myAssistance.addNewOffer")}</h6>
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
                      src={URL.createObjectURL(profilePicture)}
                      alt="preview"
                      className="preview-img"
                    />
                  ) : (
                    <img src="/icons/add-photo.svg" alt="placeholder" />
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
                hint={t("website.platform.cv.specializationHint")}
              />
            </div>
            {/* Offer Title */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.myAssistance.offerTitle")}
                {...register("title")}
                error={errors.title?.message}
              />
            </div>
            {/* Gender */}
            <div className="col-12 col-md-6 p-2">
              <div className="identity-selector">
                <h6 className="identity-title">
                  {t("website.platform.myAssistance.identity")}
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
                        <img
                          src={`/icons/${g}-outlined.svg`}
                          alt={t(`auth.${g}`)}
                        />
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
            <div className="col-12 col-md-6 p-2">
              <div className="identity-selector">
                <h6 className="identity-title">
                  {t("website.platform.myAssistance.age")}
                </h6>
                <div className="identity-container">
                  <label
                    className={`identity-option ${
                      selectedAgeOption === "defined" ? "active" : ""
                    }`}
                  >
                    <span>{t("website.platform.myAssistance.defined")}</span>
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
                    <span>{t("website.platform.myAssistance.notDefined")}</span>
                    <input
                      type="radio"
                      value="notDefined"
                      {...register("ageOption")}
                    />
                  </label>
                </div>
              </div>
              {selectedAgeOption === "defined" && (
                <div className="d-flex mt-2 gap-2">
                  <InputField
                    placeholder={t("from")}
                    {...register("fromAge")}
                    error={errors.fromAge?.message}
                  />
                  <InputField
                    placeholder={t("to")}
                    {...register("toAge")}
                    error={errors.toAge?.message}
                  />
                </div>
              )}
            </div>
            {/* Duration */}
            <div className="col-12 col-md-6 p-2">
              <div className="d-flex align-items-end gap-2">
                <InputField
                  label={t("website.platform.myAssistance.duration")}
                  placeholder="00"
                  {...register("duration")}
                />
                <div className="duration-selector">
                  <label
                    className={`duration-option ${
                      watch("durationType") === "day" ? "active" : ""
                    }`}
                  >
                    <span>{t("website.platform.myAssistance.day")}</span>
                    <input
                      type="radio"
                      value="day"
                      {...register("durationType")}
                    />
                  </label>
                  <label
                    className={`duration-option ${
                      watch("durationType") === "month" ? "active" : ""
                    }`}
                  >
                    <span>{t("website.platform.myAssistance.month")}</span>
                    <input
                      type="radio"
                      value="month"
                      {...register("durationType")}
                    />
                  </label>
                </div>
              </div>
              <p className="error-text d-block">{errors.duration?.message}</p>
            </div>
            {/* Price */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.myAssistance.price")}
                placeholder="00"
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
                  {t("website.platform.myAssistance.helpMechanism")}
                </h6>
                <div className="identity-container">
                  {!helpLoading &&
                    helpMechanisms.map((option) => (
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
                  type="button"
                  size="large"
                  onClick={handleGeneratDes}
                  loading={isGenerating}
                  fullWidth
                  icon={<i className="fa-solid fa-sparkles"></i>}
                  style={{ backgroundColor: "#FDCB2F" }}
                >
                  {t("generate")}
                </CustomButton>
                <CustomButton
                  type="submit"
                  loading={isPending}
                  size="large"
                  fullWidth
                >
                  {t("add")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
