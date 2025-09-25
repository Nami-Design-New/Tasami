import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useGetcategories from "../../../../hooks/area-of-interests/useGetcategories";
import useAddMeeting from "../../../../hooks/website/communities/mettings/useAddMeeting";
import useAddMeetingForm from "../../../../validations/meetings/add-meeting";
import CustomButton from "../../../CustomButton";
import InputField from "../../../forms/InputField";
import SelectField from "../../../forms/SelectField";
import TextField from "../../../forms/TextField";

export default function AddMeetingModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { categories, isLoading } = useGetcategories();
  const { addMeeting, isPending } = useAddMeeting();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useAddMeetingForm();

  const selectedFieldId = watch("field");
  const selectedMeetingType = watch("meetingType");

  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  // ✅ Handle form submit
  const onSubmit = (data) => {
    const payload = {
      category_id: data.field,
      sub_category_id: data.specialization,
      title: data.title,
      desc: data.description,
      start_date: data.date,
      start_time: data.time,
      duration: data.duration,
      link: data.link,
      is_private: data.meetingType,
    };

    addMeeting(payload, {
      onSuccess: (res) => {
        setShowModal(false);
        reset();
        toast.success(t(res.message || "Meeting added successfully"));
        queryClient.invalidateQueries({ queryKey: ["meetings"] });
      },
      onError: (error) => {
        console.error("Error adding meeting:", error);
        toast.error(error.message || "Error adding meeting");
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
        <h5>{t("community.addMeeting")}</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Field */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                loading={isLoading}
                label={t("community.field")}
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
                label={t("community.specialization")}
                {...register("specialization")}
                options={subCategories.map((sub) => ({
                  value: sub.id,
                  name: sub.title,
                }))}
                error={errors.specialization?.message}
              />
            </div>

            <div className="col-12 p-2">
              <InputField
                label={t("community.meetingTitle")}
                placeholder={t("community.meetingTitlePlaceholder")}
                {...register("title")}
                error={errors.title?.message}
              />
            </div>

            <div className="col-12 p-2">
              <TextField
                label={t("community.description")}
                placeholder={t("community.descriptionPlaceholder")}
                {...register("description")}
                error={errors.description?.message}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <InputField
                type="date"
                label={t("community.date")}
                placeholder={t("community.datePlaceholder")}
                {...register("date")}
                error={errors.date?.message}
              />
            </div>

            <div className="col-12 col-md-3 p-2">
              <InputField
                label={t("community.time")}
                placeholder={t("community.timePlaceholder")}
                {...register("time")}
                error={errors.time?.message}
                type="time"
              />
            </div>

            <div className="col-12 col-md-3 p-2">
              <InputField
                label={t("community.duration")}
                placeholder={t("community.durationPlaceholder")}
                {...register("duration")}
                error={errors.duration?.message}
                defaultValue="00:00" // optional default
                step="60"
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("community.link")}
                placeholder={t("community.linkPlaceholder")}
                {...register("link")}
                error={errors.title?.message}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <p className="label">{t("community.visibility")}</p>
              <div className="identity-container">
                <label
                  className={`identity-option ${
                    selectedMeetingType === "0" ? "active" : ""
                  }`}
                >
                  <input type="radio" value="0" {...register("meetingType")} />
                  <span>{t("membersOnly")}</span>
                </label>

                <label
                  className={`identity-option ${
                    selectedMeetingType === "1" ? "active" : ""
                  }`}
                >
                  <input type="radio" value="1" {...register("meetingType")} />
                  <span>{t("public")}</span>
                </label>
              </div>
              {errors && (
                <p className="error-text">{errors.meetingType?.message}</p>
              )}
            </div>

            <div className="col-12 p-2">
              <div className="buttons justify-content-end">
                <CustomButton loading={isPending} type="submit" size="large">
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
