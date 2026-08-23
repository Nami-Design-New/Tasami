import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import TaskCard from "./TaskCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) =>
      ({
        "works.myTasks.notesCount": "Notes count",
        "works.myTasks.repetitionsCount": "Repetitions count",
        none: "None",
      })[key] || key,
  }),
}));

vi.mock("./ConfirmPerformanceModal", () => ({
  default: () => null,
}));

const task = {
  id: 2132,
  title: "Test task",
  task_category: { id: 19, title: "Follow-up and evaluation" },
  expected_end_date: "2026-09-25",
  started_at: "2026-07-14",
  task_notes_count: 1,
  task_notes: [{ id: 10, note: "test test" }],
  is_repeated: true,
  repeat_count: 50,
  notification_repeat: "none",
  status: "pending",
  helper: null,
};

describe("TaskCard", () => {
  it("renders every task summary field returned by the tasks endpoint", () => {
    render(
      <MemoryRouter initialEntries={["/my-contracts/793/tasks"]}>
        <TaskCard task={task} user={{ id: 93 }} isDragable={false} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Follow-up and evaluation")).toBeInTheDocument();
    expect(screen.getByText("2026-07-14")).toBeInTheDocument();
    expect(screen.getByText("2026-09-25")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
    expect(screen.getByLabelText("Notes count: 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Repetitions count: 50")).toBeInTheDocument();
    expect(screen.getByAltText("pending")).toBeInTheDocument();
  });
});
