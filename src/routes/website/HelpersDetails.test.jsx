import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import HelpersDetails from "./HelpersDetails";

const assistantDetails = {
  id: 17,
  name: "Test Helper",
  image: "/helper.jpg",
  is_online: true,
  experience_level: "Expert",
  about: "About the helper",
  country: {
    title: "Egypt",
    image: "/egypt.svg",
  },
  community_id: null,
  completed_contract: 4,
  progress_contract: 0,
  user_experiences: [],
  user_documents: [],
  user_services: [],
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("react-redux", () => ({
  useDispatch: () => vi.fn(),
  useSelector: (selector) =>
    selector({
      authRole: { user: null },
      language: { lang: "ar" },
    }),
}));

vi.mock(
  "../../hooks/website/personal-assistants/useGetAssistantDetails",
  () => ({
    default: () => ({ assistantDetails, isLoading: false }),
  }),
);

vi.mock("../../hooks/website/personal-assistants/useFollow", () => ({
  default: () => ({ toggleFollow: vi.fn(), isPending: false }),
}));

vi.mock(
  "../../hooks/website/personal-assistants/useDismissFollowSuccessNotice",
  () => ({
    default: () => ({ dismissFollowSuccessNotice: vi.fn(), isPending: false }),
  }),
);

vi.mock("../../ui/loading/Loading", () => ({
  default: () => <div>Loading</div>,
}));

vi.mock("../../ui/website/helpers/PersonalHelperExperiences", () => ({
  default: () => <div>Experiences</div>,
}));

vi.mock("../../ui/website/helpers/PersonalHelperDoc", () => ({
  default: () => <div>Documents</div>,
}));

vi.mock("../../ui/website/helpers/FollowSuccessModal", () => ({
  default: () => null,
}));

function renderResume() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/helper/17"]}>
        <HelpersDetails />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("HelpersDetails", () => {
  it("uses the canonical helper card on the resume page", () => {
    const { container } = renderResume();

    expect(container.querySelector(".helper-card")).toBeInTheDocument();
    expect(container.querySelector(".user-profile")).not.toBeInTheDocument();
  });

  it("shows the unified identity details on the resume card", () => {
    const { container } = renderResume();
    const card = container.querySelector(".helper-card");

    expect(card).toHaveTextContent(assistantDetails.name);
    expect(card).toHaveTextContent(assistantDetails.country.title);
    expect(card).toHaveTextContent(assistantDetails.experience_level);
  });

  it("does not link the resume card back to the page it is already on", () => {
    const { container } = renderResume();

    expect(container.querySelector("a.helper-card")).not.toBeInTheDocument();
  });
});
