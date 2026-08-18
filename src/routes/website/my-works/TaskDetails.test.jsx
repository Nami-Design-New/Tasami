import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";

import TaskDetails from "./TaskDetails";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => (key === "works.repetition" ? "التكرار" : key),
    i18n: { dir: () => "rtl", language: "ar" },
  }),
}));

vi.mock("../../../ui/loading/Loading", () => ({
  default: () => <div>Loading</div>,
}));

vi.mock("../../../hooks/website/MyWorks/tasks/useGetTaskDetails", () => ({
  default: () => ({
    taskDetails: {
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
    },
    isLoading: false,
    error: null,
  }),
}));

vi.mock("../../../hooks/website/MyWorks/tasks/useUpdateTaskStatus", () => ({
  default: () => ({ updateTaskStatus: vi.fn() }),
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

const renderTaskDetails = () => {
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
        <MemoryRouter initialEntries={["/my-contracts/785/tasks/12"]}>
          <Routes>
            <Route
              path="/my-contracts/:id/tasks/:taskId"
              element={<TaskDetails />}
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>,
  );
};

describe("TaskDetails repetitions", () => {
  it("shows the total repeat count beside the repetition label", () => {
    renderTaskDetails();

    expect(
      screen.getByRole("heading", { name: /التكرار.*3/ }),
    ).toBeInTheDocument();
  });
});
