import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TaskScheduleRowContainer from "./TaskScheduleRowContainer";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "ltr" },
  }),
}));

const task = {
  started_at: "2099-01-01",
  expected_end_date: "2099-01-31",
};

const pendingSchedule = {
  id: 1,
  date: "2099-01-10",
  status: "pending",
  is_notify: false,
};

const renderRow = (overrides = {}) => {
  const props = {
    schedule: pendingSchedule,
    index: 0,
    task,
    schedules: [pendingSchedule],
    canManage: true,
    busy: false,
    onUpdate: vi.fn(),
    onRequestDelete: vi.fn(),
    ...overrides,
  };

  render(<TaskScheduleRowContainer {...props} />);
  return props;
};

describe("TaskScheduleRowContainer", () => {
  it("completes an available repetition without a confirmation modal", async () => {
    const user = userEvent.setup();
    const availableSchedule = {
      ...pendingSchedule,
      date: "2025-01-10",
    };
    const onUpdate = vi.fn().mockResolvedValue({});

    renderRow({
      schedule: availableSchedule,
      task: { ...task, started_at: "2025-01-01" },
      schedules: [availableSchedule],
      onUpdate,
    });

    await user.click(
      screen.getByRole("button", {
        name: "works.complete_repetition",
      }),
    );

    expect(onUpdate).toHaveBeenCalledWith(1, { status: "completed" });
    expect(screen.getByText("works.repetition_completed")).toBeInTheDocument();
  });

  it("does not allow completion before the task or repetition date", () => {
    renderRow();

    expect(
      screen.getByRole("button", {
        name: "works.repetition_not_available",
      }),
    ).toBeDisabled();
  });

  it("enables only dates inside the applicable task range", () => {
    renderRow();

    const dateInput = screen.getByLabelText("works.schedule_date");
    expect(dateInput).toHaveAttribute("min", "2099-01-01");
    expect(dateInput).toHaveAttribute("max", "2099-01-31");
  });

  it("prevents editing and deleting a completed schedule", () => {
    renderRow({
      schedule: { ...pendingSchedule, status: "completed" },
    });

    expect(screen.getByText("works.repetition_completed")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "works.complete_repetition",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "works.delete_repetition" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("checkbox", { name: "works.reminders" }),
    ).toBeDisabled();
  });

  it("allows an in-progress repetition to be completed", () => {
    const availableSchedule = {
      ...pendingSchedule,
      date: "2025-01-10",
      status: "progress",
    };

    renderRow({
      schedule: availableSchedule,
      task: { ...task, started_at: "2025-01-01" },
      schedules: [availableSchedule],
    });

    expect(
      screen.getByRole("button", {
        name: "works.complete_repetition",
      }),
    ).toBeEnabled();
  });

  it("shows a validation error for a duplicate date", async () => {
    const user = userEvent.setup();
    const duplicateSchedule = {
      id: 2,
      date: "2099-01-12",
      status: "pending",
      is_notify: false,
    };

    renderRow({ schedules: [pendingSchedule, duplicateSchedule] });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, "2099-01-12");

    expect(
      screen.getByText("works.schedule_errors.duplicate_date"),
    ).toBeInTheDocument();
  });
});
