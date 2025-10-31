import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useGetcategories from "../../../hooks/area-of-interests/useGetcategories";
import useGetHelpMechanisms from "../../../hooks/useGetHelpMechanisms";
import useAddGoal from "../../../hooks/website/goals/useAddGoal";
import useGenerateDes from "../../../hooks/website/my-assistances/useGenerateDes";
import useAddGoalForm from "../../../validations/add-goal-validation";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import TextField from "../../forms/TextField";
import { useQueryClient } from "@tanstack/react-query";

export default function AddGoalModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { categories, isLoading } = useGetcategories();
  const { helpMechanisms, isLoading: helpLoading } = useGetHelpMechanisms();
  const { generateDes, isPending: isGenerating } = useGenerateDes();
  const { addNewGoal, isPending } = useAddGoal();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useAddGoalForm();

  const month = watch("month");
  const day = watch("day");
  const durationInDays = Number(month) * 30 + Number(day);
  const selecteAssistnsOption = watch("assistantOption");
  const selectedHelpMechanism = watch("helpMechanism") || [];
  const selectedGender = watch("gender");
  const selectedFieldId = watch("field");
  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  console.log(errors);
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.assistantOption === "defined") {
      formData.append("is_available_for_helper", 1);
      formData.append("preferred_gender", data.gender);
      data.helpMechanism.forEach((id) => {
        formData.append("help_mechanism_ids[]", id);
      });
    } else {
      formData.append("is_available_for_helper", 0);
    }
    formData.append("category_id", data.field);
    formData.append("sub_category_id", data.specialization);
    formData.append("title", data.title);
    formData.append(
      "start_date",
      data.startDate
        ? new Date(data.startDate).toISOString().split("T")[0]
        : null
    );
    formData.append("expected_duration", durationInDays);

    addNewGoal(formData, {
      onSuccess: (res) => {
        reset();
        setShowModal(false);
        queryClient.invalidateQueries({
          queryKey: ["goals"],
        });
        queryClient.refetchQueries({ queryKey: ["homeData"] });
        queryClient.refetchQueries({ queryKey: ["my-works"] });
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

  console.log(selecteAssistnsOption);

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <h6>{t("website.platform.myAssistance.addNewGoal")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
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
            </div>{" "}
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
            <div className="col-12 p-2">
              <TextField
                label={t("website.platform.myAssistance.goalTitle")}
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
                style={{
                  backgroundColor: "#FDCB2F",
                  marginTop: "12px",
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
            </div>{" "}
            <div className="col-12 col-lg-6 p-2">
              <InputField
                label={t("website.platform.myAssistance.startDate")}
                type="date"
                {...register("startDate")}
                error={errors?.startDate?.message}
              />
            </div>
            {/* Duration */}
            <div className="col-12 col-lg-6   p-2">
              <div
                className="d-flex align-items-end gap-2"
                style={{ whiteSpace: "noWrap" }}
              >
                <InputField
                  label={t("website.platform.myAssistance.goalDuration")}
                  placeholder="00"
                  {...register("month")}
                  icon={"/icons/month.svg"}
                />
                <InputField
                  placeholder="00"
                  {...register("day")}
                  icon={"/icons/day.svg"}
                />
              </div>
              <p className="mt-2" style={{ color: "gray" }}>
                {t("website.platform.myAssistance.totalDuration", {
                  duration: durationInDays,
                })}
              </p>
              <p className="error-text d-block">
                {errors?.month?.message}
                {errors?.day?.message}
              </p>
            </div>{" "}
            {/* Assistant Option */}
            <div className="col-12  p-2">
              <div className="identity-selector">
                <h6 className="identity-title">
                  {t("website.platform.myAssistance.addAssistant")}
                </h6>
                <div className="d-flex align-items-center gap-0 ">
                  <div
                    className="identity-container p-1 "
                    style={{
                      backgroundColor: "#0D0D0D05",
                      borderRadius: "12px",
                    }}
                  >
                    <label
                      className={`identity-option  ${
                        selecteAssistnsOption === "defined" ? "active" : ""
                      }`}
                      style={{ border: "none" }}
                    >
                      <span>{t("website.platform.myAssistance.yes")}</span>
                      <input
                        type="radio"
                        value="defined"
                        {...register("assistantOption")}
                      />
                    </label>
                    <label
                      className={`identity-option ${
                        selecteAssistnsOption === "notDefined" ? "active" : ""
                      }`}
                      style={{ border: "none" }}
                    >
                      <span>{t("website.platform.myAssistance.no")}</span>
                      <input
                        type="radio"
                        value="notDefined"
                        {...register("assistantOption")}
                      />
                    </label>
                  </div>
                </div>
                <p className="error-text"></p>
              </div>
            </div>
            {/* Gender */}
            {selecteAssistnsOption === "defined" && (
              <>
                <div className="col-12  p-2">
                  <div className="identity-selector">
                    <h6 className="identity-title">
                      {t("website.platform.myAssistance.identity")}
                    </h6>
                    <div className="identity-container gap-2">
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
                          <input
                            type="radio"
                            value={g}
                            {...register("gender")}
                          />
                        </label>
                      ))}
                    </div>
                    <p className="error-text">{errors.gender?.message}</p>
                  </div>
                </div>
                {/* Help Mechanism */}
                <div className="col-12 p-2">
                  <div className="identity-selector">
                    <h6 className="identity-title">
                      {t("website.platform.myAssistance.helpMechanism")}
                    </h6>
                    <div className="identity-container gap-2">
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
                    <p className="error-text">
                      {errors.helpMechanism?.message}
                    </p>
                  </div>
                </div>{" "}
              </>
            )}
          </div>{" "}
          {/* Buttons */}
          <div className="col-12 p-2">
            <div className="buttons">
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
        </form>
      </Modal.Body>
    </Modal>
  );
}
