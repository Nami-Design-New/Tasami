import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import avatarPlaceholder from "../../assets/images/dashboard/avatar-placeholder.jpg";
import useGetNewChatAlerts from "../../hooks/website/chats/useGetNewChatAlerts";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import Loading from "../../ui/loading/Loading";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import triangleWithHelper from "../../assets/icons/triangle-with-helper.svg";
import helpServiceFromHelper from "../../assets/icons/help_service_from_helper.svg";
import chatIcon from "../../assets/icons/chat.svg";

const formatCount = (count) => (count > 99 ? "99+" : count);

const getConversationDetailsPath = (conversation) => {
  let detailsId;
  if (conversation.type === "conversation_of_community") {
    detailsId = conversation?.community_id;
  } else if (
    conversation.type === "help_service_from_helper" ||
    conversation.type === "personal_goal_with_helper"
  ) {
    detailsId = conversation?.work_id;
  } else {
    detailsId = conversation?.group_id;
  }

  if (conversation.type === "conversation_of_community") {
    return `/community/${detailsId}`;
  }

  if (conversation.type === "conversation_of_group") {
    return `/my-group/${detailsId}`;
  }

  if (conversation.type === "help_service_from_helper") {
    return `/my-contracts/${detailsId}`;
  }

  return `/my-works/${detailsId}`;
};

const getConversationSectionPath = (conversation) => {
  const detailsPath = getConversationDetailsPath(conversation);

  if (conversation.type === "help_service_from_helper") {
    return `${detailsPath}/beneficiaries`;
  }

  if (conversation.type === "personal_goal_with_helper") {
    return `${detailsPath}/assistants`;
  }

  return detailsPath;
};

const getConversationPath = (conversation) => {
  if (conversation.type === "conversation_of_community") {
    return `/community/${conversation.redirect_id}/chats`;
  }

  if (conversation.type === "conversation_of_group") {
    return `/group/chat/${conversation?.id}`;
  }

  return `/user-chat/${conversation?.redirect_id}`;
};

const getConversationIcon = (type) => {
  if (
    type === "conversation_of_community" ||
    type === "conversation_of_group"
  ) {
    return "fa-regular fa-users";
  }
  return "fa-regular fa-comment";
};

export default function NewChatAlerts() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    newChatAlerts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetNewChatAlerts();

  const handleOpenChat = () => {
    queryClient.invalidateQueries({ queryKey: ["counters-notify"] });
    queryClient.invalidateQueries({ queryKey: ["quick-chat-alerts"] });
  };

  const getConversationLabel = (type) => {
    if (type === "conversation_of_community") {
      return t("community_chat");
    }

    if (type === "conversation_of_group") {
      return t("groupChats");
    }

    return t("chats");
  };

  const getConversationBreadcrumb = (conversation) => {
    const chatPath = getConversationPath(conversation);
    const codeLabel =
      conversation.code || conversation.name || conversation.sender_name;
    const detailsPath = getConversationDetailsPath(conversation);
    console.log(chatPath, detailsPath);

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

    return [
      { label: codeLabel, to: detailsPath },
      {
        label: t("works.assistants", "المساعدون"),
        to: getConversationSectionPath(conversation),
      },
      {
        label: conversation.name || conversation.sender_name,
        to: chatPath,
      },
    ];
  };

  const getReactangleIcon = (type) => {
    if (type === "help_service_from_helper") {
      return <img src={helpServiceFromHelper} />;
    } else if (type === "personal_goal_with_helper") {
      return <img src={triangleWithHelper} />;
    }
    return;
  };
  return (
    <section className="new-chat-alerts page">
      <div className="container">
        <header className="new-chat-alerts__header">
          <RoundedBackButton onClick={() => navigate(-1)} />
          <h1>{t("quickChats.title", "المحادثات الجديدة")}</h1>
        </header>

        {isLoading ? (
          <Loading />
        ) : newChatAlerts.length === 0 ? (
          <EmptySection
            height="300px"
            message={t("quickChats.empty", "لا توجد محادثات جديدة")}
          />
        ) : (
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            <ul className="new-chat-alerts__list">
              {newChatAlerts.map((item) => (
                <li key={item.id}>
                  <Link
                    to={{
                      pathname: getConversationPath(item),
                      search: "?source=quick-access",
                    }}
                    state={{
                      fromQuickAccess: true,
                      quickChatBreadcrumb: getConversationBreadcrumb(item),
                    }}
                    className="new-chat-alerts__item"
                    onClick={handleOpenChat}
                  >
                    <img
                      src={item.image || avatarPlaceholder}
                      alt={item.sender_name}
                      className="new-chat-alerts__avatar"
                    />
                    <div className="new-chat-alerts__content">
                      <strong>{item.sender_name}</strong>
                      {(item.type === "conversation_of_group" ||
                        item.type === "conversation_of_community") && (
                        <div className="group_community--sec">
                          <i className={getConversationIcon(item.type)}></i>{" "}
                          <p>
                            <span className="label">
                              {getConversationLabel(item.type)}
                            </span>
                            {"  "}
                            <span className="name">{item.name}</span>
                          </p>
                        </div>
                      )}
                      {(item?.type === "personal_goal_with_helper" ||
                        item?.type === "help_service_from_helper") && (
                        <div className="d-flex gap-2">
                          <span> {getReactangleIcon(item.type)} </span>{" "}
                          <span> {item?.description}</span>
                        </div>
                      )}
                    </div>
                    <div className="new-chat-alerts__icon">
                      <img src={chatIcon} />
                      <span className="new-chat-alerts__badge">
                        {formatCount(item?.unread_count)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {isFetchingNextPage && <Loading />}
          </InfiniteScroll>
        )}
      </div>
    </section>
  );
}
