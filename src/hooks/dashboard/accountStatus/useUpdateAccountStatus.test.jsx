import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { adminAxiosInstance } from "../../../lib/adminAxios";
import useUpdateAccountStatus from "./useUpdateAccountStatus";

vi.mock("../../../lib/adminAxios", () => ({
  adminAxiosInstance: {
    patch: vi.fn(),
  },
}));

const wrapper = ({ children }) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: { mutations: { retry: false } },
      })
    }
  >
    {children}
  </QueryClientProvider>
);

describe("useUpdateAccountStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    adminAxiosInstance.patch.mockResolvedValue({
      data: { code: 200, message: "Updated" },
    });
  });

  it.each([
    ["user", 7, "dh-users/7/account-status"],
    ["employee", 12, "dh-employees/12/account-status"],
  ])("uses the explicit %s account-status endpoint", async (accountType, id, endpoint) => {
    const payload = new FormData();
    payload.append("status", "active");
    const { result } = renderHook(() => useUpdateAccountStatus(), { wrapper });

    act(() => {
      result.current.updateAccountStatus({ accountType, id, payload });
    });

    await waitFor(() => {
      expect(adminAxiosInstance.patch).toHaveBeenCalledWith(
        endpoint,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
    });
  });
});
