import { useRef } from "react";
import { useTranslation } from "react-i18next";
import useGetConsultaionDashComments from "../../../hooks/dashboard/subscription/useGetConsultaionDashComments";
import ConsultationCommentsCard from "../../../ui/website/communities/consultations/ConsultationCommentsCard";
import EmptySection from "../../../ui/EmptySection";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import AudienceCardLoader from "../../../ui/loading/AudienceCardLoader";

export default function ConsultaionDashComments() {
  const { t } = useTranslation();
  const bottomRef = useRef(null);

  const {
    consultaionDashComments,
    commentsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetConsultaionDashComments();

  const allConsultaionComments =
    consultaionDashComments?.pages?.flatMap((page) => page?.data) ?? [];

    console.log("consultaionDashComments :::" , consultaionDashComments , allConsultaionComments);
    
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
        {!commentsLoading && allConsultaionComments.length === 0 && (
          <EmptySection height="500px" message={t("community.noComments")} />
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allConsultaionComments.map((comment) => (
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
