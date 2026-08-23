import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import CommunityTabs from "./CommunityTabs";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const renderTabs = (initialEntry, props) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <CommunityTabs {...props} />
    </MemoryRouter>,
  );

describe("CommunityTabs", () => {
  it.each([
    [
      "a community member",
      "/community/13",
      { isMyCommunity: false, communityId: 13 },
    ],
    ["the community owner", "/my-community", { isMyCommunity: true }],
  ])("does not pre-select a tab for %s", (_, initialEntry, props) => {
    const { container } = renderTabs(initialEntry, props);

    expect(container.querySelectorAll(".tab-item.active")).toHaveLength(0);
  });

  it("selects consultations after the user opens that tab", () => {
    renderTabs("/community/13/consultations", {
      isMyCommunity: false,
      communityId: 13,
    });

    expect(
      screen.getByText("community.consultant").closest(".tab-item"),
    ).toHaveClass("active");
  });
});
