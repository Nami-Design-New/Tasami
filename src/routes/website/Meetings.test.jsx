import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { describe, expect, it, vi } from "vitest";
import Meetings from "./Meetings";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../hooks/website/communities/mettings/useGetMeetings", () => ({
  default: () => ({
    isLoading: false,
    data: { pages: [{ data: [] }] },
    hasNextPage: false,
    fetchNextPage: vi.fn(),
    isFetchingNextPage: false,
  }),
}));

vi.mock(
  "../../ui/website/communities/meetings/EncounterDetailsModal",
  () => ({
    default: ({ meetingId, isMyCommuntiy, setShow }) => (
      <div>
        <span>meeting:{meetingId}</span>
        <span>owner:{String(isMyCommuntiy)}</span>
        <button type="button" onClick={() => setShow(false)}>
          close
        </button>
      </div>
    ),
  }),
);

const Location = () => {
  const location = useLocation();
  return <span data-testid="location">{location.search}</span>;
};

describe("Meetings", () => {
  it("opens the selected meeting in a modal and clears it when closed", () => {
    render(
      <MemoryRouter
        initialEntries={["/community/77/meetings?meeting_id=55"]}
      >
        <Routes>
          <Route
            path="/community/:id/meetings"
            element={
              <>
                <Meetings isMyCommuntiy={false} />
                <Location />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("meeting:55")).toBeInTheDocument();
    expect(screen.getByText("owner:false")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "close" }));

    expect(screen.getByTestId("location")).toBeEmptyDOMElement();
  });
});
