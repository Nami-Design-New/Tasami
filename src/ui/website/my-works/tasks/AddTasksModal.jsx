import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";
import useAddTasks from "../../../../hooks/website/MyWorks/tasks/useAddTasks";
import useGetTasksCategories from "../../../../hooks/website/MyWorks/tasks/useGetTasksCategories";
import useUpdateTask from "../../../../hooks/website/MyWorks/tasks/useUpdateTask";
import { formatYMD } from "../../../../utils/helper";
import useAddTasksForm, {
  getAvailableTaskRepetitions,
  TASK_NOTE_MAX_LENGTH,
} from "../../../../validations/works/add-tasks-form";
import {
  hasTaskStartDatePassed,
  normalizeTaskScheduleDate,
} from "../../../../validations/works/task-schedule";
import CustomButton from "../../../CustomButton";
import InputField from "../../../forms/InputField";
import SelectField from "../../../forms/SelectField";
import TextField from "../../../forms/TextField";
import GlobalModal from "../../../GlobalModal";
import TaskScheduleRegenerationModal from "./TaskScheduleRegenerationModal";

const WEEK_DAYS = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const MONTH_DAYS = Array.from({ length: 31 }, (_, index) => index + 1);
const TASK_REPEAT_TYPE = "daily";

const getTaskSchedules = (task) =>
  Array.isArray(task?.schedules?.data)
    ? task.schedules.data
    : Array.isArray(task?.schedules)
      ? task.schedules
      : [];

const hasScheduleConfigurationChanged = (task, payload) => {
  const wasRepeated = Number(task?.is_repeated ?? task?.repeat_count) > 0;

  return (
    normalizeTaskScheduleDate(task?.started_at) !== payload.started_at ||
    normalizeTaskScheduleDate(task?.expected_end_date) !==
      payload.expected_end_date ||
    wasRepeated !== Boolean(payload.is_repeated) ||
    Number(task?.repeat_count || 0) !== Number(payload.repeat_count || 0) ||
    (wasRepeated && (task?.repeat_type || TASK_REPEAT_TYPE) !== payload.repeat_type)
  );
};

const TASK_API_FIELD_MAP = {
  task_category_id: "taskCategory",
  title: "taskDescription",
  started_at: "started_at",
  expected_end_date: "expected_end_date",
  task_notes: "noteDraft",
  repeat_count: "repeat_count",
};

const getFirstFieldError = (error) => {
  if (Array.isArray(error)) return error[0];
  return typeof error === "string" ? error : null;
};

const normalizeTaskNotes = (notes, fallbackDate) => {
  const source = Array.isArray(notes?.data) ? notes.data : notes;

  if (Array.isArray(source)) {
    return source
      .map((note, index) => ({
        id: note?.id ?? `existing-${index}`,
        text: String(note?.text ?? note?.note ?? note?.content ?? ""),
        created_at: note?.created_at ?? note?.date ?? fallbackDate ?? null,
      }))
      .filter((note) => note.text.trim());
  }

  if (source == null || String(source).trim() === "") return [];

  return String(source)
    .split(/\r?\n/)
    .map((text, index) => ({
      id: `existing-${index}`,
      text: text.trim(),
      created_at: fallbackDate ?? null,
    }))
    .filter((note) => note.text);
};

