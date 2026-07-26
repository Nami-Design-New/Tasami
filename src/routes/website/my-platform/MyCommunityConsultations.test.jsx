import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import useGetPrivateConsultaions from "../../../hooks/website/communities/useGetPrivateConsultaions";
import useGetPublicConsultations from "../../../hooks/website/communities/useGetPublicConsultaion";
import MyCommunityConsultations from "./MyCommunityConsultations";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
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

const queryResult = (key, items) => ({
  [key]: { pages: [{ data: items }] },
  isLoading: false,
  hasNextPage: false,
  fetchNextPage: vi.fn(),
  isFetchingNextPage: false,
});

beforeEach(() => {
  useGetPrivateConsultaions.mockReturnValue(
    queryResult("privateConsultaions", []),
  );
  useGetPublicConsultations.mockReturnValue(
    queryResult("publicConsultaions", [
      { id: 167, title: "Visible public consultation" },
    ]),
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
});
