import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AddTasksModal from "./AddTasksModal";

const mocks = vi.hoisted(() => ({ updateTask: vi.fn(), addNewTask: vi.fn() }));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "rtl", language: "ar" },
  }),
}));

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock("../../../../hooks/website/MyWorks/tasks/useGetTasksCategories", () => ({
  default: () => ({
    taskaCategories: [{ id: 19, title: "Review" }],
    isLoading: false,
  }),
}));

vi.mock("../../../../hooks/website/MyWorks/tasks/useAddTasks", () => ({
  default: () => ({ addNewTask: mocks.addNewTask, isPending: false }),
}));

vi.mock("../../../../hooks/website/MyWorks/tasks/useUpdateTask", () => ({
  default: () => ({ updateTask: mocks.updateTask, isPending: false }),
}));

const taskData = {
  id: 12,
  title: "Daily review",
  task_category: { id: 19 },
  started_at: "2099-01-01",
  expected_end_date: "2099-01-31",
  task_notes: [],
  notification_repeat: "none",
  notification_day: [],
  notification_time: "",
  is_repeated: 0,
  repeat_count: 0,
  schedules: [],
};

const renderModal = (overrides = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/my-works/785/tasks"]}>
        <AddTasksModal
          showModal
          setShowModal={vi.fn()}
          taskId={12}
          taskData={taskData}
          {...overrides}
        />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

const save = async (user) => {
  await user.click(screen.getByRole("button", { name: "works.update" }));
};

describe("AddTasksModal update payload", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends only the edited field", async () => {
    const user = userEvent.setup();
    renderModal();

    const title = await screen.findByDisplayValue("Daily review");
    await user.clear(title);
    await user.type(title, "Weekly review");
    await save(user);

    await waitFor(() => expect(mocks.updateTask).toHaveBeenCalled());

    expect(mocks.updateTask.mock.calls[0][0]).toEqual({
      id: 12,
      title: "Weekly review",
    });
  });

  it("does not call the API when nothing was edited", async () => {
    const user = userEvent.setup();
    renderModal();

    await screen.findByDisplayValue("Daily review");
    await save(user);

    await waitFor(() => expect(mocks.updateTask).not.toHaveBeenCalled());
  });

  it("sends the selected task repetition type with the repetition fields", async () => {
    const user = userEvent.setup();
    renderModal({
      taskData: {
        ...taskData,
        is_repeated: 1,
        repeat_type: "daily",
        repeat_count: 3,
      },
    });

    await user.click(await screen.findByRole("radio", { name: "works.weekly" }));
    await save(user);

    await waitFor(() => expect(mocks.updateTask).toHaveBeenCalled());

    expect(mocks.updateTask.mock.calls[0][0]).toEqual({
      id: 12,
      is_repeated: 1,
      repeat_type: "weekly",
      repeat_count: 3,
    });
  });

  it("disables weekly and monthly repetitions for tasks shorter than a week", async () => {
    renderModal({
      taskData: {
        ...taskData,
        started_at: "2099-01-01",
        expected_end_date: "2099-01-06",
        is_repeated: 1,
        repeat_type: "daily",
        repeat_count: 3,
      },
    });

    expect(await screen.findByRole("radio", { name: "works.daily" })).toBeEnabled();
    expect(screen.getByRole("radio", { name: "works.weekly" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "works.monthly" })).toBeDisabled();
  });
});