const formatTaskNoteDate = (value) => {
  if (!value) return "---";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
  const timePart = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${datePart} | ${timePart}`;
};

export default function AddTasksModal({
  showModal,
  setShowModal,
  taskId,
  taskData,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { taskaCategories, isLoading } = useGetTasksCategories();
  const { addNewTask, isPending } = useAddTasks();
  const { updateTask, isPending: updatingTask } = useUpdateTask();
  const notificationTimeInputRef = useRef(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [pendingUpdatePayload, setPendingUpdatePayload] = useState(null);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useAddTasksForm();

  const reminderNotifications = watch("reminderNotifications");
  const taskDescription = watch("taskDescription");
  const noteDraft = watch("noteDraft") || "";
  const notes = watch("notes") || [];
  const notificationRepeat = watch("notification_repeat");
  const repeatTask = watch("repeatTask");
  const repeatCount = watch("repeat_count");
  const startedAt = watch("started_at");
  const expectedEndDate = watch("expected_end_date");
  const availableRepetitions = getAvailableTaskRepetitions(
    startedAt,
    expectedEndDate,
  );
  const isStartDateLocked = Boolean(
    taskData && hasTaskStartDatePassed(taskData.started_at),
  );
  const notificationTimeRegistration = register("notification_time");

  //  Populate form when editing an existing task
  useEffect(() => {
    if (taskData) {
      const hasReminderNotifications =
        Boolean(taskData.notification_repeat) &&
        taskData.notification_repeat !== "none";
      const isRepeated =
        Number(taskData.is_repeated ?? taskData.repeat_count) > 0;

      reset({
        taskDescription: taskData.title || "",
        taskCategory: taskData.task_category.id || "",
        started_at: taskData.started_at ? formatYMD(taskData.started_at) : "",
        expected_end_date: taskData.expected_end_date
          ? formatYMD(taskData.expected_end_date)
          : "",
        noteDraft: "",
        notes: normalizeTaskNotes(
          taskData.task_notes ?? taskData.notes,
          taskData.updated_at ?? taskData.created_at,
        ),
        reminderNotifications: hasReminderNotifications,
        notification_repeat: ["weekly", "monthly"].includes(
          taskData.notification_repeat,
        )
          ? taskData.notification_repeat
          : "weekly",
        notification_day: Array.isArray(taskData.notification_day)
          ? taskData.notification_day.map(String)
          : [],
        notification_time: taskData.notification_time || "",
        repeatTask: !hasReminderNotifications && isRepeated,
        repeat_count:
          !hasReminderNotifications && isRepeated
            ? taskData.repeat_count || ""
            : "",
      });
    } else {
      reset(); // Clear form when switching to add mode
    }
    setEditingNoteId(null);
  }, [taskData, reset]);

  useEffect(() => {
    if (!repeatTask) return;

    if (availableRepetitions === 0) {
      setValue("repeatTask", false, { shouldValidate: true });
      setValue("repeat_count", "", { shouldValidate: true });
      return;
    }

    if (Number(repeatCount) > availableRepetitions) {
      setValue("repeat_count", availableRepetitions, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [availableRepetitions, repeatCount, repeatTask, setValue]);

  const handleSaveNote = () => {
    const text = noteDraft.trim();

    if (!text) {
      setError("noteDraft", {
        type: "required",
        message: t("validation.required"),
      });
      return;
    }

    if (text.length > TASK_NOTE_MAX_LENGTH) {
      setError("noteDraft", {
        type: "maxLength",
        message: t("validation.maxLength", { max: TASK_NOTE_MAX_LENGTH }),
      });
      return;
    }

    const nextNotes = editingNoteId
      ? notes.map((note) =>
          note.id === editingNoteId ? { ...note, text } : note,
        )
      : [
          ...notes,
          {
            id: `local-${Date.now()}`,
            text,
            created_at: new Date().toISOString(),
          },
        ];

    const serializedNotes = nextNotes.map((note) => note.text).join("\n");
    if (serializedNotes.length > TASK_NOTE_MAX_LENGTH) {
      setError("noteDraft", {
        type: "maxLength",
        message: t("validation.maxLength", { max: TASK_NOTE_MAX_LENGTH }),
      });
      return;
    }

    setValue("notes", nextNotes, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("noteDraft", "", { shouldDirty: true });
    clearErrors("noteDraft");
    setEditingNoteId(null);
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setValue("noteDraft", note.text, { shouldDirty: true });
    clearErrors("noteDraft");
  };

  const handleDeleteNote = (noteId) => {
    setValue(
      "notes",
      notes.filter((note) => note.id !== noteId),
      { shouldDirty: true, shouldValidate: true },
    );

    if (editingNoteId === noteId) {
      setEditingNoteId(null);
      setValue("noteDraft", "", { shouldDirty: true });
      clearErrors("noteDraft");
    }
  };

  const handleTaskError = (error) => {
    setPendingUpdatePayload(null);
    Object.entries(error?.fieldErrors || {}).forEach(
      ([apiField, fieldError]) => {
        const formField = TASK_API_FIELD_MAP[apiField];
        const message = getFirstFieldError(fieldError);
        if (formField && message) {
          setError(formField, { type: "server", message });
        }
      },
    );
    toast.error(error?.message || t("works.errorOccurred"));
  };

  const submitTaskUpdate = (payload) => {
    updateTask(
      { id: taskId, ...payload },
      {
        onSuccess: (res) => {
          toast.success(res?.message || t("works.task_updated"));
          queryClient.refetchQueries({ queryKey: ["work-tasks"] });
          queryClient.invalidateQueries({ queryKey: ["task-details"] });
          setPendingUpdatePayload(null);
          setShowModal(false);
        },
        onError: handleTaskError,
      },
    );
  };

  // Handle Add / Update logic
  const onSubmit = (data) => {
    const pendingNote = data.noteDraft?.trim();
    const submittedNotes = pendingNote
      ? editingNoteId
        ? data.notes.map((note) =>
            note.id === editingNoteId ? { ...note, text: pendingNote } : note,
          )
        : [...data.notes, { text: pendingNote }]
      : data.notes;
    const taskNotes = submittedNotes
      .map((note) => note.text.trim())
      .filter(Boolean);
    const serializedNotes = taskNotes.join("\n");

    if (serializedNotes.length > TASK_NOTE_MAX_LENGTH) {
      setError("noteDraft", {
        type: "maxLength",
        message: t("validation.maxLength", { max: TASK_NOTE_MAX_LENGTH }),
      });
      return;
    }

    // Base payload (shared fields)
    const payload = {
      task_category_id: data.taskCategory,
      title: data.taskDescription,
      started_at: formatYMD(data.started_at),
      expected_end_date: formatYMD(data.expected_end_date),
      task_notes: taskNotes,
    };

    if (data.reminderNotifications) {
      payload.notification_repeat = data.notification_repeat;
      payload.notification_day = data.notification_day;
      payload.notification_time = data.notification_time;
    } else {
      payload.notification_repeat = "none";
    }

    const isRepeated = data.repeatTask && !data.reminderNotifications;
    payload.repeat_count = isRepeated ? Number(data.repeat_count) : 0;
    payload.repeat_type = TASK_REPEAT_TYPE;
    payload.is_repeated = isRepeated ? 1 : 0;

    // ADD MODE → include work_id

    if (!taskData) {
      payload.work_id = id; // (if you're passing work_id this way)
    }

    // UPDATE MODE
    if (taskData) {
      const protectedSchedules = getTaskSchedules(taskData).filter(
        (schedule) =>
          schedule?.status === "progress" || schedule?.status === "completed",
      );

      if (!isRepeated && protectedSchedules.length > 0) {
        toast.error(t("works.schedule_errors.cannot_disable_repetitions"));
        return;
      }

      if (isRepeated && Number(payload.repeat_count) < protectedSchedules.length) {
        setError("repeat_count", {
          type: "min",
          message: t("works.schedule_errors.count_below_preserved", {
            count: protectedSchedules.length,
          }),
        });
        return;
      }

      const rangeExcludesProtectedSchedule = protectedSchedules.some(
        (schedule) => {
          const scheduleDate = normalizeTaskScheduleDate(schedule?.date);
          return (
            scheduleDate < payload.started_at ||
            scheduleDate > payload.expected_end_date
          );
        },
      );

      if (rangeExcludesProtectedSchedule) {
        setError("expected_end_date", {
          type: "scheduleRange",
          message: t("works.schedule_errors.range_excludes_preserved"),
        });
        return;
      }

      if (
        getTaskSchedules(taskData).length > 0 &&
        hasScheduleConfigurationChanged(taskData, payload)
      ) {
        setPendingUpdatePayload(payload);
        return;
      }

      submitTaskUpdate(payload);
      return;
    }

    // ADD MODE
    addNewTask(payload, {
      onSuccess: (res) => {
        reset();
        toast.success(res?.message || t("works.task_added"));
        queryClient.refetchQueries({ queryKey: ["work-tasks"] });
        setShowModal(false);
      },
      onError: handleTaskError,
    });
  };

  return (
    <>
      <GlobalModal
        show={showModal && !pendingUpdatePayload}
        onHide={() => {
          setShowModal(false);
          reset();
          setEditingNoteId(null);
          setPendingUpdatePayload(null);
        }}
        centered
        size="lg"
      >
        <GlobalModal.Header closeButton>
          <h6>{taskData ? t("works.updateTask") : t("works.newTask")}</h6>
        </GlobalModal.Header>

      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <TextField
                label={t("works.task_description")}
                {...register("taskDescription")}
                counterValue={taskDescription}
                error={errors.taskDescription?.message}
              />
            </div>

            <div className="col-12 col-md-4 p-2">
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

            <div className="col-12 col-md-4 p-2">
              <InputField
                type="date"
                label={t("works.started_at")}
                {...register("started_at")}
                readOnly={isStartDateLocked}
                aria-readonly={isStartDateLocked}
                error={errors.started_at?.message}
              />
            </div>

            <div className="col-12 col-md-4 p-2">
              <InputField
                type="date"
                label={t("works.expected_end_date")}
                {...register("expected_end_date")}
                error={errors.expected_end_date?.message}
              />
            </div>

            <div className="col-12 p-2">
              <section className="task-notes-editor">
                <label className="task-notes-editor__label" htmlFor="noteDraft">
                  {t("works.notes")}
                </label>
                <div className="task-notes-editor__entry">
                  <InputField
                    id="noteDraft"
                    placeholder={t("works.note_placeholder")}
                    maxLength={TASK_NOTE_MAX_LENGTH}
                    {...register("noteDraft")}
                    error={errors.noteDraft?.message}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSaveNote();
                      }
                    }}
                  />
                  <CustomButton
                    type="button"
                    color="primary"
                    variant="outlined"
                    size="medium"
                    onClick={handleSaveNote}
                  >
                    {editingNoteId
                      ? t("works.save_note")
                      : t("works.add_note")}
                  </CustomButton>
                </div>

                {notes.length > 0 ? (
                  <div className="task-notes-editor__list">
                    {notes.map((note) => (
                      <article className="task-note-item" key={note.id}>
                        <div className="task-note-item__meta">
                          <time dateTime={note.created_at || undefined}>
                            {formatTaskNoteDate(note.created_at)}
                          </time>
                          <div className="task-note-item__actions">
                            <button
                              type="button"
                              onClick={() => handleEditNote(note)}
                              aria-label={t("works.edit_note")}
                              title={t("works.edit_note")}
                            >
                              <i className="fa-regular fa-pen-to-square" aria-hidden />
                            </button>
                            <button
                              type="button"
                              className="delete"
                              onClick={() => handleDeleteNote(note.id)}
                              aria-label={t("works.delete_note")}
                              title={t("works.delete_note")}
                            >
                              <i className="fa-regular fa-trash-can" aria-hidden />
                            </button>
                          </div>
                        </div>
                        <p>{note.text}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </section>
            </div>

            <div className="col-12 p-2">
              <section className="task-schedule-settings">
                <div className="task-setting-toggle">
                  <label htmlFor="reminderNotifications">
                    {t("works.reminders")}
                  </label>
                  <Form.Switch
                    id="reminderNotifications"
                    {...register("reminderNotifications", {
                      onChange: (event) => {
                        if (event.target.checked) {
                          setValue("repeatTask", false, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                          setValue("repeat_count", "", {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                          clearErrors(["repeatTask", "repeat_count"]);
                        } else {
                          clearErrors([
                            "notification_repeat",
                            "notification_day",
                            "notification_time",
                          ]);
                        }
                      },
                    })}
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

                {reminderNotifications ? (
                  <div className="task-reminder-options">
                    <div className="task-reminder-tabs" role="radiogroup">
                      {[
                        { value: "weekly", label: t("works.by_days") },
                        { value: "monthly", label: t("works.by_date") },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={
                            notificationRepeat === option.value ? "active" : ""
                          }
                        >
                          <input
                            type="radio"
                            value={option.value}
                            {...register("notification_repeat", {
                              onChange: () =>
                                setValue("notification_day", [], {
                                  shouldValidate: true,
                                }),
                            })}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.notification_repeat ? (
                      <p className="error-text">
                        {errors.notification_repeat.message}
                      </p>
                    ) : null}

                    {notificationRepeat ? (
                      <fieldset className="task-reminder-days">
                        <legend>{t("works.repetition_days")}</legend>
                        <div
                          className={`task-reminder-days__grid task-reminder-days__grid--${notificationRepeat}`}
                        >
                          {(notificationRepeat === "weekly"
                            ? WEEK_DAYS
                            : MONTH_DAYS
                          ).map((day) => (
                            <label key={day}>
                              <input
                                type="checkbox"
                                value={day}
                                {...register("notification_day")}
                              />
                              <span>
                                {notificationRepeat === "weekly"
                                  ? t(`works.${day}`)
                                  : day}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.notification_day ? (
                          <p className="error-text">
                            {errors.notification_day.message}
                          </p>
                        ) : null}
                      </fieldset>
                    ) : null}

                    {notificationRepeat ? (
                      <div className="task-reminder-time-picker">
                        <InputField
                          id="notification_time"
                          type="time"
                          label={t("works.select_time")}
                          {...notificationTimeRegistration}
                          ref={(element) => {
                            notificationTimeInputRef.current = element;
                            notificationTimeRegistration.ref(element);
                          }}
                          error={errors.notification_time?.message}
                        />
                        <button
                          type="button"
                          className="task-reminder-time-picker__button"
                          aria-label={t("works.select_time")}
                          onClick={() => {
                            const input = notificationTimeInputRef.current;
                            input?.focus();
                            input?.showPicker?.();
                          }}
                        >
                          <i className="fa-regular fa-clock" aria-hidden />
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="task-repetition-settings">
                  <div className="task-setting-toggle">
                    <label htmlFor="repeatTask">{t("works.repetitions")}</label>
                    <Form.Switch
                      id="repeatTask"
                      {...register("repeatTask", {
                        onChange: (event) => {
                          if (!event.target.checked) {
                            setValue("repeat_count", "", {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            clearErrors("repeat_count");
                          }
                        },
                      })}
                      disabled={
                        availableRepetitions === 0 || reminderNotifications
                      }
                    />
                  </div>

                  {reminderNotifications ? (
                    <p className="hint mt-1">
                      {t("works.repetitions_disabled_with_reminders")}
                    </p>
                  ) : null}

                  {repeatTask ? (
                    <div className="task-repetition-count">
                      <div className="task-repetition-count__control">
                        <InputField
                          id="repeat_count"
                          type="number"
                          label={t("works.required_repetitions_count")}
                          className="task-repetition-count__field"
                          min="1"
                          max={availableRepetitions}
                          placeholder="00"
                          {...register("repeat_count")}
                          error={errors.repeat_count?.message}
                        />
                        <span className="task-repetition-count__availability">
                          / {t("works.available_repetitions")} {availableRepetitions}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            </div>

            <div className="col-12 p-2">
              <CustomButton loading={isPending || updatingTask} size="large">
                {taskData ? t("works.update") : t("works.add")}
              </CustomButton>
            </div>
          </div>
        </form>
        </GlobalModal.Body>
      </GlobalModal>

      <TaskScheduleRegenerationModal
        show={Boolean(pendingUpdatePayload)}
        loading={updatingTask}
        onCancel={() => setPendingUpdatePayload(null)}
        onConfirm={() =>
          submitTaskUpdate({
            ...pendingUpdatePayload,
            schedule_update_mode: "regenerate_pending",
          })
        }
      />
    </>
  );
}
