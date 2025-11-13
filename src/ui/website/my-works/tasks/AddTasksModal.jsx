import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import InputField from "../../../forms/InputField";
import TextField from "../../../forms/TextField";
import { useTranslation } from "react-i18next";
import useAddTasksForm from "../../../../validations/works/add-tasks-form";
import SelectField from "../../../forms/SelectField";
import CustomButton from "../../../CustomButton";
import useGetTasksCategories from "../../../../hooks/website/MyWorks/tasks/useGetTasksCategories";
import useAddTasks from "../../../../hooks/website/MyWorks/tasks/useAddTasks";
import useUpdateTask from "../../../../hooks/website/MyWorks/tasks/useUpdateTask";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { formatYMD } from "../../../../utils/helper";

export default function AddTasksModal({
  showModal,
  setShowModal,
  taskId,
  taskData,
}) {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { taskaCategories, isLoading } = useGetTasksCategories();
  const { addNewTask, isPending } = useAddTasks();
  const { updateTask, isPending: updatingTask } = useUpdateTask();

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

  //  Populate form when editing an existing task
  useEffect(() => {
    if (taskData) {
      reset({
        taskDescription: taskData.title || "",
        taskCategory: taskData.task_category.id || "",
        expected_end_date: taskData.expected_end_date
          ? formatYMD(taskData.expected_end_date)
          : "",
        notes: taskData.notes || "",
        reminderNotifications: !!taskData.notification_repeat,
        notification_repeat: taskData.notification_repeat || "",
        notification_day: taskData.notification_day || "",
        notification_time: taskData.notification_time || "",
      });
    } else {
      reset(); // Clear form when switching to add mode
    }
  }, [taskData, reset]);

  // Handle Add / Update logic
  const onSubmit = (data) => {
    const payloadId = taskId || id;
    let payload;
    if (reminderNotifications) {
      payload = {
        task_category_id: data.taskCategory,
        title: data.taskDescription,
        expected_end_date: formatYMD(data.expected_end_date),
        notification_repeat: data.notification_repeat,
        notification_day:
          data.notification_day === "" ? undefined : data.notification_day,
        notification_time: data.notification_time,
        notes: data.notes,
        work_id: payloadId,
      };
    } else {
      payload = {
        task_category_id: data.taskCategory,
        title: data.taskDescription,
        expected_end_date: formatYMD(data.expected_end_date),
        notification_repeat: "none",
        notes: data.notes,
        work_id: payloadId,
      };
    }

    if (taskData) {
      // UPDATE MODE
      updateTask(
        { id: taskData.id, ...payload },
        {
          onSuccess: (res) => {
            toast.success(res?.message || t("works.task_updated"));
            queryClient.refetchQueries({ queryKey: ["work-tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task-details"] });
            setShowModal(false);
          },
          onError: (err) => toast.error(err.message),
        }
      );
    } else {
      // ADD MODE
      addNewTask(payload, {
        onSuccess: (res) => {
          console.log("iam in success");
          reset();
          toast.success(res?.message || t("works.task_added"));
          queryClient.refetchQueries({ queryKey: ["work-tasks"] });
          // queryClient.invalidateQueries({ queryKey: ["works-tasks"] });
          setShowModal(false);
        },
        onError: (err) => toast.error(err.message),
      });
    }
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
        <h6>{taskData ? t("works.updateTask") : t("works.newTask")}</h6>
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

            {/* Reminder notifications */}
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
              <CustomButton loading={isPending || updatingTask} size="large">
                {taskData ? t("works.update") : t("works.add")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
