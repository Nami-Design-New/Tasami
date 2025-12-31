import useGetCommunityPosts from "../../hooks/dashboard/subscription/useGetCommunityPosts";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import PostCard from "../../ui/website/communities/posts/PostCard";

export default function DashboardPosts() {
  const {
    communityPostTest,
    postsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCommunityPosts();

  const allCommunityPostTest =
    communityPostTest?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <div className="consultations-section">
      <div className="row">
        {!postsLoading && allCommunityPostTest.length === 0 && (
          <EmptySection message={"not exist"} />
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
      </div>
    </div>
  );
}
