export const ACTIVITY_LIMIT_TYPES = {
  BENEFICIARY: "beneficiary",
  ASSISTANT: "assistant",
};

export const ACTIVITY_LIMIT_ERROR_CODES = {
  beneficiary_active_work_limit_reached: ACTIVITY_LIMIT_TYPES.BENEFICIARY,
  assistant_active_contract_limit_reached: ACTIVITY_LIMIT_TYPES.ASSISTANT,
};

const toFiniteNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};

export function getActivityLimitState(counters, type) {
  const activityLimit = counters?.activity_limits?.[type];
  const activeCount = toFiniteNumber(activityLimit?.active_count);
  const limit = toFiniteNumber(activityLimit?.limit);
  const canCreate =
    typeof activityLimit?.can_create === "boolean"
      ? activityLimit.can_create
      : activeCount !== undefined && limit !== undefined
        ? activeCount < limit
        : true;

  return {
    activeCount,
    limit,
    canCreate,
    isBlocked: !canCreate,
  };
}

export function getActivityLimitError(error) {
  const responseData = error?.response?.data;
  const errorData = responseData?.data;
  const errorCode =
    responseData?.error_code ??
    errorData?.error_code ??
    (typeof responseData?.code === "string" ? responseData.code : undefined);
  const type = ACTIVITY_LIMIT_ERROR_CODES[errorCode];

  if (!type) return null;

  return {
    type,
    errorCode,
    activeCount: toFiniteNumber(
      responseData?.active_count ?? errorData?.active_count,
    ),
    limit: toFiniteNumber(responseData?.limit ?? errorData?.limit),
  };
}
