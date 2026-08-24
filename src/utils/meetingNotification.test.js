import { describe, expect, it } from "vitest";
import { getMeetingNotificationUrl } from "./meetingNotification";

describe("getMeetingNotificationUrl", () => {
  it("builds the community meeting URL from the notification data", () => {
    expect(
      getMeetingNotificationUrl({ operation_id: 55, community_id: 77 }),
    ).toBe(
      "/community/77/meetings?meeting_id=55",
    );
  });

  it("falls back when the community or meeting ID is unavailable", () => {
    expect(getMeetingNotificationUrl({})).toBe("/notifications");
    expect(getMeetingNotificationUrl({ operation_id: 55 })).toBe(
      "/notifications",
    );
  });
});
