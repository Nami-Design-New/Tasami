import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
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
    <Outlet context={{ communityDetails: { id: 13, is_subscribed: true } }} />
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  axiosInstance.get.mockImplementation((_, { params }) =>
    Promise.resolve({
      data: {
        code: 200,
        data: params.user_id
          ? [
              {
                id: 168,
                title: "Visible private consultation",
                desc: "Private consultation description",
              },
            ]
          : [
              {
                id: 167,
                title: "Visible public consultation",
                desc: "Public consultation description",
              },
            ],
        total: 1,
        next_page_url: null,
      },
    }),
  );
});

test("shows public and private consultations only in their matching categories", async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const store = configureStore({
    reducer: {
      authRole: () => ({ user: { id: 73 } }),
    },
  });

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/community/13/consultations"]}>
          <Routes>
            <Route path="/community/:id" element={<CommunityDetailsOutlet />}>
              <Route path="consultations" element={<Consultations />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>,
  );

  const privateConsultation = await screen.findByText(
    "Visible private consultation",
  );
  const publicConsultation = screen.getByText("Visible public consultation");
  const privateCategory = screen
    .getByText("community.privateConsultations")
    .closest(".row");
  const publicCategory = screen
    .getByText("community.publicConsultations")
    .closest(".row");

  expect(within(privateCategory).getByText(privateConsultation.textContent)).toBe(
    privateConsultation,
  );
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
        community_id: "13",
        page: 1,
        user_id: 73,
      },
    }),
  );
  expect(axiosInstance.get).toHaveBeenCalledWith("consultations", {
    params: {
      community_id: "13",
      page: 1,
    },
  });
  expect(axiosInstance.get).toHaveBeenCalledTimes(2);
  expect(screen.getAllByText("1")).toHaveLength(2);
  expect(
    screen.getByPlaceholderText("community.searchConsultations"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "community.addConsultation" }),
  ).toBeInTheDocument();
});
