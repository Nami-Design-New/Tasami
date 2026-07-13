import { describe, expect, it } from "vitest";
import { ApiError } from "./apiError";
import { createApiClient } from "./createApiClient";

const createResponseAdapter = (data) => async (config) => ({
  config,
  data,
  headers: {},
  status: 200,
  statusText: "OK",
});

describe("createApiClient", () => {
  it("rejects HTTP 200 application failures through the shared interceptor", async () => {
    const client = createApiClient({
      tokenKey: "test_token",
      loginPath: "/login",
      area: "test",
    });

    await expect(
      client.get("test", {
        adapter: createResponseAdapter({
          code: 422,
          message: "Validation failed",
        }),
      }),
    ).rejects.toMatchObject({
      name: "ApiError",
      apiCode: 422,
      message: "Validation failed",
    });
  });

  it("passes successful envelopes through unchanged", async () => {
    const client = createApiClient({
      tokenKey: "test_token",
      loginPath: "/login",
      area: "test",
    });
    const response = await client.get("test", {
      adapter: createResponseAdapter({ code: 200, data: { id: 1 } }),
    });

    expect(response.data).toEqual({ code: 200, data: { id: 1 } });
    expect(response).not.toBeInstanceOf(ApiError);
  });
});

