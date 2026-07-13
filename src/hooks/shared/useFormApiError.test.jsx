import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { API_ERROR_KINDS, ApiError } from "../../lib/apiError";
import useFormApiError from "./useFormApiError";

describe("useFormApiError", () => {
  it("shows one validation message and clears it when the form changes", () => {
    let onChange;
    const watch = vi.fn((callback) => {
      onChange = callback;
      return { unsubscribe: vi.fn() };
    });
    const { result } = renderHook(() => useFormApiError(watch));
    const validationError = new ApiError({
      httpStatus: 200,
      apiCode: 422,
      kind: API_ERROR_KINDS.VALIDATION,
      serverMessage: "Phone number is already registered",
    });

    act(() => {
      expect(result.current.handleApiError(validationError)).toBe(true);
    });
    expect(result.current.apiErrorMessage).toBe(
      "Phone number is already registered",
    );

    act(() => onChange());
    expect(result.current.apiErrorMessage).toBeNull();
  });

  it("leaves non-validation errors to the caller", () => {
    const watch = () => ({ unsubscribe: vi.fn() });
    const { result } = renderHook(() => useFormApiError(watch));
    const error = new ApiError({
      httpStatus: 500,
      kind: API_ERROR_KINDS.SERVER,
    });

    expect(result.current.handleApiError(error)).toBe(false);
    expect(result.current.apiErrorMessage).toBeNull();
  });
});

