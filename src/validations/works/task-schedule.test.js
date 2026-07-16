import { describe, expect, it } from "vitest";
import {
  canEnableTaskScheduleReminder,
  getAllowedTaskScheduleStatuses,
  normalizeTaskScheduleDate,
  validateTaskScheduleDate,
} from "./task-schedule";

describe("task schedule rules", () => {
  it("normalizes API schedule dates", () => {
    expect(normalizeTaskScheduleDate("2026 Jul 14")).toBe("2026-07-14");
  });

  it("allows only forward status transitions", () => {
    expect(getAllowedTaskScheduleStatuses("pending")).toEqual([
      "pending",
      "progress",
      "completed",
    ]);
    expect(getAllowedTaskScheduleStatuses("progress")).toEqual([
      "progress",
      "completed",
    ]);
    expect(getAllowedTaskScheduleStatuses("completed")).toEqual([
      "completed",
    ]);
  });

  it("rejects past, out-of-range, and duplicate dates", () => {
    const base = {
      startedAt: "2026-07-14",
      expectedEndDate: "2026-08-07",
      schedules: [{ id: 2, date: "2026-07-20" }],
      scheduleId: 1,
      today: new Date("2026-07-14T10:00:00"),
    };

    expect(validateTaskScheduleDate({ ...base, date: "2026-07-13" })).toBe(
      "works.schedule_errors.past_date",
    );
    expect(validateTaskScheduleDate({ ...base, date: "2026-08-08" })).toBe(
      "works.schedule_errors.outside_task_range",
    );
    expect(validateTaskScheduleDate({ ...base, date: "2026-07-20" })).toBe(
      "works.schedule_errors.duplicate_date",
    );
    expect(validateTaskScheduleDate({ ...base, date: "2026-07-21" })).toBeNull();
  });

  it("allows reminders only for a future non-completed schedule", () => {
    const now = new Date("2026-07-14T08:00:00");

    expect(
      canEnableTaskScheduleReminder({
        date: "2026-07-14",
        status: "pending",
        now,
      }),
    ).toBe(true);
    expect(
      canEnableTaskScheduleReminder({
        date: "2026-07-13",
        status: "pending",
        now,
      }),
    ).toBe(false);
    expect(
      canEnableTaskScheduleReminder({
        date: "2026-07-15",
        status: "completed",
        now,
      }),
    ).toBe(false);
  });
});
