import { describe, expect, it } from "vitest";
import { API_ERROR_KINDS, ApiError } from "./apiError";
import { shouldRetryQuery } from "./queryPolicy";

describe("query retry policy", () => {
  it("retries a retryable failure only once", () => {
    const error = new ApiError({
      kind: API_ERROR_KINDS.SERVER,
      retryable: true,
    });
    expect(shouldRetryQuery(0, error)).toBe(true);
    expect(shouldRetryQuery(1, error)).toBe(false);
  });

  it("does not retry application failures", () => {
    const error = new ApiError({
      apiCode: 422,
      kind: API_ERROR_KINDS.VALIDATION,
      retryable: false,
    });
    expect(shouldRetryQuery(0, error)).toBe(false);
  });

  it("does not retry unknown errors", () => {
    expect(shouldRetryQuery(0, new Error("unknown"))).toBe(false);
  });
});

