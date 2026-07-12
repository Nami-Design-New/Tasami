import { describe, expect, it } from "vitest";

import {
  formatDeadlineRemaining,
  formatDeadlineRemainingDays,
  formatDeadlineRemainingHours,
  getStartExecutionDeadlineState,
  parseDateValue,
} from "./startExecutionDeadline";

describe("startExecutionDeadline", () => {
  const startDateTimestamp = new Date(2026, 5, 1).getTime();

  it("parses displayed day-month-year dates as local dates", () => {
    const date = parseDateValue("01-06-2026");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(5);
    expect(date.getDate()).toBe(1);
  });

  it("does not show the alert before 24 hours pass from the start date", () => {
    const state = getStartExecutionDeadlineState(
      {
        rectangle: "personal_goal",
        status: "planning",
        start_date_timestamp: startDateTimestamp,
      },
      { now: new Date(2026, 5, 1, 23).getTime() },
    );

    expect(state).toBeNull();
  });

  it("shows a countdown after the 24 hour warning window starts", () => {
    const state = getStartExecutionDeadlineState(
      {
        rectangle: "personal_goal_with_helper",
        status: "payment",
        start_date_timestamp: startDateTimestamp,
      },
      { now: new Date(2026, 5, 2, 1).getTime() },
    );

    expect(state.isAutoCanceled).toBe(false);
    expect(formatDeadlineRemaining(state.remainingMs, "en")).toBe(
      "2 days and 23 hours",
    );
  });

  it("formats the warning as separate day and hour messages", () => {
    const remainingMs = 2 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000;

    expect(formatDeadlineRemainingDays(remainingMs, "ar")).toBe("3 أيام");
    expect(formatDeadlineRemainingHours(remainingMs, "ar")).toBe("21:00 ساعة");
  });

  it("accepts backend Unix timestamps in seconds", () => {
    const backendTimestamp = 1782248400;
    const state = getStartExecutionDeadlineState(
      {
        rectangle: "personal_goal",
        status: "planning",
        start_date_timestamp: backendTimestamp,
      },
      { now: new Date(2026, 5, 25, 1).getTime() },
    );

    expect(state.warningAt).toBe(backendTimestamp * 1000 + 24 * 60 * 60 * 1000);
    expect(formatDeadlineRemaining(state.remainingMs, "en")).toBe(
      "2 days and 23 hours",
    );
  });

  it("does not mark work as auto canceled until the backend disables it", () => {
    const state = getStartExecutionDeadlineState(
      {
        rectangle: "personal_goal",
        status: "planning",
        start_date_timestamp: startDateTimestamp,
      },
      { now: new Date(2026, 5, 5, 1).getTime() },
    );

    expect(state.isAutoCanceled).toBe(false);
    expect(state.remainingMs).toBe(0);
  });

  it("uses disabled_by_system as the backend auto cancellation status", () => {
    const state = getStartExecutionDeadlineState(
      {
        rectangle: "personal_goal",
        status: "planning",
        disabled_by_system: true,
        start_date_timestamp: startDateTimestamp,
      },
      { now: new Date(2026, 5, 5, 1).getTime() },
    );

    expect(state.isAutoCanceled).toBe(true);
    expect(state.isServerAutoCanceled).toBe(true);
  });

  it("still shows the delete-only state when disabled_by_system has no timestamp", () => {
    const state = getStartExecutionDeadlineState({
      rectangle: "personal_goal",
      status: "planning",
      disabled_by_system: true,
    });

    expect(state.isAutoCanceled).toBe(true);
    expect(state.remainingMs).toBe(0);
    expect(state.progressPercent).toBe(100);
  });

  it("does not show deadlines for execution or completed work", () => {
    expect(
      getStartExecutionDeadlineState({
        rectangle: "personal_goal",
        status: "execution",
        start_date_timestamp: startDateTimestamp,
      }),
    ).toBeNull();

    expect(
      getStartExecutionDeadlineState({
        rectangle: "personal_goal",
        status: "completed",
        start_date_timestamp: startDateTimestamp,
      }),
    ).toBeNull();
  });
});
