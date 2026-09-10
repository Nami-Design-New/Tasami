import { describe, expect, it } from "vitest";
import {
  getAvailableTaskRepeatTypes,
  getAvailableTaskRepetitions,
  getAddTasksSchema,
} from "./add-tasks-form";

const t = (key) => key;
const schema = getAddTasksSchema(t);
const startedAt = new Date();
const expectedEndDate = new Date(startedAt);
expectedEndDate.setDate(expectedEndDate.getDate() + 50);

const validTask = {
  taskDescription: "Prepare the execution plan",
  taskCategory: "1",
  started_at: startedAt,
  expected_end_date: expectedEndDate,
  noteDraft: "",
  notes: [],
  reminderNotifications: true,
  notification_repeat: "monthly",
  notification_day: ["1", "15", "31"],
  notification_time: "09:00",
  repeatTask: false,
  repeat_type: "daily",
  repeat_count: "",
};

const validRepeatedTask = {
  ...validTask,
  reminderNotifications: false,
  repeatTask: true,
  repeat_count: 51,
};

describe("execution task scheduling validation", () => {
  it("calculates available repetitions from the task date range", () => {
    expect(getAvailableTaskRepetitions("2026-07-01", "2026-07-11")).toBe(11);
    expect(getAvailableTaskRepetitions("2026-07-01", "2026-07-01")).toBe(1);
  });

  it("calculates available repetitions using the selected repeat type", () => {
    expect(
      getAvailableTaskRepetitions("2026-07-01", "2026-07-07", "weekly"),
    ).toBe(1);
    expect(
      getAvailableTaskRepetitions("2026-07-01", "2026-07-08", "weekly"),
    ).toBe(2);
    expect(
      getAvailableTaskRepetitions("2026-07-01", "2026-07-30", "monthly"),
    ).toBe(1);
    expect(
      getAvailableTaskRepetitions("2026-07-01", "2026-07-31", "monthly"),
    ).toBe(2);
  });

  it("accepts the maximum repetitions available in the date range", async () => {
    await expect(schema.validate(validRepeatedTask)).resolves.toMatchObject({
      repeat_count: 51,
    });
  });

  it("limits repetition types according to the task duration", () => {
    expect(
      getAvailableTaskRepeatTypes("2026-07-01", "2026-07-06"),
    ).toEqual(["daily"]);
    expect(
      getAvailableTaskRepeatTypes("2026-07-01", "2026-07-07"),
    ).toEqual(["daily", "weekly"]);
    expect(
      getAvailableTaskRepeatTypes("2026-07-01", "2026-07-30"),
    ).toEqual(["daily", "weekly", "monthly"]);
  });

  it("accepts daily, weekly, and monthly task repetition types", async () => {
    const repeatCounts = { daily: 51, weekly: 8, monthly: 2 };

    for (const repeatType of ["daily", "weekly", "monthly"]) {
      await expect(
        schema.validate({
          ...validRepeatedTask,
          repeat_type: repeatType,
          repeat_count: repeatCounts[repeatType],
        }),
      ).resolves.toMatchObject({ repeat_type: repeatType });
    }
  });

  it("rejects an unsupported task repetition type", async () => {
    await expect(
      schema.validate({ ...validRepeatedTask, repeat_type: "yearly" }),
    ).rejects.toThrow("validation.invalid_option");
  });

  it("rejects weekly and monthly repetitions when the task duration is too short", async () => {
    await expect(
      schema.validate({
        ...validRepeatedTask,
        started_at: "2099-01-01",
        expected_end_date: "2099-01-06",
        repeat_type: "weekly",
        repeat_count: 1,
      }),
    ).rejects.toThrow("works.repeat_type_not_available");

    await expect(
      schema.validate({
        ...validRepeatedTask,
        started_at: "2099-01-01",
        expected_end_date: "2099-01-29",
        repeat_type: "monthly",
        repeat_count: 1,
      }),
    ).rejects.toThrow("works.repeat_type_not_available");
  });

  it("limits the repetition count using the selected repeat type", async () => {
    await expect(
      schema.validate({
        ...validRepeatedTask,
        started_at: "2099-01-01",
        expected_end_date: "2099-01-08",
        repeat_type: "weekly",
        repeat_count: 3,
      }),
    ).rejects.toThrow("works.repetitions_exceed_available");

    await expect(
      schema.validate({
        ...validRepeatedTask,
        started_at: "2099-01-01",
        expected_end_date: "2099-01-30",
        repeat_type: "monthly",
        repeat_count: 2,
      }),
    ).rejects.toThrow("works.repetitions_exceed_available");
  });

  it("does not validate notification fields when reminders are off", async () => {
    await expect(
      schema.validate({
        ...validTask,
        reminderNotifications: false,
        notification_repeat: "invalid",
        notification_day: "invalid",
        notification_time: "invalid",
      }),
    ).resolves.toBeDefined();
  });

  it("does not validate the repetition count when repetitions are off", async () => {
    await expect(
      schema.validate({
        ...validTask,
        repeatTask: false,
        repeat_count: "invalid",
      }),
    ).resolves.toBeDefined();
  });

  it("does not allow reminders and repetitions together", async () => {
    await expect(
      schema.validate({
        ...validTask,
        repeatTask: true,
        repeat_count: 3,
      }),
    ).rejects.toThrow("works.repetitions_disabled_with_reminders");
  });

  it("rejects month dates outside 1 through 31", async () => {
    await expect(
      schema.validate({ ...validTask, notification_day: ["32"] }),
    ).rejects.toThrow("validation.invalid_option");
  });

  it("accepts multiple weekly reminder days", async () => {
    await expect(
      schema.validate({
        ...validTask,
        notification_repeat: "weekly",
        notification_day: ["sunday", "tuesday", "thursday"],
      }),
    ).resolves.toMatchObject({
      notification_day: ["sunday", "tuesday", "thursday"],
    });
  });

  it("requires at least one reminder day or date", async () => {
    await expect(
      schema.validate({ ...validTask, notification_day: [] }),
    ).rejects.toThrow("validation.required");
  });

  it("rejects the legacy scalar reminder day format", async () => {
    await expect(
      schema.validate({ ...validTask, notification_day: "31" }),
    ).rejects.toThrow("notification_day must be a `array` type");
  });

  it("rejects repetition counts above the available limit", async () => {
    await expect(
      schema.validate({
        ...validRepeatedTask,
        repeat_count: 52,
      }),
    ).rejects.toThrow("works.repetitions_exceed_available");
  });

  it("rejects a past end date when creating a task", async () => {
    await expect(
      schema.validate({
        ...validTask,
        started_at: "2025-01-01",
        expected_end_date: "2025-01-10",
      }),
    ).rejects.toThrow("validation.after_or_equal_today");
  });

  it("allows the unchanged past end date when editing a task", async () => {
    const editingSchema = getAddTasksSchema(t, {
      originalExpectedEndDate: "2025-01-10",
    });

    await expect(
      editingSchema.validate({
        ...validTask,
        started_at: "2025-01-01",
        expected_end_date: "2025-01-10",
      }),
    ).resolves.toBeDefined();
  });

  it("rejects a different past end date when editing a task", async () => {
    const editingSchema = getAddTasksSchema(t, {
      originalExpectedEndDate: "2025-01-10",
    });

    await expect(
      editingSchema.validate({
        ...validTask,
        started_at: "2025-01-01",
        expected_end_date: "2025-01-11",
      }),
    ).rejects.toThrow("validation.after_or_equal_today");
  });
});
