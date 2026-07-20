const isSameId = (firstId, secondId) =>
  firstId != null && secondId != null && String(firstId) === String(secondId);

export const getConversationDetailsPath = (conversation, currentUserId) => {
  if (conversation.type === "conversation_of_community") {
    return `/community/${conversation.community_id}`;
  }

  if (conversation.type === "conversation_of_group") {
    const section = isSameId(currentUserId, conversation.helper_id)
      ? "my-contracts"
      : "my-works";

    return `/${section}/${conversation.work_id}/group`;
  }

  if (conversation.type === "help_service_from_helper") {
    return `/my-contracts/${conversation.work_id}`;
  }

  return `/my-works/${conversation.work_id}`;
};

export const getConversationSectionPath = (conversation, currentUserId) => {
  const detailsPath = getConversationDetailsPath(conversation, currentUserId);

  if (conversation.type === "help_service_from_helper") {
    return `${detailsPath}/beneficiaries`;
  }

  if (conversation.type === "personal_goal_with_helper") {
    return `${detailsPath}/assistants`;
  }

  return detailsPath;
};

export const getConversationPath = (conversation) => {
  if (conversation.type === "conversation_of_community") {
    return `/community/${conversation.redirect_id}/chats`;
  }

  if (conversation.type === "conversation_of_group") {
    return `/group/chat/${conversation.group_id}`;
  }

  return `/user-chat/${conversation.redirect_id}`;
};

const getConversationUserPath = (conversation) => {
  const userId =
    conversation.sender_id ?? conversation.user_id ?? conversation.helper_id;

  return userId == null ? null : `/helper/${userId}`;
};

export const getConversationBreadcrumb = ({
  conversation,
  currentUserId,
  t,
}) => {
  const chatPath = getConversationPath(conversation);
  const detailsPath = getConversationDetailsPath(conversation, currentUserId);
  const codeLabel =
    conversation.code || conversation.name || conversation.sender_name;

  console.log("ChatPth:", chatPath);
  console.log("DetailsPath:", detailsPath);
  console.log("CodeLabel:", codeLabel);

  if (conversation.type === "conversation_of_community") {
    return [
      { label: codeLabel, to: detailsPath },
      {
        label: t("website.assistants.community", "المجتمع"),
        to: detailsPath,
      },
      { label: t("chats"), to: chatPath },
    ];
  }

  if (conversation.type === "conversation_of_group") {
    return [
      { label: codeLabel, to: detailsPath },
      { label: t("works.myGroup", "المجموعة"), to: detailsPath },
      { label: t("chats"), to: chatPath },
    ];
  }

  const userPath = getConversationUserPath(conversation);
  const userBreadcrumb = userPath
    ? [
        {
          label: conversation.sender_name || conversation.name,
          to: userPath,
        },
      ]
    : [];

  return [
    { label: codeLabel, to: detailsPath },
    {
      label: t("works.assistants", "المساعدون"),
      to: getConversationSectionPath(conversation, currentUserId),
    },
    ...userBreadcrumb,
    { label: t("chats"), to: chatPath },
  ];
};
