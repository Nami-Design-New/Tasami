import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import OfferDetails from "./OfferDetails";

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
  default: () => ({ offerDetails: undefined, isLoading: false }),
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
  it("shows an unavailable state when a referenced offer was deleted", () => {
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
      screen.getByText("This offer is no longer available"),
    ).toBeInTheDocument();
  });
});
