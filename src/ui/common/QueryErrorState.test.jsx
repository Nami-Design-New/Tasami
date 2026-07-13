import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { API_ERROR_KINDS, ApiError } from "../../lib/apiError";
import QueryErrorState from "./QueryErrorState";

describe("QueryErrorState", () => {
  it("shows a retry action for retryable query failures", () => {
    const onRetry = vi.fn();
    render(
      <QueryErrorState
        error={
          new ApiError({
            kind: API_ERROR_KINDS.NETWORK,
            retryable: true,
          })
        }
        onRetry={onRetry}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("does not offer retry for a missing resource", () => {
    render(
      <QueryErrorState
        error={
          new ApiError({
            httpStatus: 200,
            apiCode: 404,
            kind: API_ERROR_KINDS.NOT_FOUND,
            serverMessage: "Goal not found",
          })
        }
        onRetry={vi.fn()}
      />,
    );

    expect(screen.getByText("Goal not found")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

