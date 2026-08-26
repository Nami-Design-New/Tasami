import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { axiosInstance } from "../../../lib/axios";
import useGetConsultaionDetails from "./useGetConsultaionDetails";

vi.mock("react-router", () => ({
  useParams: () => ({ id: "167" }),
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

describe("useGetConsultaionDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exposes an API failure envelope as an error", async () => {
    axiosInstance.get.mockResolvedValue({
      status: 200,
      data: { code: 404, message: "Consultation not found" },
    });

    const { result } = renderHook(() => useGetConsultaionDetails(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toMatchObject({
      message: "Consultation not found",
      status: 404,
    });
  });

  it("exposes a rejected not-found request without retrying", async () => {
    const requestError = Object.assign(new Error("Request failed"), {
      response: { status: 404 },
    });
    axiosInstance.get.mockRejectedValue(requestError);

    const { result } = renderHook(() => useGetConsultaionDetails(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(requestError);
  });
});
