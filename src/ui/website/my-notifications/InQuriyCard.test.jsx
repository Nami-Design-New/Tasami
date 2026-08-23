import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import InQuriyCard from "./InQuriyCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) =>
      key === "notification.referenceUnavailable"
        ? "Reference is no longer available"
        : key,
  }),
}));

vi.mock("react-redux", () => ({
  useSelector: (selector) => selector({ authRole: { user: { id: 1 } } }),
}));

vi.mock("../../../hooks/website/inquiries/useDeleteInquriy", () => ({
  default: () => ({ deleteInquriy: vi.fn(), isPending: false }),
}));

vi.mock("../../cards/HelperCard", () => ({
  default: () => null,
}));

vi.mock("./AnswerModal", () => ({
  default: () => null,
}));

describe("InQuriyCard", () => {
  it("renders a non-clickable reference when the related resource is missing", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <InQuriyCard
            item={{
              id: 10,
              from_user_id: 1,
              work: null,
              message: "Old inquiry",
              created_at: "2026-08-18",
            }}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(
      screen.getByText("Reference is no longer available"),
    ).toBeInTheDocument();
  });
});
