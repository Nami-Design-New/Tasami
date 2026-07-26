import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ContractReq from "./ContractReqModal";

const navigate = vi.fn();
const invalidateQueries = vi.fn();
const reset = vi.fn();
const setShowModal = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("react-router", () => ({
  useNavigate: () => navigate,
  useParams: () => ({ id: "42" }),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries }),
}));

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: () => ({}),
    handleSubmit: (onSubmit) => (event) => {
      event.preventDefault();
      onSubmit({ Date: false, groupAdditionalTerms: "" });
    },
    watch: () => false,
    setValue: vi.fn(),
    reset,
  }),
}));

vi.mock("../../hooks/website/personal-assistances/useContractOffer", () => ({
  default: () => ({
    contractOffer: (_payload, options) =>
      options.onSuccess({ message: "created" }),
    isPending: false,
  }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("../GlobalModal", () => {
  const GlobalModal = function MockGlobalModal({ children }) {
    return <div>{children}</div>;
  };
  GlobalModal.Header = function MockGlobalModalHeader({ children }) {
    return <div>{children}</div>;
  };
  GlobalModal.Body = function MockGlobalModalBody({ children }) {
    return <div>{children}</div>;
  };
  return { default: GlobalModal };
});

vi.mock("../../ui/forms/CheckField", () => ({
  default: function MockCheckField() {
    return null;
  },
}));
vi.mock("../../ui/forms/TextField", () => ({
  default: function MockTextField() {
    return null;
  },
}));
vi.mock("../forms/DatePicker", () => ({
  default: function MockDatePicker() {
    return null;
  },
}));
vi.mock("../../ui/forms/SubmitButton", () => ({
  default: function MockSubmitButton({ text }) {
    return <button type="submit">{text}</button>;
  },
}));

describe("ContractReq", () => {
  beforeEach(() => {
    navigate.mockReset();
    invalidateQueries.mockReset();
    reset.mockReset();
    setShowModal.mockReset();
  });

  it("navigates to My Works after creating a contract request", async () => {
    const user = userEvent.setup();
    render(
      <ContractReq showModal setShowModal={setShowModal} />,
    );

    await user.click(
      screen.getByRole("button", { name: "contractReq_send" }),
    );

    expect(navigate).toHaveBeenCalledWith("/my-works");
    expect(invalidateQueries).not.toHaveBeenCalledWith({
      queryKey: ["offer-details"],
    });
  });
});
