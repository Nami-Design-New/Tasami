import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { MemoryRouter, useLocation } from "react-router";
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

const Location = () => {
  const location = useLocation();
  return <span data-testid="location">{location.search}</span>;
};

afterEach(() => {
  vi.useRealTimers();
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
