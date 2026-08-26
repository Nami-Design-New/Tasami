import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import InputField from "./InputField";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { dir: () => "rtl" },
  }),
}));

describe("InputField", () => {
  it("avoids the native clear control when a search field has a custom icon", () => {
    render(
      <InputField
        type="search"
        icon="/search.svg"
        aria-label="Search community content"
      />,
    );

    const searchbox = screen.getByRole("searchbox", {
      name: "Search community content",
    });

    expect(searchbox).toHaveAttribute("type", "text");
  });
});
