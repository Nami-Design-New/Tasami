import { describe, expect, it } from "vitest";
import {
  getConversationBreadcrumb,
  getConversationDetailsPath,
} from "./newChatBreadcrumb";

const t = (key) => key;

const groupConversation = {
  type: "conversation_of_group",
  code: "PO240626000004",
  work_id: 793,
  group_id: 19,
  helper_id: 7,
};

describe("new chat breadcrumb routes", () => {
  it("opens a group inside the beneficiary work", () => {
    expect(getConversationDetailsPath(groupConversation, 10)).toBe(
      "/my-works/793/group",
    );
  });

  it("opens a group inside the helper contract", () => {
    expect(getConversationDetailsPath(groupConversation, 7)).toBe(
      "/my-contracts/793/group",
    );
  });

  it("links the sender name to helper details", () => {
    const breadcrumb = getConversationBreadcrumb({
      conversation: {
        type: "personal_goal_with_helper",
        code: "PO240626000004",
        work_id: 793,
        redirect_id: 31,
        sender_id: 42,
        sender_name: "Helper name",
      },
      currentUserId: 10,
      t,
    });

    expect(breadcrumb).toContainEqual({
      label: "Helper name",
      to: "/helper/42",
    });
    expect(breadcrumb.at(-1)).toEqual({
      label: "chats",
      to: "/user-chat/31",
    });
  });
});
