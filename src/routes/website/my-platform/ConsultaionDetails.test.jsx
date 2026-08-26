import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, expect, it, vi } from "vitest";

import useGetConsultaionDetails from "../../../hooks/website/communities/useGetConsultaionDetails";
import ConsultaionDetails from "./ConsultaionDetails";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("react-redux", () => ({
  useSelector: () => ({ user: { id: 73 } }),
}));

vi.mock("../../../ui/loading/Loading", () => ({
  default: () => <div>loading</div>,
}));

vi.mock("../../../ui/website-auth/shared/RoundedBackButton", () => ({
  default: () => <button type="button">back</button>,
}));

vi.mock("../../../ui/website/communities/consultations/AnswerModal", () => ({
  default: () => null,
}));

vi.mock("../../../ui/CustomButton", () => ({
  default: ({ children }) => <button type="button">{children}</button>,
}));

vi.mock("./ConsultionActions", () => ({ default: () => null }));
vi.mock(
  "../../../ui/website/communities/consultations/ConsultaionComments",
  () => ({ default: () => null }),
);
vi.mock("../../../ui/website/platform/my-community/AlertModal", () => ({
  default: () => null,
}));
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock(
  "../../../hooks/website/communities/useGetConsultaionDetails",
  () => ({ default: vi.fn() }),
);

vi.mock("../../../hooks/website/communities/useDeleteConsultation", () => ({
  default: () => ({
    deleteConsultation: vi.fn(),
    isDeletingConsultation: false,
  }),
}));

function renderPage() {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ConsultaionDetails />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

it("renders the request error instead of accessing missing consultation data", () => {
  const error = Object.assign(new Error("Consultation not found"), {
    status: 404,
  });
  useGetConsultaionDetails.mockReturnValue({
    consultaionDetails: undefined,
    error,
    isError: true,
    isLoading: false,
  });

  renderPage();

  expect(screen.getByRole("alert")).toHaveTextContent(
    "404: Consultation not found",
  );
});

it("renders a fallback error when the request settles without data", () => {
  useGetConsultaionDetails.mockReturnValue({
    consultaionDetails: undefined,
    error: null,
    isError: false,
    isLoading: false,
  });

  renderPage();

  expect(screen.getByRole("alert")).toHaveTextContent(
    "errors.somethingWentWrong",
  );
});
