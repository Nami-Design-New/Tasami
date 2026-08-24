import { describe, expect, it, vi } from "vitest";
import { refreshCommunityIndicatorQueries } from "./communityIndicatorQueries";

describe("refreshCommunityIndicatorQueries", () => {
  it.each([
    ["a member community", "42", ["community-details", "42"]],
    ["the owner community", undefined, ["my-community"]],
  ])("refreshes %s counters", (_, communityId, communityQueryKey) => {
    const queryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    };

    refreshCommunityIndicatorQueries(queryClient, communityId);

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: communityQueryKey,
    });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["my-communities"],
    });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["counters-notify"],
    });
  });
});
