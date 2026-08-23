import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getDeadlineRemainingPhase } from "../../../utils/startExecutionDeadline";
import useStartExecutionDeadlineState from "./useStartExecutionDeadlineState";

describe("useStartExecutionDeadlineState", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("updates the card state from days to hours and then expired", () => {
    vi.useFakeTimers();
    const now = new Date(2026, 7, 19, 12).getTime();
    vi.setSystemTime(now);

    const { result } = renderHook(() =>
      useStartExecutionDeadlineState({
        rectangle: "personal_goal",
        status: "planning",
        start_date_timestamp: now - 71 * 60 * 60 * 1000,
      }),
    );

    expect(getDeadlineRemainingPhase(result.current.remainingMs)).toBe("days");

    act(() => {
      vi.advanceTimersByTime(60 * 60 * 1000);
    });

    expect(getDeadlineRemainingPhase(result.current.remainingMs)).toBe(
      "hours",
    );

    act(() => {
      vi.advanceTimersByTime(24 * 60 * 60 * 1000);
    });

    expect(getDeadlineRemainingPhase(result.current.remainingMs)).toBe(
      "expired",
    );
    expect(result.current.isAutoCanceled).toBe(false);
  });
});
