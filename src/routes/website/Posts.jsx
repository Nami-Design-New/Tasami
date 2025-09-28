import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetPosts from "../../hooks/website/communities/posts/useGetPosts";
import CustomButton from "../../ui/CustomButton";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AddPostModal from "../../ui/website/communities/posts/AddPostModal";
import PostCard from "../../ui/website/communities/posts/PostCard";

export default function Posts({ isMyCommuntiy = true }) {
  console.log(isMyCommuntiy);

  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { posts, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetPosts();
  const allPosts = posts?.pages?.flatMap((page) => page?.data) ?? [];
  return (
    <div className="consultations-section">
      <div className="row">
        {" "}
        {isMyCommuntiy && (
          <div className="col-12 p-2">
            {" "}
            <div className="d-flex align-items-center justify-content-end">
              <CustomButton onClick={() => setShowModal(true)}>
                {t("community.addPost")}
              </CustomButton>
            </div>
          </div>
        )}
        {!isLoading && allPosts.length === 0 && (
          <EmptySection height="500px" message={t("communty.noPosts")} />
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allPosts.map((post) => (
            <div className="col-12 p-2" key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </InfiniteScroll>
        {(isLoading || isFetchingNextPage) && (
          <>
            {[1, 2, 3].map((i) => (
              <div className="col-12 p-2" key={i}>
                <AudienceCardLoader />
              </div>
            ))}
          </>
        )}
      </div>
      {isMyCommuntiy && (
        <AddPostModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}
