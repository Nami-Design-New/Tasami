import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";

import ContractDetailsLayout from "./ContractDetailsLayout";

const { workDetailsState } = vi.hoisted(() => ({
  workDetailsState: { current: null },
}));

const completedWorkDetails = {
  id: 42,
  code: "CONTRACT-42",
  status: "completed",
  helper_last_contract_id: 84,
  unread_messages: 3,
  rate: { value: 5 },
};

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
      workDetails: workDetailsState.current,
      isLoading: false,
    }),
  }),
);

vi.mock(
  "../../../../hooks/website/MyWorks/assistants/useGetContractDetails",
  () => ({
    default: () => ({
      contractDetails: {
        id: 84,
        status: "completed",
        unread_Messages: 3,
        rate: { value: 5 },
      },
      isLoading: false,
    }),
  }),
);

describe("ContractDetailsLayout", () => {
  beforeEach(() => {
    workDetailsState.current = { ...completedWorkDetails };
  });

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

  it("groups the completed contract conversation beside the rating action", () => {
    render(
      <MemoryRouter initialEntries={["/my-contracts/42"]}>
        <ContractDetailsLayout />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", { name: "CONTRACT-42" });
    const header = heading.closest(".header");

    expect(header).not.toBeNull();
    expect(
      within(header).getByRole("button", { name: "rate_view_title" }),
    ).toBeInTheDocument();
    expect(within(header).getByRole("link", { name: "chats" })).toHaveAttribute(
      "href",
      "/user-chat/84",
    );
    expect(within(header).getByText("3")).toBeInTheDocument();
  });

  it("shows the beneficiary rating action on the beneficiaries route", () => {
    workDetailsState.current = {
      ...completedWorkDetails,
      status: "execution",
    };

    render(
      <MemoryRouter initialEntries={["/my-contracts/42/beneficiaries"]}>
        <ContractDetailsLayout />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: "rate_view_title" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "chats" })).toHaveAttribute(
      "href",
      "/user-chat/84",
    );
  });

  it("hides completed contract actions while the contract is active", () => {
    workDetailsState.current = {
      ...completedWorkDetails,
      status: "execution",
    };

    render(
      <MemoryRouter initialEntries={["/my-contracts/42"]}>
        <ContractDetailsLayout />
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("button", { name: "rate_view_title" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "chats" }),
    ).not.toBeInTheDocument();
  });
});
