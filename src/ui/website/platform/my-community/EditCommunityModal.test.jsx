import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EditCommunityModal from "./EditCommunityModal";

const mocks = vi.hoisted(() => ({
  axiosPost: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock("../../../../lib/axios", () => ({
  axiosInstance: {
    post: mocks.axiosPost,
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: mocks.toastSuccess,
    error: mocks.toastError,
  },
}));

const translations = {
  "website.platform.myCommunity.editCommunity": "Edit community",
  "website.platform.myCommunity.coverPicture": "Cover picture",
  "website.platform.myCommunity.price": "Price",
  "website.platform.myCommunity.priceHint": "Choose a pricing type",
  "website.platform.myCommunity.monthlyFee": "Paid",
  "website.platform.myCommunity.freeFee": "Free",
  "website.platform.myCommunity.minimumMonthlyFee": "Minimum fee",
  "website.platform.myCommunity.about": "About",
  save: "Save",
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => translations[key] || key,
    i18n: { dir: () => "ltr" },
  }),
}));

const renderModal = (price) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { retry: false },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <EditCommunityModal
        showModal
        setShowModal={vi.fn()}
        community={{
          id: 42,
          price,
          is_active: true,
          desc: "Community description",
        }}
      />
    </QueryClientProvider>,
  );
};

describe("EditCommunityModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.axiosPost.mockResolvedValue({
      data: { code: 200, message: "Community updated" },
    });
  });

  it.each([
    ["Paid to Free", 12, "Free", "0"],
    ["Free to Paid", 0, "Paid", "8"],
  ])(
    "preserves activation when changing pricing from %s",
    async (_, initialPrice, pricingOption, expectedPrice) => {
      const user = userEvent.setup();
      renderModal(initialPrice);

      await user.click(screen.getByRole("radio", { name: pricingOption }));
      await user.click(screen.getByRole("button", { name: "Save" }));

      await waitFor(() => expect(mocks.axiosPost).toHaveBeenCalledOnce());

      const [endpoint, formData] = mocks.axiosPost.mock.calls[0];
      expect(endpoint).toBe("community/42");
      expect(formData.get("price")).toBe(expectedPrice);
      expect(formData.has("is_active")).toBe(false);
    },
  );
});
