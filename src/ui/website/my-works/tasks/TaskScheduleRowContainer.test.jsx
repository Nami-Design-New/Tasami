import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import TaskScheduleRowContainer from "./TaskScheduleRowContainer";

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "ltr" },
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

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

const occupiedSchedule = {
  id: 2,
  date: "2099-01-12",
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

    renderRow({ schedules: [pendingSchedule, occupiedSchedule] });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, occupiedSchedule.date);

    expect(
      screen.getByText("works.schedule_errors.duplicate_date"),
    ).toBeInTheDocument();
  });

  it("never saves a repetition date that another repetition already uses", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn().mockResolvedValue({});

    renderRow({ schedules: [pendingSchedule, occupiedSchedule], onUpdate });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, occupiedSchedule.date);

    expect(onUpdate).not.toHaveBeenCalled();
  });

  it("restores the saved date and explains why when the conflict is left unresolved", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn().mockResolvedValue({});

    renderRow({ schedules: [pendingSchedule, occupiedSchedule], onUpdate });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, occupiedSchedule.date);
    await user.tab();

    expect(dateInput).toHaveValue(pendingSchedule.date);
    expect(onUpdate).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(
      "works.schedule_errors.date_reverted",
    );
  });

  it("leaves no stale date error on a row it has restored", async () => {
    const user = userEvent.setup();

    renderRow({ schedules: [pendingSchedule, occupiedSchedule] });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, occupiedSchedule.date);
    await user.tab();

    expect(
      screen.queryByText("works.schedule_errors.duplicate_date"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "works.reminders" }),
    ).toBeEnabled();
  });

  it("blocks the other repetition actions until the date conflict is resolved", async () => {
    const user = userEvent.setup();
    const dueSchedule = { ...pendingSchedule, date: "2025-01-10" };
    const dueOccupied = { ...occupiedSchedule, date: "2025-01-12" };

    renderRow({
      schedule: dueSchedule,
      task: { started_at: "2025-01-01", expected_end_date: "2099-01-31" },
      schedules: [dueSchedule, dueOccupied],
    });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, dueOccupied.date);

    expect(
      screen.getByRole("checkbox", { name: "works.reminders" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /works.(complete_repetition|repetition_not_available)/ }),
    ).toBeDisabled();
  });

  it("only reverts when the conflicting row's completion is clicked", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn().mockResolvedValue({});
    const todayIso = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowIso = tomorrow.toISOString().slice(0, 10);

    const dueSchedule = { ...pendingSchedule, date: todayIso };
    const nextSchedule = { ...occupiedSchedule, date: tomorrowIso };

    renderRow({
      schedule: dueSchedule,
      task: { started_at: "2025-01-01", expected_end_date: "2099-01-31" },
      schedules: [dueSchedule, nextSchedule],
      onUpdate,
    });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, tomorrowIso);

    const completeButton = screen.getByRole("button", {
      name: /works.(complete_repetition|repetition_not_available)/,
    });

    // A real click blurs the field first; the revert then re-enables the
    // button before the click lands. Reproduce that exact ordering.
    fireEvent.blur(dateInput);
    fireEvent.click(completeButton);

    expect(dateInput).toHaveValue(todayIso);
    expect(onUpdate).not.toHaveBeenCalled();
    expect(
      screen.queryByText("works.repetition_completed"),
    ).not.toBeInTheDocument();
  });

  it("completes the row on the click after the revert", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn().mockResolvedValue({});
    const todayIso = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowIso = tomorrow.toISOString().slice(0, 10);

    const dueSchedule = { ...pendingSchedule, date: todayIso };
    const nextSchedule = { ...occupiedSchedule, date: tomorrowIso };

    renderRow({
      schedule: dueSchedule,
      task: { started_at: "2025-01-01", expected_end_date: "2099-01-31" },
      schedules: [dueSchedule, nextSchedule],
      onUpdate,
    });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, tomorrowIso);

    const completeButton = screen.getByRole("button", {
      name: /works.(complete_repetition|repetition_not_available)/,
    });

    fireEvent.blur(dateInput);
    fireEvent.click(completeButton);
    await user.click(completeButton);

    expect(onUpdate).toHaveBeenCalledWith(1, { status: "completed" });
  });

  it("saves an available date and clears the conflict", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn().mockResolvedValue({});

    renderRow({ schedules: [pendingSchedule, occupiedSchedule], onUpdate });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, occupiedSchedule.date);
    await user.clear(dateInput);
    await user.type(dateInput, "2099-01-15");

    expect(onUpdate).toHaveBeenCalledWith(1, { date: "2099-01-15" });
    expect(
      screen.queryByText("works.schedule_errors.duplicate_date"),
    ).not.toBeInTheDocument();
  });

  it("reports the unresolved date conflict to the parent task", async () => {
    const user = userEvent.setup();
    const onDateValidityChange = vi.fn();

    renderRow({
      schedules: [pendingSchedule, occupiedSchedule],
      onDateValidityChange,
    });

    const dateInput = screen.getByLabelText("works.schedule_date");
    await user.clear(dateInput);
    await user.type(dateInput, occupiedSchedule.date);

    expect(onDateValidityChange).toHaveBeenLastCalledWith(1, false);
  });
});
