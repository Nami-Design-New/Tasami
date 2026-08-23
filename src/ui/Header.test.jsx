import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Header from "./Header";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("react-redux", () => ({
  useSelector: (selector) =>
    selector({
      authRole: {
        isAuthed: true,
        user: {
          about: "Profile",
          city: {},
          country: {},
          nationality: {},
        },
      },
      language: { lang: "en" },
    }),
}));

vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  NavLink: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
}));

vi.mock("../hooks/website/chats/useGetNewChatAlerts", () => ({
  default: () => ({ newChatAlerts: [] }),
}));

vi.mock("../hooks/website/settings/useSettings", () => ({
  default: () => ({ settings: { notification_count: 0 } }),
}));

vi.mock("../hooks/website/useGetCountersNotify", () => ({
  default: () => ({ counterNotify: {} }),
}));

vi.mock("./website/LangDropdown", () => ({ default: () => null }));
vi.mock("./website/platform/PlatformModal", () => ({ default: () => null }));
vi.mock("./website/UserDropDown", () => ({ default: () => null }));
vi.mock("./website/CommunityCountBadge", () => ({ default: () => null }));

describe("Header icons", () => {
  it("uses the bold conversations icon without changing robot icons", () => {
    const { container } = render(<Header />);
    const chatLink = screen.getByRole("link", { name: "quickChats.title" });

    expect(chatLink.querySelector(".fa-regular.fa-messages")).toBeInTheDocument();
    expect(chatLink.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelectorAll(".fa-regular.fa-robot")).toHaveLength(2);
  });
});
