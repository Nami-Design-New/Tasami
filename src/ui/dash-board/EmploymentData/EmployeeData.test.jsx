import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import adminAuth from "../../../redux/slices/authAdmin";
import EmployeeData from "./EmployeeData";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const renderEmployeeData = (user) => {
  const store = configureStore({
    reducer: {
      adminAuth,
    },
    preloadedState: {
      adminAuth: {
        user,
        role: null,
        isAuthed: true,
      },
    },
  });

  return render(
    <Provider store={store}>
      <EmployeeData />
    </Provider>,
  );
};

describe("EmployeeData", () => {
  it("renders lookup records by title without passing objects to React", () => {
    renderEmployeeData({
      job_title: "Manager",
      code: "EMP-1042",
      id_number: "1234567890",
      group: {
        name: "Operations",
        region: { id: 2, code: "central", title: "Central Region" },
        country: {
          id: 3,
          code: "sa",
          title: "Saudi Arabia",
          phone_code: "+966",
          image: null,
        },
        city: null,
      },
      hire_date: "2026-01-15",
      status: "active",
      status_date: "2026-01-15",
      status_time: "09:30",
    });

    expect(screen.getByText("Manager")).toBeInTheDocument();
    expect(screen.getByText("EMP-1042")).toBeInTheDocument();
    expect(screen.getByText("Central Region")).toBeInTheDocument();
    expect(screen.getByText("Saudi Arabia")).toBeInTheDocument();
    expect(screen.getByText("all")).toBeInTheDocument();
  });

});
