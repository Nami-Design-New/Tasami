import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import TopInfo from "./offers/TopInfo";
import AudienceCard from "./platform/audience/AudienceCard";
import UserCard from "./profile/UserCard";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(() => ({ lang: "en" })),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) =>
      key === "website.platform.audience.memberSince"
        ? "Member since"
        : key,
  }),
}));

const user = {
  id: 17,
  name: "Test Helper",
  image: "/helper.jpg",
  is_online: true,
  experience_level: "Expert",
  account_code: "TS-17",
  country: {
    title: "Egypt",
    image: "/egypt.svg",
  },
};

function renderInRouter(component) {
  return render(<MemoryRouter>{component}</MemoryRouter>);
}

describe("unified identity cards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses the canonical helper card on goal details", () => {
    const { container } = renderInRouter(<TopInfo offer={{ user }} />);

    expect(container.querySelector(".helper-card")).toBeInTheDocument();
    expect(screen.getByText(user.country.title)).toBeInTheDocument();
  });

  it("uses the canonical helper card for audience entries", () => {
    const { container } = renderInRouter(
      <AudienceCard data={{ user, created_at: "19 August 2026" }} />,
    );

    expect(container.querySelector(".helper-card")).toBeInTheDocument();
    expect(screen.queryByText(/Member since/)).not.toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/helper/17");
  });

  it("uses the canonical helper card on profile sidebars", () => {
    const { container } = renderInRouter(<UserCard user={user} />);

    expect(container.querySelector(".helper-card")).toBeInTheDocument();
    expect(screen.queryByText(user.account_code)).not.toBeInTheDocument();
    expect(screen.getByText(user.country.title)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
