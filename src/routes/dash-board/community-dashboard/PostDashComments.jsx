import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ConsultationCommentsCard from "../../../ui/website/communities/consultations/ConsultationCommentsCard";
import EmptySection from "../../../ui/EmptySection";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";
import useGetPostDashComments from "../../../hooks/dashboard/subscription/useGetPostDashComments";

export default function PostDashComments() {
  const { t } = useTranslation();
  const bottomRef = useRef(null);

  const {
    postDashComments,
    commentsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPostDashComments();

  const allPostComments =
    postDashComments?.pages?.flatMap((page) => page?.data) ?? [];

    console.log("postDashComments :::" , postDashComments , allPostComments);
    
  return (
    <div className="comments">
      <div className="comments-header  px-4 py-3">
        <h2>{t("community.comments")}</h2>
        {/* <CustomButton size="meduim" onClick={() => setShowModal(true)}>
          {t("community.addComment")}
        </CustomButton> */}
      </div>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ height: "500px" }}
      >
        {!commentsLoading && allPostComments.length === 0 && (
          <EmptySection height="500px" message={t("community.noComments")} />
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allPostComments.map((comment) => (
            <div className="w-full mt-3" key={comment.id}>
              <ConsultationCommentsCard comment={comment} />
            </div>
          ))}
          {/* <div ref={bottomRef} /> */}
        </InfiniteScroll>
        {(commentsLoading || isFetchingNextPage) && (
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
  );
}
