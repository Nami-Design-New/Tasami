import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ActivityLimitAlert from "./ActivityLimitAlert";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("./platform/my-community/AlertModal", () => ({
  default: ({ animation, children }) => (
    <div data-testid="alert-modal" data-animation={String(animation)}>
      {children}
    </div>
  ),
}));

describe("ActivityLimitAlert", () => {
  it("disables modal transitions so the limit warning opens immediately", () => {
    render(
      <ActivityLimitAlert
        showModal
        setShowModal={vi.fn()}
        type="beneficiary"
        limit={10}
      />,
    );

    expect(screen.getByTestId("alert-modal")).toHaveAttribute(
      "data-animation",
      "false",
    );
  });
});
