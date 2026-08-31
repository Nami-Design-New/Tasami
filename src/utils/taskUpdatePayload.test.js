import { describe, expect, it } from "vitest";
import {
  getChangedTaskFields,
  getTaskUpdateBaseline,
} from "./taskUpdatePayload";

const savedTask = {
  id: 12,
  title: "Daily review",
  task_category: { id: 19 },
  started_at: "2099-01-01",
  expected_end_date: "2099-01-31",
  task_notes: [{ id: 1, note: "First note" }],
  notification_repeat: "none",
  notification_day: [],
  notification_time: "",
  is_repeated: 1,
  repeat_type: "daily",
  repeat_count: 3,
};

const fullPayload = {
  task_category_id: 19,
  title: "Daily review",
  started_at: "2099-01-01",
  expected_end_date: "2099-01-31",
  task_notes: ["First note"],
  notification_repeat: "none",
  is_repeated: 1,
  repeat_type: "daily",
  repeat_count: 3,
};

describe("getTaskUpdateBaseline", () => {
  it("rebuilds the saved task in the payload shape", () => {
    expect(getTaskUpdateBaseline(savedTask)).toMatchObject({
      task_category_id: 19,
      title: "Daily review",
      started_at: "2099-01-01",
      expected_end_date: "2099-01-31",
      task_notes: ["First note"],
      notification_repeat: "none",
      is_repeated: 1,
      repeat_type: "daily",
      repeat_count: 3,
    });
  });

  it("reads notes from either the array or the legacy newline string", () => {
    expect(getTaskUpdateBaseline({ notes: "one\ntwo" }).task_notes).toEqual([
      "one",
      "two",
    ]);
  });

  it("treats a task without repetitions as not repeated", () => {
    const baseline = getTaskUpdateBaseline({ ...savedTask, repeat_count: 0, is_repeated: 0 });

    expect(baseline.is_repeated).toBe(0);
    expect(baseline.repeat_count).toBe(0);
  });
});

describe("getChangedTaskFields", () => {
  it("sends nothing when the form matches the saved task", () => {
    expect(getChangedTaskFields(savedTask, fullPayload)).toEqual({});
  });

  it("sends only the edited field", () => {
    const changed = getChangedTaskFields(savedTask, {
      ...fullPayload,
      title: "Weekly review",
    });

    expect(changed).toEqual({ title: "Weekly review" });
  });

  it("keeps the repetition fields together when only the count changes", () => {
    const changed = getChangedTaskFields(savedTask, {
      ...fullPayload,
      repeat_count: 5,
    });

    expect(changed).toEqual({
      is_repeated: 1,
      repeat_type: "daily",
      repeat_count: 5,
    });
  });

  it("keeps the notification fields together when the reminder is enabled", () => {
    const changed = getChangedTaskFields(savedTask, {
      ...fullPayload,
      notification_repeat: "weekly",
      notification_day: ["monday"],
      notification_time: "09:00",
    });

    expect(changed).toEqual({
      notification_repeat: "weekly",
      notification_day: ["monday"],
      notification_time: "09:00",
    });
  });

  it("ignores a string and number difference on the category id", () => {
    const changed = getChangedTaskFields(savedTask, {
      ...fullPayload,
      task_category_id: "19",
    });

    expect(changed).toEqual({});
  });

  it("detects an edited note list", () => {
    const changed = getChangedTaskFields(savedTask, {
      ...fullPayload,
      task_notes: ["First note", "Second note"],
    });

    expect(changed).toEqual({
      task_notes: ["First note", "Second note"],
    });
  });

  it("detects a cleared note list", () => {
    const changed = getChangedTaskFields(savedTask, {
      ...fullPayload,
      task_notes: [],
    });

    expect(changed).toEqual({ task_notes: [] });
  });

  it("sends both dates when the range moves", () => {
    const changed = getChangedTaskFields(savedTask, {
      ...fullPayload,
      started_at: "2099-02-01",
      expected_end_date: "2099-02-28",
    });

    expect(changed).toEqual({
      started_at: "2099-02-01",
      expected_end_date: "2099-02-28",
    });
  });

  it("returns the whole payload when there is no saved task to compare", () => {
    expect(getChangedTaskFields(null, fullPayload)).toEqual(fullPayload);
  });
});
