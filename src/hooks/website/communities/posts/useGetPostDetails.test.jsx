import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { axiosInstance } from "../../../../lib/axios";
import useGetPostDetails from "./useGetPostDetails";

vi.mock("react-router", () => ({
  useParams: () => ({ id: "42" }),
}));

vi.mock("../../../../lib/axios", () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function QueryWrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

describe("useGetPostDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exposes a 404 in the current route instead of navigating away", async () => {
    axiosInstance.get.mockResolvedValue({
      status: 200,
      data: { code: 404, message: "Post not found" },
    });

    const { result } = renderHook(() => useGetPostDetails(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toMatchObject({
      message: "Post not found",
      status: 404,
    });
  });
});
