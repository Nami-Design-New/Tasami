import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import { beforeEach, expect, test, vi } from "vitest";
import { axiosInstance } from "../../lib/axios";
import Consultations from "./Consultations";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { dir: () => "rtl" },
  }),
}));

vi.mock("../../lib/axios", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

function CommunityDetailsOutlet() {
  return (
    <Outlet context={{ communityDetails: { id: 33, is_subscribed: true } }} />
  );
}

function renderConsultations() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const store = configureStore({
    reducer: {
      authRole: () => ({ user: { id: 93 } }),
    },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/community/33/consultations"]}>
          <Routes>
            <Route path="/community/:id" element={<CommunityDetailsOutlet />}>
              <Route path="consultations" element={<Consultations />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  axiosInstance.get.mockResolvedValue({
    data: {
      message: "success",
      code: 200,
      data: [
        {
          id: 228,
          is_private: true,
          title: "استشارة خاصة من محمود",
          desc: "وصف الاستشارة الخاصة",
          answer: "رد علي استشارة خاصة من محمود",
          from_user_id: 93,
          to_user_id: 131,
        },
        {
          id: 222,
          is_private: false,
          title: "استشارة عامة",
          desc: "استشارة عامة استشارة عامة",
          answer: "test tes ttest",
          from_user_id: 93,
          to_user_id: 131,
        },
      ],
      current_page: 1,
      last_page: 1,
      next_page_url: null,
      per_page: 10,
      total: 2,
    },
  });
});

test("splits one response into the private and public categories by is_private", async () => {
  renderConsultations();

  const privateConsultation = await screen.findByText("استشارة خاصة من محمود");
  const publicConsultation = screen.getByText("استشارة عامة");
  const privateCategory = screen
    .getByText("community.privateConsultations")
    .closest(".row");
  const publicCategory = screen
    .getByText("community.publicConsultations")
    .closest(".row");

  expect(
    within(privateCategory).getByText(privateConsultation.textContent),
  ).toBe(privateConsultation);
  expect(
    within(privateCategory).queryByText(publicConsultation.textContent),
  ).not.toBeInTheDocument();
  expect(within(publicCategory).getByText(publicConsultation.textContent)).toBe(
    publicConsultation,
  );
  expect(
    within(publicCategory).queryByText(privateConsultation.textContent),
  ).not.toBeInTheDocument();

  await waitFor(() =>
    expect(axiosInstance.get).toHaveBeenCalledWith("consultations", {
      params: {
        community_id: "33",
        page: 1,
        user_id: 93,
      },
    }),
  );
  expect(axiosInstance.get).toHaveBeenCalledTimes(1);
  expect(screen.getAllByText("1")).toHaveLength(2);
  expect(
    screen.getByPlaceholderText("community.searchConsultations"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "community.addConsultation" }),
  ).toBeInTheDocument();
});

test("treats numeric is_private flags the same way as booleans", async () => {
  axiosInstance.get.mockResolvedValue({
    data: {
      code: 200,
      data: [
        { id: 170, is_private: 1, title: "Numeric private", desc: "private" },
        { id: 171, is_private: 0, title: "Numeric public", desc: "public" },
      ],
      total: 2,
      next_page_url: null,
    },
  });

  renderConsultations();

  const privateConsultation = await screen.findByText("Numeric private");
  const publicConsultation = screen.getByText("Numeric public");
  const privateCategory = screen
    .getByText("community.privateConsultations")
    .closest(".row");
  const publicCategory = screen
    .getByText("community.publicConsultations")
    .closest(".row");

  expect(
    within(privateCategory).getByText(privateConsultation.textContent),
  ).toBe(privateConsultation);
  expect(within(publicCategory).getByText(publicConsultation.textContent)).toBe(
    publicConsultation,
  );
  expect(
    within(publicCategory).queryByText(privateConsultation.textContent),
  ).not.toBeInTheDocument();
});
