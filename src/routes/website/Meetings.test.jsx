import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import Meetings from "./Meetings";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "rtl" },
  }),
}));

vi.mock("../../hooks/website/communities/mettings/useGetMeetings", () => ({
  default: () => ({
    isLoading: false,
    data: { pages: [{ data: [{ id: 1, title: "Planning" }], total: 19 }] },
    hasNextPage: false,
    fetchNextPage: vi.fn(),
    isFetchingNextPage: false,
  }),
}));

vi.mock("../../ui/website/communities/meetings/MeetingCard", () => ({
  default: ({ item }) => <div>{item.title}</div>,
}));

vi.mock("../../ui/website/communities/meetings/AddMeetingModal", () => ({
  default: () => null,
}));

vi.mock("../../ui/loading/InfiniteScroll", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock(
  "../../ui/website/communities/meetings/EncounterDetailsModal",
  () => ({
    default: ({ meetingId, isMyCommuntiy, setShow }) => (
      <div>
        <span>meeting:{meetingId}</span>
        <span>owner:{String(isMyCommuntiy)}</span>
        <button type="button" onClick={() => setShow(false)}>
          close
        </button>
      </div>
    ),
  }),
);

const Location = () => {
  const location = useLocation();
  return <span data-testid="location">{location.search}</span>;
};

afterEach(() => {
  vi.useRealTimers();
});

test("opens the selected meeting in a modal and clears it when closed", () => {
  render(
    <MemoryRouter initialEntries={["/community/77/meetings?meeting_id=55"]}>
      <Routes>
        <Route
          path="/community/:id/meetings"
          element={
            <>
              <Meetings isMyCommuntiy={false} />
              <Location />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByText("meeting:55")).toBeInTheDocument();
  expect(screen.getByText("owner:false")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "close" }));

  expect(screen.getByTestId("location")).toBeEmptyDOMElement();
});

test("shows the meetings total and updates the debounced search", () => {
  vi.useFakeTimers();
  render(
    <MemoryRouter initialEntries={["/community/13/meetings"]}>
      <Meetings isMyCommuntiy={false} />
      <Location />
    </MemoryRouter>,
  );

  expect(screen.getByText("19")).toBeInTheDocument();
  expect(screen.getByText("community.meetingsCountLabel")).toBeInTheDocument();

  fireEvent.change(
    screen.getByPlaceholderText("community.searchMeetings"),
    { target: { value: "planning" } },
  );
  act(() => vi.advanceTimersByTime(500));

  expect(screen.getByTestId("location")).toHaveTextContent("?search=planning");
});

test("keeps the add meeting action for the community owner", () => {
  render(
    <MemoryRouter>
      <Meetings />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("button", { name: "community.addMeeting" }),
  ).toBeInTheDocument();
});
