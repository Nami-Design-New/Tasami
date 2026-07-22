import { describe, expect, it } from "vitest";
import {
  API_ERROR_KINDS,
  ApiError,
  assertSuccessfulApiResponse,
  getErrorMessage,
  isValidationError,
  normalizeApiError,
} from "./apiError";

describe("API response contract", () => {
  it("allows an HTTP 200 response with application code 200", () => {
    const response = { status: 200, data: { code: 200, data: [] } };
    expect(assertSuccessfulApiResponse(response)).toBe(response);
  });

  it("allows non-envelope responses", () => {
    const response = { status: 200, data: new Blob(["file"]) };
    expect(assertSuccessfulApiResponse(response)).toBe(response);
  });

  it("rejects a malformed envelope code", () => {
    expect(() =>
      assertSuccessfulApiResponse({
        status: 200,
        data: { code: "invalid" },
      }),
    ).toThrow(ApiError);
  });

  it("turns application code 422 into one validation error", () => {
    const response = {
      status: 200,
      data: {
        code: 422,
        message: "The submitted values are invalid",
        errors: { date: ["The date has already been taken."] },
      },
    };

    expect(() => assertSuccessfulApiResponse(response)).toThrow(ApiError);
    try {
      assertSuccessfulApiResponse(response);
    } catch (error) {
      expect(error.httpStatus).toBe(200);
      expect(error.apiCode).toBe(422);
      expect(error.serverMessage).toBe("The submitted values are invalid");
      expect(error.fieldErrors.date).toEqual([
        "The date has already been taken.",
      ]);
      expect(isValidationError(error)).toBe(true);
    }
  });

  it("classifies an application-level not-found response", () => {
    try {
      assertSuccessfulApiResponse({
        status: 200,
        data: { code: 404, message: "Goal not found" },
      });
    } catch (error) {
      expect(error.kind).toBe(API_ERROR_KINDS.NOT_FOUND);
      expect(getErrorMessage(error, (key) => key)).toBe("Goal not found");
    }
  });

  it("uses a localized fallback when an application message is absent", () => {
    try {
      assertSuccessfulApiResponse({ status: 200, data: { code: 422 } });
    } catch (error) {
      expect(getErrorMessage(error, (key) => key)).toBe(
        "errors.api.validation",
      );
    }
  });
});

describe("HTTP and transport normalization", () => {
  it("classifies HTTP 401 from the response status", () => {
    const error = normalizeApiError({
      response: { status: 401, data: { message: "Do not expose this" } },
    });
    expect(error.kind).toBe(API_ERROR_KINDS.AUTHENTICATION);
    expect(error.serverMessage).toBeNull();
  });

  it("marks HTTP 500 as retryable", () => {
    const error = normalizeApiError({ response: { status: 500 } });
    expect(error.kind).toBe(API_ERROR_KINDS.SERVER);
    expect(error.retryable).toBe(true);
  });

  it("classifies request timeouts", () => {
    const error = normalizeApiError({ code: "ECONNABORTED" });
    expect(error.kind).toBe(API_ERROR_KINDS.TIMEOUT);
    expect(error.retryable).toBe(true);
  });

  it("classifies cancelled requests without retrying", () => {
    const error = normalizeApiError({ code: "ERR_CANCELED" });
    expect(error.kind).toBe(API_ERROR_KINDS.CANCELLED);
    expect(error.retryable).toBe(false);
  });
});
