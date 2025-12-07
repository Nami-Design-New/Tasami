// export default ChatList;
import { useSelector } from "react-redux";
import useGetChats from "../../hooks/dashboard/chats/useGetChats";
import ChatCardLoader from "../loading/ChatCardLoader";
import InfiniteScroll from "../loading/InfiniteScroll";
import ChatItem from "./ChatItem";

const ChatList = ({ onChatSelect, activeChat }) => {
  const { chat } = useSelector((state) => state.chat);
  const {
    chatRooms,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetChats(chat?.id);

  const allChats = chatRooms?.pages?.flatMap((p) => p.data) ?? [];

  return (
    <>
      <InfiniteScroll
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        <ul className="chat-list">
          {allChats?.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onChatSelect={onChatSelect}
              activeChat={activeChat}
            />
          ))}
        </ul>
      </InfiniteScroll>

      {(isLoading || isFetchingNextPage) &&
        [1, 2, 3].map((i) => (
          <div className="col-12 p-2" key={i}>
            <ChatCardLoader />
          </div>
        ))}
    </>
  );
};

export default ChatList;
