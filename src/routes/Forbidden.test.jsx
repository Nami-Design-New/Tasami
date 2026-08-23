import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import Forbidden from "./Forbidden";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const renderForbidden = (entry) =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Forbidden />
    </MemoryRouter>,
  );

describe("Forbidden return destination", () => {
  it("returns dashboard route denials to dashboard notifications", () => {
    renderForbidden({
      pathname: "/forbidden",
      state: { from: { pathname: "/dashboard/tasks" } },
    });

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/dashboard/notifications",
    );
  });

  it("returns dashboard API denials to dashboard notifications", () => {
    renderForbidden("/forbidden?context=dashboard");

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/dashboard/notifications",
    );
  });

  it("keeps public forbidden pages on the public homepage", () => {
    renderForbidden("/forbidden");

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
