import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import CommunityStats from "./CommunityStats";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../Currency", () => ({
  default: () => <span>currency</span>,
}));

const community = {
  id: 10,
  helper: { id: 20 },
  members_count: 3,
  price: 0,
};

const renderStats = (props = {}) =>
  render(
    <MemoryRouter>
      <CommunityStats community={community} {...props} />
    </MemoryRouter>,
  );

describe("CommunityStats members-list action", () => {
  it("shows the action to the community owner", () => {
    renderStats({ isMyCommunity: true });

    expect(
      screen.getByRole("link", { name: "community.membersList" }),
    ).toHaveAttribute("href", "/community/10/members?user_id=20");
  });

  it("shows the action to a subscribed community member", () => {
    renderStats({ community: { ...community, is_subscribed: true } });

    expect(
      screen.getByRole("link", { name: "community.membersList" }),
    ).toBeInTheDocument();
  });

  it("hides the action from a non-subscribed visitor", () => {
    renderStats({ community: { ...community, is_subscribed: false } });

    expect(
      screen.queryByRole("link", { name: "community.membersList" }),
    ).not.toBeInTheDocument();
  });
});
