import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { axiosInstance } from "../../../lib/axios";
import useGetConsultations from "./useGetConsultations";
import useGetPrivateConsultaions from "./useGetPrivateConsultaions";
import useGetPublicConsultations from "./useGetPublicConsultaion";

vi.mock("react-router", () => ({
  useParams: () => ({ id: "13" }),
  useSearchParams: () => [new URLSearchParams("search=planning")],
}));

vi.mock("../../../lib/axios", () => ({
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

describe("consultation search hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axiosInstance.get.mockResolvedValue({
      data: { code: 200, data: [], total: 0, next_page_url: null },
    });
  });

  it.each([
    ["private", useGetPrivateConsultaions],
    ["public", useGetPublicConsultations],
  ])("sends search when fetching %s consultations", async (type, useHook) => {
    renderHook(() => useHook(), { wrapper: createWrapper() });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledOnce());

    expect(axiosInstance.get).toHaveBeenCalledWith("consultations", {
      params: {
        page: 1,
        type,
        search: "planning",
      },
    });
  });

  it("sends community, type, and search when fetching a subscribed community", async () => {
    renderHook(() => useGetConsultations("private"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledOnce());

    expect(axiosInstance.get).toHaveBeenCalledWith("consultations", {
      params: {
        community_id: "13",
        page: 1,
        type: "private",
        search: "planning",
      },
    });
  });
});
