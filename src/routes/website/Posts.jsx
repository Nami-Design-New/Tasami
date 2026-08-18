import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import searchIcon from "../../assets/icons/search.svg";
import useGetPosts from "../../hooks/website/communities/posts/useGetPosts";
import CustomButton from "../../ui/CustomButton";
import EmptySection from "../../ui/EmptySection";
import InputField from "../../ui/forms/InputField";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AddPostModal from "../../ui/website/communities/posts/AddPostModal";
import PostCard from "../../ui/website/communities/posts/PostCard";

export default function Posts({ isMyCommuntiy = true }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const [showModal, setShowModal] = useState(false);
  const { posts, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetPosts();
  const allPosts = posts?.pages?.flatMap((page) => page?.data) ?? [];
  const firstPage = posts?.pages?.[0];
  const postsCount =
    firstPage?.total ?? firstPage?.data?.total ?? allPosts.length;

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((currentParams) => {
        const params = new URLSearchParams(currentParams);
        const searchTerm = searchValue.trim();

        if (searchTerm) {
          params.set("search", searchTerm);
        } else {
          params.delete("search");
        }

        return params;
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, setSearchParams]);

  return (
    <div className="consultations-section">
      <div className="row">
        <div className="col-12 p-2">
          <div className="posts-toolbar form_ui">
            <p className="posts-toolbar__count">
              <strong>{postsCount}</strong> {t("community.postsCountLabel")}
            </p>
            <InputField
              className="posts-toolbar__search"
              type="search"
              placeholder={t("community.searchPosts")}
              aria-label={t("community.searchPosts")}
              icon={searchIcon}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            {isMyCommuntiy && (
              <CustomButton onClick={() => setShowModal(true)}>
                {t("community.addPost")}
              </CustomButton>
            )}
          </div>
        </div>
        {!isLoading && allPosts.length === 0 && (
          <EmptySection height="500px" message={t("community.noPosts")} />
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
