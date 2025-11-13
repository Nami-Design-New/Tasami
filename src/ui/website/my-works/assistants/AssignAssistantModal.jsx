import { Modal } from "react-bootstrap";
import InputField from "../../../forms/InputField";
import { useTranslation } from "react-i18next";
import TextField from "../../../forms/TextField";
import CustomButton from "../../../CustomButton";
import useGetHelpMechanisms from "../../../../hooks/useGetHelpMechanisms";
import useAssignAssistantForm from "../../../../validations/works/assign-assistant-form";
import useAskForAssistant from "../../../../hooks/website/MyWorks/assistants/useAskForAssistant";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "react-router";

export default function AssignAssistantModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useAssignAssistantForm();
  const { helpMechanisms, isLoading: helpLoading } = useGetHelpMechanisms();
  const { askForAssistant, isPending } = useAskForAssistant();

  const month = watch("month");
  const day = watch("day");
  const durationInDays = Number(month) * 30 + Number(day);
  const selecteAssistnsOption = watch("assistantOption");
  const selectedHelpMechanism = watch("helpMechanism") || [];
  const selectedGender = watch("gender");
  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("preferred_gender", data.gender);
    data.helpMechanism.forEach((id) => {
      formData.append("help_mechanism_ids[]", id);
    });

    formData.append("notes", data.notes);
    formData.append(
      "help_start_date",
      data.startDate
        ? new Date(data.startDate).toISOString().split("T")[0]
        : null
    );
    formData.append("help_expected_days", durationInDays);
    formData.append("work_id", id);

    askForAssistant(formData, {
      onSuccess: (res) => {
        reset();
        setShowModal(false);
        queryClient.invalidateQueries({
          queryKey: ["assistants"],
        });
        queryClient.invalidateQueries({
          queryKey: ["work-details"],
        });
        setShowModal(false);
        queryClient.refetchQueries({ queryKey: ["homeData"] });
        queryClient.refetchQueries({ queryKey: ["work-group"] });
        toast.success(res?.message);
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };
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
        <h6>{t("assistant_modal_title")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Offer Title */}
            <div className="col-12 p-2">
              <TextField
                label={t("assistant_notes_label")}
                placeholder={t("assistant_notes_placeholder")}
                {...register("notes")}
                error={errors.notes?.message}
              />
            </div>{" "}
            <div className="col-12 col-lg-6 p-2">
              <InputField
                label={t("assistant_start_date")}
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
                  label={t("assistant_duration_label")}
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
            {/* Gender */}
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
                        <input type="radio" value={g} {...register("gender")} />
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
                  <p className="error-text">{errors.helpMechanism?.message}</p>
                </div>
              </div>
            </>
          </div>
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
