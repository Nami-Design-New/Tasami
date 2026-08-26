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
    { type: "private", useHook: useGetPrivateConsultaions },
    { type: "public", useHook: useGetPublicConsultations },
  ])(
    "sends the $type type when fetching owner consultations",
    async ({ type, useHook }) => {
      renderHook(() => useHook(), { wrapper: createWrapper() });

      await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledOnce());

      expect(axiosInstance.get).toHaveBeenCalledWith("consultations", {
        params: {
          page: 1,
          type,
          search: "planning",
        },
      });
    },
  );

  it("sends the logged-in user when fetching private consultations from another community", async () => {
    renderHook(() => useGetConsultations(73), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledOnce());

    expect(axiosInstance.get).toHaveBeenCalledWith("consultations", {
      params: {
        community_id: "13",
        page: 1,
        search: "planning",
        user_id: 73,
      },
    });
    const requestParams = axiosInstance.get.mock.calls[0][1].params;
    expect(requestParams).not.toHaveProperty("type");
    expect(requestParams).not.toHaveProperty("is_private");
  });

  it("omits user and type when fetching public consultations from another community", async () => {
    renderHook(() => useGetConsultations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledOnce());

    expect(axiosInstance.get).toHaveBeenCalledWith("consultations", {
      params: {
        community_id: "13",
        page: 1,
        search: "planning",
      },
    });
    const requestParams = axiosInstance.get.mock.calls[0][1].params;
    expect(requestParams).not.toHaveProperty("user_id");
    expect(requestParams).not.toHaveProperty("type");
    expect(requestParams).not.toHaveProperty("is_private");
  });
});
