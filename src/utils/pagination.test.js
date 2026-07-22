import { describe, expect, it } from "vitest";

import { getNextPageParam } from "./pagination";

describe("getNextPageParam", () => {
  it("returns the next page from a pagination URL", () => {
    expect(
      getNextPageParam({
        next_page_url: "https://api.example.com/my-works?page=2",
      }),
    ).toBe("2");
  });

  it("returns undefined on the final page", () => {
    expect(getNextPageParam({ next_page_url: null })).toBeUndefined();
  });
});
