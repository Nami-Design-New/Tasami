import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axiosInstance } from "../../../../lib/axios";
import useGetPosts from "./useGetPosts";

vi.mock("react-router", () => ({
  useParams: () => ({ id: "42" }),
  useSearchParams: () => [new URLSearchParams("search=planning")],
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

describe("useGetPosts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axiosInstance.get.mockResolvedValue({
      data: { code: 200, data: [], total: 0, next_page_url: null },
    });
  });

  it("sends the current search term when fetching posts", async () => {
    renderHook(() => useGetPosts(), { wrapper: createWrapper() });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledOnce());

    expect(axiosInstance.get).toHaveBeenCalledWith("posts", {
      params: {
        page: 1,
        community_id: "42",
        search: "planning",
      },
    });
  });
});
