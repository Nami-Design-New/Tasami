import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";

import { refreshAfterContractCancellation } from "./contractCancellationCache";

describe("refreshAfterContractCancellation", () => {
  it("marks cached details stale without refetching every visited work", async () => {
    const queryClient = new QueryClient();
    const detailRequests = [];
    let isSeeding = true;

    for (const id of [713, 775, 816]) {
      await queryClient.fetchQuery({
        queryKey: ["work-details", id],
        queryFn: async () => {
          if (!isSeeding) detailRequests.push(id);
          return { id };
        },
      });
    }
    isSeeding = false;

    await refreshAfterContractCancellation(queryClient);

    expect(detailRequests).toEqual([]);
    expect(
      queryClient.getQueryState(["work-details", 713])?.isInvalidated,
    ).toBe(true);
  });
});
