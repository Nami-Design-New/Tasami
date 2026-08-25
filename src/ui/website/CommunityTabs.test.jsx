import { render, screen, within } from "@testing-library/react";
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

  it("shows unanswered consultations to the community owner", () => {
    renderTabs("/my-community", {
      isMyCommunity: true,
      community: { unanswered_consultations: 7 },
    });

    const consultationsLabel = screen
      .getByText("community.consultant")
      .closest(".community-counter-label");
    expect(within(consultationsLabel).getByText("7")).toBeInTheDocument();
  });

  it.each([
    [
      "consultations",
      "/community/13/consultations",
      "community.consultant",
      "11",
    ],
    ["meetings", "/community/13/meetings", "community.meetings", "22"],
    ["posts", "/community/13/posts", "community.posts", "33"],
  ])(
    "hides the %s indicator when its tab is active",
    (_, path, label, count) => {
      renderTabs(path, {
        isMyCommunity: false,
        communityId: 13,
        community: {
          unseen_consultations_count: 11,
          unseen_meetings_count: 22,
          unseen_posts_count: 33,
        },
      });

      const activeTabLabel = screen
        .getByText(label)
        .closest(".community-counter-label");
      expect(within(activeTabLabel).queryByText(count)).not.toBeInTheDocument();
    },
  );
});
