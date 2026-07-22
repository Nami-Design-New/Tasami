import { describe, expect, it } from "vitest";

import {
  ACTIVITY_LIMIT_TYPES,
  getActivityLimitError,
  getActivityLimitState,
} from "./activityLimits";

describe("activityLimits", () => {
  it("allows beneficiary work below the returned limit", () => {
    const state = getActivityLimitState(
      {
        activity_limits: {
          beneficiary: { active_count: 9, limit: 10, can_create: true },
        },
      },
      ACTIVITY_LIMIT_TYPES.BENEFICIARY,
    );

    expect(state).toMatchObject({
      activeCount: 9,
      limit: 10,
      canCreate: true,
      isBlocked: false,
    });
  });

  it("blocks beneficiary work at and above the returned limit", () => {
    const atLimit = getActivityLimitState(
      {
        activity_limits: {
          beneficiary: { active_count: 10, limit: 10 },
        },
      },
      ACTIVITY_LIMIT_TYPES.BENEFICIARY,
    );
    const aboveLimit = getActivityLimitState(
      {
        activity_limits: {
          beneficiary: { active_count: 11, limit: 10 },
        },
      },
      ACTIVITY_LIMIT_TYPES.BENEFICIARY,
    );

    expect(atLimit.isBlocked).toBe(true);
    expect(aboveLimit.isBlocked).toBe(true);
  });

  it("uses the backend can_create flag as the source of truth", () => {
    const state = getActivityLimitState(
      {
        activity_limits: {
          assistant: { active_count: 99, limit: 100, can_create: false },
        },
      },
      ACTIVITY_LIMIT_TYPES.ASSISTANT,
    );

    expect(state.isBlocked).toBe(true);
  });

  it("handles the assistant 99/100 and 100/100 boundaries", () => {
    const belowLimit = getActivityLimitState(
      {
        activity_limits: {
          assistant: { active_count: 99, limit: 100 },
        },
      },
      ACTIVITY_LIMIT_TYPES.ASSISTANT,
    );
    const atLimit = getActivityLimitState(
      {
        activity_limits: {
          assistant: { active_count: 100, limit: 100 },
        },
      },
      ACTIVITY_LIMIT_TYPES.ASSISTANT,
    );

    expect(belowLimit.isBlocked).toBe(false);
    expect(atLimit.isBlocked).toBe(true);
  });

  it("allows the action when counters are unavailable", () => {
    expect(
      getActivityLimitState(undefined, ACTIVITY_LIMIT_TYPES.BENEFICIARY),
    ).toMatchObject({ canCreate: true, isBlocked: false });
  });

  it("parses a top-level backend limit error", () => {
    const error = {
      response: {
        status: 409,
        data: {
          error_code: "assistant_active_contract_limit_reached",
          active_count: 100,
          limit: 100,
        },
      },
    };

    expect(getActivityLimitError(error)).toEqual({
      type: ACTIVITY_LIMIT_TYPES.ASSISTANT,
      errorCode: "assistant_active_contract_limit_reached",
      activeCount: 100,
      limit: 100,
    });
  });

  it("ignores unrelated API errors", () => {
    expect(
      getActivityLimitError({
        response: { data: { error_code: "another_error" } },
      }),
    ).toBeNull();
  });
});
