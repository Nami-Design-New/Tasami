import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import { beforeEach, expect, test, vi } from "vitest";
import useGetConsultations from "../../hooks/website/communities/useGetConsultations";
import Consultations from "./Consultations";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "rtl" },
  }),
}));

vi.mock("../../hooks/website/communities/useGetConsultations", () => ({
  default: vi.fn(),
}));

vi.mock("../../ui/website/communities/consultations/ConsultationCard", () => ({
  default: ({ item }) => <div>{item.title}</div>,
}));

vi.mock("../../ui/website/communities/consultations/AddConsultationModal", () => ({
  default: ({ communityId }) => (
    <div data-testid="consultation-modal" data-community-id={communityId} />
  ),
}));

function CommunityDetailsOutlet() {
  return (
    <Outlet context={{ communityDetails: { id: 13, is_subscribed: true } }} />
  );
}

beforeEach(() => {
  useGetConsultations.mockImplementation((type) => ({
    consultaions: {
      pages: [
        {
          data:
            type === "public"
              ? [{ id: 167, title: "Visible public consultation" }]
              : [{ id: 168, title: "Visible private consultation" }],
          total: type === "public" ? 2 : 1,
        },
      ],
    },
    isLoading: false,
    hasNextPage: false,
    fetchNextPage: vi.fn(),
    isFetchingNextPage: false,
  }));
});

test("shows both consultation lists and the toolbar on community details", () => {
  render(
    <MemoryRouter initialEntries={["/community/13"]}>
      <Routes>
        <Route path="/community/:id" element={<CommunityDetailsOutlet />}>
          <Route index element={<Consultations />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  expect(useGetConsultations).toHaveBeenCalledWith("private", {
    enabled: true,
  });
  expect(useGetConsultations).toHaveBeenCalledWith("public");
  expect(screen.getByText("Visible private consultation")).toBeInTheDocument();
  expect(screen.getByText("Visible public consultation")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("community.searchConsultations"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "community.addConsultation" }),
  ).toBeInTheDocument();
  expect(screen.getByTestId("consultation-modal")).toHaveAttribute(
    "data-community-id",
    "13",
  );
});
