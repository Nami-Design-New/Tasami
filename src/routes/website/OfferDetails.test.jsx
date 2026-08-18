import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import OfferDetails from "./OfferDetails";

const mocks = vi.hoisted(() => ({
  offerResult: {
    offerDetails: undefined,
    isLoading: false,
    error: {
      response: {
        status: 422,
        data: {
          code: 422,
          message: "الصفحة او المسار غير موجود او تم حذفه",
        },
      },
    },
  },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) =>
      key === "website.offerDetails.unavailable"
        ? "This offer is no longer available"
        : key,
  }),
}));

vi.mock("react-redux", () => ({
  useSelector: (selector) => selector({ language: { lang: "en" } }),
}));

vi.mock("../../hooks/website/my-assistances/useGetOfferDetials", () => ({
  default: () => mocks.offerResult,
}));

vi.mock("../../hooks/website/my-assistances/useDeleteAssistance", () => ({
  default: () => ({ deleteAssistance: vi.fn(), isPending: false }),
}));

vi.mock("../../hooks/website/my-assistances/useArchiveAssistance", () => ({
  default: () => ({ archiveYourAssistance: vi.fn(), isPending: false }),
}));

vi.mock("../../ui/loading/Loading", () => ({
  default: () => <div>Loading</div>,
}));

describe("OfferDetails", () => {
  it("shows the backend message for a deleted offer response", () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/my-assistances/99"]}>
          <OfferDetails />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      screen.getByText("الصفحة او المسار غير موجود او تم حذفه"),
    ).toBeInTheDocument();
  });
});
