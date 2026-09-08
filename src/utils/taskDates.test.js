import { describe, expect, it } from "vitest";
import { isDateBeforeToday } from "./taskDates";

describe("isDateBeforeToday", () => {
  const today = new Date(2026, 8, 8, 15, 30);

  it("does not consider the current day past due", () => {
    expect(isDateBeforeToday("2026-09-08", today)).toBe(false);
  });

  it("considers a date past due starting the following day", () => {
    expect(isDateBeforeToday("2026-09-07", today)).toBe(true);
  });

  it("does not consider a future date past due", () => {
    expect(isDateBeforeToday("2026-09-09", today)).toBe(false);
  });

  it("does not consider missing or invalid dates past due", () => {
    expect(isDateBeforeToday(null, today)).toBe(false);
    expect(isDateBeforeToday("not-a-date", today)).toBe(false);
  });
});
