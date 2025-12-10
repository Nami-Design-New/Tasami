import PostCard from "../../ui/website/communities/posts/PostCard";
import { useRef } from "react";
import useGetCommunityPosts from "../../hooks/dashboard/subscription/useGetCommunityPosts";
import EmptySection from "../../ui/EmptySection";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";

export default function DashboardPosts() {
  const bottomRef = useRef(null);

  const {
    communityPostTest,
    postsLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCommunityPosts();

  const allCommunityPostTest =
    communityPostTest?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <div className="consultations-section">
      <div className="row">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!postsLoading && allCommunityPostTest.length === 0 && (
            <EmptySection  message={"not exist"} />
          )}
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {allCommunityPostTest?.map((post) => (
              <div className="col-12 p-2" key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
            {/* <div ref={bottomRef} /> */}
          </InfiniteScroll>
          {(postsLoading || isFetchingNextPage) && (
            <div className="">
              {[1, 2, 3].map((i) => (
                <div key={i} className="mt-3">
                  <AudienceCardLoader />
                </div>
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
