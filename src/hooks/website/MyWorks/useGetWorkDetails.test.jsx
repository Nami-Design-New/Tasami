import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { axiosInstance } from "../../../lib/axios";
import useGetWorkDetails from "./useGetWorkDetails";

vi.mock("react-router", () => ({
  useParams: () => ({ id: "815" }),
}));

vi.mock("../../../lib/axios", () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return function QueryWrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

describe("useGetWorkDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the current route and exposes a body-level 404 as an error", async () => {
    axiosInstance.get.mockResolvedValue({
      status: 200,
      data: {
        code: 404,
        message: "Work is no longer available",
      },
    });
    const originalPath = window.location.pathname;

    const { result } = renderHook(() => useGetWorkDetails(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toMatchObject({
      message: "Work is no longer available",
      status: 404,
    });
    expect(window.location.pathname).toBe(originalPath);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      "my-works/815",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
        skipNotFoundRedirect: true,
      }),
    );
  });
});
