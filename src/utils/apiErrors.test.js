import { describe, expect, it } from "vitest";
import { createApiResponseError, getApiErrorDetails } from "./apiErrors";

describe("API error normalization", () => {
  it("recognizes an Axios 422 response as an unavailable resource", () => {
    const details = getApiErrorDetails({
      response: {
        status: 422,
        data: {
          code: 422,
          message: "الصفحة او المسار غير موجود او تم حذفه",
        },
      },
    });

    expect(details).toEqual({
      code: 422,
      message: "الصفحة او المسار غير موجود او تم حذفه",
      isUnavailable: true,
    });
  });

  it("preserves a non-200 response code returned inside a successful HTTP response", () => {
    const error = createApiResponseError({
      code: 422,
      message: "Deleted",
    });

    expect(getApiErrorDetails(error)).toEqual({
      code: 422,
      message: "Deleted",
      isUnavailable: true,
    });
  });

  it("does not classify an unrelated server error as unavailable", () => {
    expect(
      getApiErrorDetails({
        response: { status: 500, data: { message: "Server error" } },
      }),
    ).toEqual({
      code: 500,
      message: "Server error",
      isUnavailable: false,
    });
  });
});
