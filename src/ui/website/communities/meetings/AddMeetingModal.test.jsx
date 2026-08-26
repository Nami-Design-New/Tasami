import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AddMeetingModal from "./AddMeetingModal";

const addMeeting = vi.fn();
const editMeeting = vi.fn();
const invalidateQueries = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "ltr" },
  }),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("../../../../hooks/area-of-interests/useGetcategories", () => ({
  default: () => ({
    categories: [
      {
        id: 10,
        title: "Community development",
        sub_categories: [{ id: 20, title: "Planning" }],
      },
    ],
    isLoading: false,
  }),
}));

vi.mock(
  "../../../../hooks/website/communities/mettings/useAddMeeting",
  () => ({
    default: () => ({ addMeeting, isPending: false }),
  }),
);

vi.mock(
  "../../../../hooks/website/communities/mettings/useEditMeeting",
  () => ({
    default: () => ({ editMeeting, isPending: false }),
  }),
);

vi.mock("../../../GlobalModal", () => {
  const GlobalModal = function MockGlobalModal({ children }) {
    return <div>{children}</div>;
  };
  GlobalModal.Header = function MockGlobalModalHeader({ children }) {
    return <div>{children}</div>;
  };
  GlobalModal.Body = function MockGlobalModalBody({ children }) {
    return <div>{children}</div>;
  };
  return { default: GlobalModal };
});

function getField(container, name) {
  return container.querySelector(`[name="${name}"]`);
}

async function fillRequiredFields(user, container) {
  await user.selectOptions(getField(container, "field"), "10");
  await user.selectOptions(getField(container, "specialization"), "20");
  await user.type(getField(container, "title"), "Public planning meeting");
  await user.type(
    getField(container, "description"),
    "A public meeting for community planning.",
  );
  fireEvent.change(getField(container, "date"), {
    target: { value: "2026-09-10" },
  });
  fireEvent.change(getField(container, "time"), {
    target: { value: "10:30" },
  });
  await user.type(getField(container, "duration"), "30");
  await user.type(getField(container, "link"), "https://example.com/meeting");
}

describe("AddMeetingModal visibility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a public meeting with is_private set to zero", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AddMeetingModal showModal setShowModal={vi.fn()} />,
    );

    await fillRequiredFields(user, container);
    await user.click(screen.getByText("public"));
    await user.click(screen.getByRole("button", { name: "add" }));

    await waitFor(() => expect(addMeeting).toHaveBeenCalledOnce());
    expect(addMeeting.mock.calls[0][0]).toMatchObject({ is_private: 0 });
  });

  it("preserves private visibility when editing a meeting", async () => {
    const user = userEvent.setup();
    render(
      <AddMeetingModal
        showModal
        setShowModal={vi.fn()}
        setShowDetailsModal={vi.fn()}
        isEdit
        meeting={{
          id: 55,
          category_id: 10,
          sub_category_id: 20,
          title: "Private planning meeting",
          desc: "A meeting available to community members.",
          start_date: "2026-09-10",
          start_time: "10:30",
          duration: 30,
          link: "https://example.com/meeting",
          is_private: 1,
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "edit" }));

    await waitFor(() => expect(editMeeting).toHaveBeenCalledOnce());
    expect(editMeeting.mock.calls[0][0]).toMatchObject({
      id: 55,
      params: { is_private: 1 },
    });
  });
});
