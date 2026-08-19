import { describe, expect, it } from "vitest";

import ar from "./ar.json";

describe("Arabic translations", () => {
  it("labels the CV work experience section correctly", () => {
    expect(ar.website.platform.cv.experience).toBe("الخبرات العملية");
  });
});
