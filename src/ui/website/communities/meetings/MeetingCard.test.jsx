import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import MeetingCard from "./MeetingCard";

const encounterDetailsModal = vi.fn();

vi.mock("./EncounterDetailsModal", () => ({
  default: (props) => {
    encounterDetailsModal(props);
    return <div data-testid="encounter-details-modal" />;
  },
}));

const MEETING = {
  id: 104,
  title: "Planning meeting",
  desc: "A meeting for community planning.",
  start_date: "2026-09-10",
  start_time: "10:30",
  duration: 30,
};

describe("MeetingCard", () => {
  it("does not mount the details modal until the card is opened", async () => {
    const user = userEvent.setup();
    render(<MeetingCard item={MEETING} />);

    expect(
      screen.queryByTestId("encounter-details-modal"),
    ).not.toBeInTheDocument();
    expect(encounterDetailsModal).not.toHaveBeenCalled();

    await user.click(screen.getByText("Planning meeting"));

    expect(screen.getByTestId("encounter-details-modal")).toBeInTheDocument();
    expect(encounterDetailsModal).toHaveBeenCalledWith(
      expect.objectContaining({ show: true, meetingId: 104 }),
    );
  });
});
