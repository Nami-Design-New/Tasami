import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import { beforeEach, expect, test, vi } from "vitest";
import useGetConsultations from "../../hooks/website/communities/useGetConsultations";
import Consultations from "./Consultations";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../hooks/website/communities/useGetConsultations", () => ({
  default: vi.fn(),
}));

vi.mock("../../ui/website/communities/consultations/ConsultationCard", () => ({
  default: ({ item }) => <div>{item.title}</div>,
}));

vi.mock("../../ui/website/communities/consultations/AddConsultationModal", () => ({
  default: () => null,
}));

function CommunityDetailsOutlet() {
  return <Outlet context={{ communityDetails: { is_subscribed: false } }} />;
}

beforeEach(() => {
  useGetConsultations.mockImplementation((type) => ({
    consultaions: {
      pages: [
        {
          data:
            type === "public"
              ? [{ id: 167, title: "Visible public consultation" }]
              : [],
        },
      ],
    },
    isLoading: false,
    hasNextPage: false,
    fetchNextPage: vi.fn(),
    isFetchingNextPage: false,
  }));
});

test("requests and displays public consultations on community details", () => {
  render(
    <MemoryRouter initialEntries={["/community/13"]}>
      <Routes>
        <Route path="/community/:id" element={<CommunityDetailsOutlet />}>
          <Route index element={<Consultations />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  expect(useGetConsultations).toHaveBeenCalledWith("public");
  expect(screen.getByText("Visible public consultation")).toBeInTheDocument();
});
