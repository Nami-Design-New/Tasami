import React from "react";
import { Form, Modal } from "react-bootstrap";
import InputField from "../../../forms/InputField";
import TextField from "../../../forms/TextField";
import { useTranslation } from "react-i18next";
import useAddTasksForm from "../../../../validations/works/add-tasks-form";
import SelectField from "../../../forms/SelectField";
import CustomButton from "../../../CustomButton";
import useGetTasksCategories from "../../../../hooks/website/MyWorks/tasks/useGetTasksCategories";
import useAddTasks from "../../../../hooks/website/MyWorks/tasks/useAddTasks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { formatYMD } from "../../../../utils/helper";

export default function AddTasksModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { taskaCategories, isLoading } = useGetTasksCategories();
  const { addNewTask, isPending } = useAddTasks();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useAddTasksForm();

  const reminderNotifications = watch("reminderNotifications");
  const notificationRepeat = watch("notification_repeat");

  const expectedEndDate = watch("expected_end_date");

  const onSubmit = (data) => {
    console.log("Form submitted:", data);

    const payload = {
      task_category_id: data.taskCategory,
      title: data.taskDescription,
      expected_end_date: formatYMD(data.expected_end_date),
      notification_repeat: data.notification_repeat,
      notification_day:
        data.notification_day === "" ? undefined : data.notification_day,
      notification_time: data.notification_time,
      notes: data.notes,
      work_id: id,
    };
    addNewTask(payload, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message);
        queryClient.invalidateQueries({ queryKey: ["works-tasks"] });
        setShowModal(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <h5>{t("works.new_task")}</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <TextField
                label={t("works.task_description")}
                {...register("taskDescription")}
                error={errors.taskDescription?.message}
              />
            </div>

            <div className="col-6 p-2">
              <SelectField
                label={t("works.task_category")}
                {...register("taskCategory")}
                options={taskaCategories?.map((cat) => ({
                  value: cat?.id,
                  name: cat?.title,
                }))}
                loading={isLoading}
                error={errors.taskCategory?.message}
              />
            </div>

            <div className="col-6 p-2">
              <InputField
                type="date"
                label={t("works.expected_end_date")}
                {...register("expected_end_date")}
                error={errors.expected_end_date?.message}
              />
            </div>

            <div className="col-12 p-2">
              <TextField
                label={t("works.notes")}
                {...register("notes")}
                error={errors.notes?.message}
              />
            </div>

            <div className="col-12 p-2">
              <div className="change-pasowrd">
                <label className="field-label" htmlFor="reminderNotifications">
                  {t("works.reminder_notifications")}
                </label>
                <Form.Switch
                  id="reminderNotifications"
                  {...register("reminderNotifications")}
                  disabled={
                    !expectedEndDate || errors?.expected_end_date?.message
                  }
                />
              </div>
              {(!expectedEndDate || errors?.expected_end_date?.message) && (
                <p className="hint mt-1">
                  {t("works.fill_required_fields_first")}
                </p>
              )}
            </div>

            {reminderNotifications && (
              <>
                <div className="col-12 p-2">
                  <div className="identity-selector">
                    <h6 className="identity-title">{t("works.repeat")}</h6>
                    <div className="identity-container">
                      {["daily", "weekly"].map((type) => (
                        <label
                          key={type}
                          className={`identity-option ${
                            notificationRepeat === type ? "active" : ""
                          }`}
                        >
                          <span>{t(`works.${type}`)}</span>
                          <input
                            type="radio"
                            value={type}
                            {...register("notification_repeat")}
                          />
                        </label>
                      ))}
                    </div>
                    <p className="error-text">
                      {errors.notification_repeat?.message}
                    </p>
                  </div>
                </div>

                {notificationRepeat === "weekly" && (
                  <div className="col-6 p-2">
                    <SelectField
                      label={t("works.day")}
                      {...register("notification_day")}
                      error={errors.notification_day?.message}
                      options={[
                        { name: t("works.monday"), value: "monday" },
                        { name: t("works.tuesday"), value: "tuesday" },
                        { name: t("works.wednesday"), value: "wednesday" },
                        { name: t("works.thursday"), value: "thursday" },
                        { name: t("works.friday"), value: "friday" },
                        { name: t("works.saturday"), value: "saturday" },
                        { name: t("works.sunday"), value: "sunday" },
                      ]}
                    />
                  </div>
                )}

                {(notificationRepeat === "daily" ||
                  notificationRepeat === "weekly") && (
                  <div className="col-6 p-2">
                    <InputField
                      type="time"
                      label={t("works.time")}
                      {...register("notification_time")}
                      error={errors.notification_time?.message}
                    />
                  </div>
                )}
              </>
            )}

            <div className="col-12 p-2">
              <CustomButton loading={isPending} size="large">
                {t("works.add")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
