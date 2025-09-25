import React, { useState } from "react";
import useGetPostComments from "../../../../hooks/website/communities/posts/useGetPostComments";
import CustomButton from "../../../CustomButton";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import ConsultationCommentsCard from "../consultations/ConsultationCommentsCard";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import EmptySection from "../../../EmptySection";
import AddCommentModal from "../../../modals/AddCommentModal";
import { useTranslation } from "react-i18next";

export default function PostsComments() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const {
    postComments,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPostComments();

  const allPostComments =
    postComments?.pages?.flatMap((page) => page?.data) ?? [];
  return (
    <div className="comments">
      <div className="comments-header">
        <h2>{t("community.comments")}</h2>
        <CustomButton size="large" onClick={() => setShowModal(true)}>
          {t("community.addComment")}
        </CustomButton>
      </div>

      <div className="row">
        {!isLoading && allPostComments.length === 0 && (
          <EmptySection height="500px" message={t("community.noComments")} />
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allPostComments.map((comment) => (
            <div className="col-12 col-lg-6 p-2" key={comment.id}>
              <ConsultationCommentsCard comment={comment} />
            </div>
          ))}
        </InfiniteScroll>

        {(isLoading || isFetchingNextPage) && (
          <div className="row">
            {[1, 2, 3].map((i) => (
              <div className="col-12 col-lg-6 p-2" key={i}>
                <AudienceCardLoader />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddCommentModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
