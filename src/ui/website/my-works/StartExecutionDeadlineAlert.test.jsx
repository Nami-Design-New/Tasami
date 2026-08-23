import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import StartExecutionDeadlineAlert from "./StartExecutionDeadlineAlert";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: { language: "en" },
    t: (key, values) => `${key}:${values?.remaining ?? ""}`,
  }),
}));

describe("StartExecutionDeadlineAlert", () => {
  const hourInMs = 60 * 60 * 1000;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createState = (remainingMs) => ({
    isAutoCanceled: false,
    progressPercent: 50,
    remainingMs,
    shouldShow: true,
  });

  it("shows only the days countdown when more than 24 hours remain", () => {
    render(
      <StartExecutionDeadlineAlert
        deadlineState={createState(25 * hourInMs)}
      />,
    );

    expect(screen.getByText(/2 days$/)).toBeInTheDocument();
    expect(screen.queryByText(/25:00 hours$/)).not.toBeInTheDocument();
  });

  it("shows only the hours countdown when 24 hours or less remain", () => {
    render(
      <StartExecutionDeadlineAlert
        deadlineState={createState(24 * hourInMs)}
      />,
    );

    expect(screen.getByText(/24:00 hours$/)).toBeInTheDocument();
    expect(screen.queryByText(/1 days$/)).not.toBeInTheDocument();
  });

  it("hides the countdown once the deadline expires", () => {
    const { container } = render(
      <StartExecutionDeadlineAlert deadlineState={createState(0)} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
