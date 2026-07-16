import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TaskScheduleRow from "./TaskScheduleRow";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "ltr" },
  }),
}));

const createViewModel = (completion = {}) => ({
  rowClassName: "task-repetition-row",
  number: 1,
  date: {
    value: "2099-01-10",
    minimum: "2099-01-01",
    maximum: "2099-01-31",
    label: "Schedule date",
    disabled: false,
    error: null,
  },
  completion: {
    completed: false,
    disabled: false,
    title: undefined,
    label: "Complete",
    iconClassName: "fa-solid fa-check",
    error: null,
    ...completion,
  },
  reminder: {
    enabled: false,
    disabled: false,
    label: "Reminders",
    shortLabel: "Reminder",
    error: null,
  },
  deletion: {
    disabled: false,
    label: "Delete",
  },
});

const createActions = () => ({
  changeDate: vi.fn(),
  complete: vi.fn(),
  changeReminder: vi.fn(),
  requestDelete: vi.fn(),
});

describe("TaskScheduleRow", () => {
  it("renders the supplied view model and delegates actions", async () => {
    const user = userEvent.setup();
    const actions = createActions();

    render(
      <TaskScheduleRow
        viewModel={createViewModel()}
        actions={actions}
      />,
    );

    expect(screen.getByLabelText("Schedule date")).toHaveValue("2099-01-10");
    await user.click(screen.getByRole("button", { name: "Complete" }));
    await user.click(screen.getByRole("checkbox", { name: "Reminders" }));
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(actions.complete).toHaveBeenCalledOnce();
    expect(actions.changeReminder).toHaveBeenCalledOnce();
    expect(actions.requestDelete).toHaveBeenCalledOnce();
  });

  it("renders the completed state without a completion action", () => {
    render(
      <TaskScheduleRow
        viewModel={createViewModel({
          completed: true,
          disabled: true,
          label: "Completed",
        })}
        actions={createActions()}
      />,
    );

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Completed" }),
    ).not.toBeInTheDocument();
  });
});
