let configuredReporter = null;

export function setErrorReporter(reporter) {
  configuredReporter = typeof reporter === "function" ? reporter : null;
}

const toSafeError = (error) => ({
  name: error?.name || "Error",
  kind: error?.kind || "unknown",
  httpStatus: error?.httpStatus || null,
  apiCode: error?.apiCode || null,
  messageKey: error?.messageKey || null,
});

export function reportError(error, context = {}) {
  const safePayload = {
    error: toSafeError(error),
    context: {
      area: context.area || "application",
      operation: context.operation || null,
      path:
        context.path ||
        (typeof window !== "undefined" ? window.location.pathname : null),
    },
  };

  if (configuredReporter) {
    configuredReporter(safePayload);
    return;
  }

  if (import.meta.env.DEV) {
    console.error("Reported application error:", safePayload);
  }
}

