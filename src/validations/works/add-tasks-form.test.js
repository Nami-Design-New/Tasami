import { describe, expect, it } from "vitest";
import {
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
  notification_day: "31",
  notification_time: "09:00",
  repeatTask: false,
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

  it("accepts the maximum repetitions available in the date range", async () => {
    await expect(schema.validate(validRepeatedTask)).resolves.toMatchObject({
      repeat_count: 51,
    });
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
      schema.validate({ ...validTask, notification_day: "32" }),
    ).rejects.toThrow("validation.invalid_option");
  });

  it("rejects repetition counts above the available limit", async () => {
    await expect(
      schema.validate({
        ...validRepeatedTask,
        repeat_count: 52,
      }),
    ).rejects.toThrow("works.repetitions_exceed_available");
  });
});
