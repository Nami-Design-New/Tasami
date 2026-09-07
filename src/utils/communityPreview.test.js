import { describe, expect, it } from "vitest";

import {
  getCommunityPreviewItems,
  isCommunityPreviewItemBlurred,
} from "./communityPreview";

describe("community preview", () => {
  it("limits non-member content to three items", () => {
    expect(getCommunityPreviewItems([1, 2, 3, 4], false)).toEqual([1, 2, 3]);
    expect(getCommunityPreviewItems([1, 2, 3, 4], true)).toEqual([1, 2, 3, 4]);
  });

  it("marks only the third non-member item for blurring", () => {
    expect(isCommunityPreviewItemBlurred(2, false)).toBe(true);
    expect(isCommunityPreviewItemBlurred(1, false)).toBe(false);
    expect(isCommunityPreviewItemBlurred(2, true)).toBe(false);
  });
});
