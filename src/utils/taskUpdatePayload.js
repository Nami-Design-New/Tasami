import { normalizeTaskScheduleDate } from "../validations/works/task-schedule";

export const TASK_REPEAT_TYPE = "daily";

// The backend validates each of these sets as one group, so a group travels
// whole or not at all. Sending a lone member risks a 422 on the others.
const TASK_FIELD_GROUPS = [
  ["is_repeated", "repeat_type", "repeat_count"],
  ["notification_repeat", "notification_day", "notification_time"],
];

const groupFor = (field) =>
  TASK_FIELD_GROUPS.find((group) => group.includes(field));

const toComparable = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item ?? ""));
  if (value == null) return "";
  return String(value);
};

const isSameValue = (left, right) => {
  const a = toComparable(left);
  const b = toComparable(right);

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, index) => item === b[index]);
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  return a === b;
};

const readTaskNotes = (task) => {
  const source = task?.task_notes ?? task?.notes;
  const notes = Array.isArray(source?.data) ? source.data : source;

  if (Array.isArray(notes)) {
    return notes
      .map((note) =>
        String(note?.text ?? note?.note ?? note?.content ?? note ?? "").trim(),
      )
      .filter(Boolean);
  }

  if (notes == null || String(notes).trim() === "") return [];

  return String(notes)
    .split(/\r?\n/)
    .map((note) => note.trim())
    .filter(Boolean);
};

/**
 * Rebuilds the saved task in the shape the update payload uses, so the two can
 * be compared field by field.
 */
export const getTaskUpdateBaseline = (task) => {
  const isRepeated = Number(task?.is_repeated ?? task?.repeat_count) > 0;
  const notificationRepeat = task?.notification_repeat || "none";

  return {
    task_category_id: task?.task_category?.id ?? task?.task_category_id ?? "",
    title: task?.title ?? "",
    started_at: normalizeTaskScheduleDate(task?.started_at),
    expected_end_date: normalizeTaskScheduleDate(task?.expected_end_date),
    task_notes: readTaskNotes(task),
    notification_repeat: notificationRepeat,
    notification_day: Array.isArray(task?.notification_day)
      ? task.notification_day.map(String)
      : [],
    notification_time: task?.notification_time ?? "",
    is_repeated: isRepeated ? 1 : 0,
    repeat_type: task?.repeat_type || TASK_REPEAT_TYPE,
    repeat_count: isRepeated ? Number(task?.repeat_count || 0) : 0,
  };
};

/**
 * Reduces a full update payload to the fields that actually differ from the
 * saved task. Grouped fields are kept together. Returns an empty object when
 * nothing changed, so the caller can skip the request entirely.
 */
export const getChangedTaskFields = (task, payload) => {
  if (!task) return { ...payload };

  const baseline = getTaskUpdateBaseline(task);
  const changedFields = new Set();

  Object.keys(payload).forEach((field) => {
    if (isSameValue(payload[field], baseline[field])) return;

    const group = groupFor(field);
    if (group) {
      group.forEach((member) => {
        if (member in payload) changedFields.add(member);
      });
      return;
    }

    changedFields.add(field);
  });

  return Object.fromEntries(
    [...changedFields].map((field) => [field, payload[field]]),
  );
};
