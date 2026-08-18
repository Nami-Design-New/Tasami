import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";

import ContractDetailsLayout from "./ContractDetailsLayout";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../../../ui/loading/Loading", () => ({
  default: () => <div>Loading</div>,
}));

vi.mock("../../../../ui/website-auth/shared/RoundedBackButton", () => ({
  default: (props) => <button {...props} />,
}));

vi.mock(
  "../../../../hooks/website/MyWorks/useGetWorkDetails",
  () => ({
    default: () => ({
      workDetails: {
        id: 42,
        code: "CONTRACT-42",
        status: "completed",
        helper_last_contract_id: 84,
      },
      isLoading: false,
    }),
  }),
);

vi.mock(
  "../../../../hooks/website/MyWorks/assistants/useGetContractDetails",
  () => ({
    default: () => ({
      contractDetails: { rate: { value: 5 } },
      isLoading: false,
    }),
  }),
);

describe("ContractDetailsLayout", () => {
  it("opens contract details from My Contracts", () => {
    render(
      <MemoryRouter initialEntries={["/my-contracts/42"]}>
        <ContractDetailsLayout />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "CONTRACT-42" }),
    ).toBeInTheDocument();
  });

  it("shows the beneficiary rating action on the beneficiaries route", () => {
    render(
      <MemoryRouter initialEntries={["/my-contracts/42/beneficiaries"]}>
        <ContractDetailsLayout />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: "rate_view_title" }),
    ).toBeInTheDocument();
  });
});
