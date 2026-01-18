import { useRef } from "react";
import { useParams } from "react-router";
import Message from "../../chat/Message";
import InfiniteScroll from "../../loading/InfiniteScroll";
import Loading from "../../loading/Loading";
import { useTranslation } from "react-i18next";

export default function ChatHistory({
  messages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}) {
  const chatContainerRef = useRef(null);
  const { userId } = useParams();
  const { t } = useTranslation();
  return (
    <div className="community-chat-window page  pt-3  m-0 ">
      <div className="chat-window  rounded-3" style={{ minHeight: "100dvh" }}>
        <div className="chat-window__header">
          <h4 className="chat-window__name">
            {t("chat_conversation_history")}
          </h4>
        </div>

        <div
          className="chat-window__messages"
          style={{ minHeight: "100dvh" }}
          ref={chatContainerRef}
        >
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            revers={true}
          >
            {" "}
            {(isLoading || isFetchingNextPage) && (
              <div className="d-flex align-items-center  py-3  justify-content-center">
                {/* <div className="loader"></div> */}
                <Loading height={20} />
              </div>
            )}
            {messages.map((chat) => {
              const form =
                Number(chat?.sender?.id) === Number(userId)
                  ? "sender"
                  : "receiver";
              return (
                <Message
                  key={chat?.id}
                  from={form}
                  creatorId={chat?.creator_id}
                  text={chat?.message}
                  time={chat?.created_at}
                  sender={chat?.sender}
                  filePath={chat?.file_path}
                  type={chat?.type}
                  avatar={
                    chat?.sender?.id === userId
                      ? chat.receiver?.image
                      : chat?.sender?.image
                  }
                />
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
