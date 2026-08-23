import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import WorkCard from "./WorkCrad";

const mocks = vi.hoisted(() => ({
  deadlineState: null,
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ refetchQueries: vi.fn() }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { language: "en" },
    t: (key) => key,
  }),
}));

vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

vi.mock("../../hooks/website/MyWorks/useDeleteWork", () => ({
  default: () => ({ deleteWork: vi.fn(), isPending: false }),
}));

vi.mock(
  "../../hooks/website/MyWorks/useStartExecutionDeadlineState",
  () => ({ default: () => mocks.deadlineState }),
);

vi.mock("../website/platform/my-community/AlertModal", () => ({
  default: () => null,
}));

vi.mock("./HelperCard", () => ({ default: () => null }));
vi.mock("../website/my-works/WorkProgress", () => ({ default: () => null }));
vi.mock("../website/my-works/StartExecutionDeadlineAlert", () => ({
  default: () => null,
}));

describe("WorkCard start execution deletion", () => {
  const work = {
    category_title: "Category",
    id: 1,
    rectangle: "personal_goal",
    status: "planning",
    title: "Goal",
  };

  beforeEach(() => {
    mocks.deadlineState = null;
  });

  it("does not show delete work when only the local deadline has expired", () => {
    mocks.deadlineState = {
      isAutoCanceled: false,
      remainingMs: 0,
      shouldShow: true,
    };

    render(<WorkCard work={work} />);

    expect(
      screen.queryByRole("button", {
        name: "works.startExecutionDeadline.deleteAction",
      }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/my-works/1");
  });

  it("shows delete work only after the backend disables the work", () => {
    mocks.deadlineState = {
      isAutoCanceled: true,
      remainingMs: 0,
      shouldShow: true,
    };

    render(<WorkCard work={work} />);

    expect(
      screen.getByRole("button", {
        name: "works.startExecutionDeadline.deleteAction",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
