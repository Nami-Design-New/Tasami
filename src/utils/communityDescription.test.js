import { describe, expect, it } from "vitest";

import { getCommunityDescription } from "./communityDescription";

describe("getCommunityDescription", () => {
  it("uses the community description instead of the helper profile about", () => {
    expect(
      getCommunityDescription({
        desc: "Community description",
        helper: { about: "Helper profile about" },
      }),
    ).toBe("Community description");
  });

  it("returns an empty string when the community has no description", () => {
    expect(getCommunityDescription({ helper: { about: "Profile about" } })).toBe(
      "",
    );
  });
});
