import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TaskDetails from "./TaskDetails";

const mocks = vi.hoisted(() => ({
  taskDetails: null,
  updateTaskStatus: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) =>
      ({
        "works.repetition": "التكرار",
        "works.myTasks.statuses.completed": "Completed",
        "works.myTasks.completeRepetitionsHint":
          "Complete all repetitions first",
        "works.myTasks.statuses.progress": "In progress",
      })[key] || key,
    i18n: { dir: () => "rtl", language: "ar" },
  }),
}));

vi.mock("../../../ui/loading/Loading", () => ({
  default: () => <div>Loading</div>,
}));

vi.mock("../../../ui/website/my-works/tasks/AddTasksModal", () => ({
  default: () => null,
}));

vi.mock("../../../hooks/website/MyWorks/tasks/useGetTaskDetails", () => ({
  default: () => ({
    taskDetails: mocks.taskDetails,
    isLoading: false,
    error: null,
  }),
}));

vi.mock("../../../hooks/website/MyWorks/tasks/useUpdateTaskStatus", () => ({
  default: () => ({ updateTaskStatus: mocks.updateTaskStatus }),
}));

vi.mock("../../../hooks/website/MyWorks/tasks/useDeleteTask", () => ({
  default: () => ({ deleteTask: vi.fn(), isPending: false }),
}));

vi.mock("../../../hooks/website/MyWorks/tasks/useUpdateTaskSchedule", () => ({
  default: () => ({ updateTaskSchedule: vi.fn(), isPending: false }),
}));

vi.mock("../../../hooks/website/MyWorks/tasks/useDeleteTaskSchedule", () => ({
  default: () => ({ deleteTaskSchedule: vi.fn(), isPending: false }),
}));

const renderTaskDetails = (route = "/my-contracts/785/tasks/12") => {
  const store = configureStore({
    reducer: {
      authRole: () => ({ user: { id: 2 } }),
      language: () => ({ lang: "ar" }),
    },
  });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route
              path="/my-contracts/:id/tasks/:taskId"
              element={<TaskDetails />}
            />
            <Route
              path="/my-works/:id/tasks/:taskId"
              element={<TaskDetails />}
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>,
  );
};

describe("TaskDetails repetitions", () => {
  beforeEach(() => {
    mocks.updateTaskStatus.mockClear();
    mocks.taskDetails = {
      id: 12,
      work_id: 785,
      code: "TASK-12",
      title: "Repeated task",
      status: "pending",
      work_status: "execution",
      user_id: 1,
      helper_id: 2,
      expected_end_date: "2099-01-31",
      schedules: [
        { id: 1, date: "2099-01-01", status: "pending" },
        { id: 2, date: "2099-01-02", status: "pending" },
        { id: 3, date: "2099-01-03", status: "pending" },
      ],
    };
  });

  it("shows the total repeat count beside the repetition label", () => {
    renderTaskDetails();

    expect(
      screen.getByRole("heading", { name: /التكرار.*3/ }),
    ).toBeInTheDocument();
  });

  it("places the repetition hint with the completed status option", () => {
    renderTaskDetails();

    const completedStatus = screen.getByRole("radio", { name: "Completed" });
    const completedOption = completedStatus.closest(".task-status-option");

    expect(completedOption).not.toBeNull();
    expect(completedOption).toContainElement(
      screen.getByText("Complete all repetitions first"),
    );
  });

  it("blocks a task status change while a repetition date conflict is unresolved", () => {
    // The owning beneficiary is the only role that can edit repetition dates.
    mocks.taskDetails.user_id = 2;
    mocks.taskDetails.helper_id = 1;

    renderTaskDetails("/my-works/785/tasks/12");

    const [firstDate] = screen.getAllByLabelText("works.schedule_date");
    // fireEvent dispatches change without a blur, mirroring the date pickers
    // that commit a value without ever firing one.
    fireEvent.change(firstDate, { target: { value: "2099-01-02" } });

    fireEvent.click(screen.getByRole("radio", { name: "In progress" }));

    expect(mocks.updateTaskStatus).not.toHaveBeenCalled();
  });

  it("allows a task status change once no repetition date conflicts remain", () => {
    mocks.taskDetails.user_id = 2;
    mocks.taskDetails.helper_id = 1;

    renderTaskDetails("/my-works/785/tasks/12");

    fireEvent.click(screen.getByRole("radio", { name: "In progress" }));

    expect(mocks.updateTaskStatus).toHaveBeenCalled();
  });

  it("hides the repetition hint after every repetition is completed", () => {
    mocks.taskDetails.schedules = mocks.taskDetails.schedules.map(
      (schedule) => ({ ...schedule, status: "completed" }),
    );

    renderTaskDetails();

    expect(
      screen.queryByText("Complete all repetitions first"),
    ).not.toBeInTheDocument();
  });
});
