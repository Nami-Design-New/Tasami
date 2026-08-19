import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import useGetPrivateConsultaions from "../../../hooks/website/communities/useGetPrivateConsultaions";
import useGetPublicConsultations from "../../../hooks/website/communities/useGetPublicConsultaion";
import MyCommunityConsultations from "./MyCommunityConsultations";

const { setSearchParams } = vi.hoisted(() => ({
  setSearchParams: vi.fn(),
}));

vi.mock("react-router", () => ({
  useOutletContext: () => ({ myCommunity: { id: 42 } }),
  useSearchParams: () => [new URLSearchParams(), setSearchParams],
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "rtl" },
  }),
}));

vi.mock("../../../hooks/website/communities/useGetPrivateConsultaions", () => ({
  default: vi.fn(),
}));

vi.mock("../../../hooks/website/communities/useGetPublicConsultaion", () => ({
  default: vi.fn(),
}));

vi.mock(
  "../../../ui/website/communities/consultations/ConsultationCard",
  () => ({
    default: ({ item }) => <div>{item.title}</div>,
  }),
);

vi.mock("../../../ui/EmptySection", () => ({
  default: ({ message }) => <div data-testid="empty-state">{message}</div>,
}));

vi.mock(
  "../../../ui/website/communities/consultations/AddConsultationModal",
  () => ({
    default: ({ communityId, showModal }) => (
      <div
        data-testid="consultation-modal"
        data-community-id={communityId}
        data-open={showModal ? "true" : "false"}
      />
    ),
  }),
);

const queryResult = (key, items, total = items.length) => ({
  [key]: { pages: [{ data: items, total }] },
  isLoading: false,
  hasNextPage: false,
  fetchNextPage: vi.fn(),
  isFetchingNextPage: false,
});

beforeEach(() => {
  useGetPrivateConsultaions.mockReturnValue(
    queryResult("privateConsultaions", [], 0),
  );
  useGetPublicConsultations.mockReturnValue(
    queryResult("publicConsultaions", [
      { id: 167, title: "Visible public consultation" },
    ], 2),
  );
});

afterEach(() => {
  vi.useRealTimers();
});

test("shows consultation totals, search, and request action", () => {
  render(<MyCommunityConsultations />);

  expect(screen.getByText("0")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("community.privateConsultationsCount")).toBeInTheDocument();
  expect(screen.getByText("community.publicConsultationsCount")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("community.searchConsultations"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "community.addConsultation" }),
  ).toBeInTheDocument();
  expect(screen.getByTestId("consultation-modal")).toHaveAttribute(
    "data-community-id",
    "42",
  );
});

test("updates the consultation search after the debounce delay", () => {
  vi.useFakeTimers();
  render(<MyCommunityConsultations />);

  fireEvent.change(
    screen.getByPlaceholderText("community.searchConsultations"),
    { target: { value: "planning" } },
  );

  act(() => vi.advanceTimersByTime(500));

  expect(setSearchParams).toHaveBeenCalledOnce();
  const updateSearchParams = setSearchParams.mock.calls[0][0];
  expect(updateSearchParams(new URLSearchParams()).get("search")).toBe(
    "planning",
  );
});

test("does not show an empty state when public consultations exist", () => {
  render(<MyCommunityConsultations />);

  expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  expect(screen.getByText("Visible public consultation")).toBeInTheDocument();
});

test("shows one empty state when private and public consultations are empty", () => {
  useGetPublicConsultations.mockReturnValue(
    queryResult("publicConsultaions", []),
  );

  render(<MyCommunityConsultations />);

  expect(screen.getAllByTestId("empty-state")).toHaveLength(1);
  expect(
    screen.getByPlaceholderText("community.searchConsultations"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "community.addConsultation" }),
  ).toBeInTheDocument();
});
