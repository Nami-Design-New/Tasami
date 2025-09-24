import { useTranslation } from "react-i18next";
import { useState } from "react";
import useGetConsultaionComments from "../../../../hooks/website/communities/useGetConsultaionComments";
import CustomButton from "../../../CustomButton";
import EmptySection from "../../../EmptySection";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import ConsultationCommentsCard from "./ConsultationCommentsCard";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import AddCommentModal from "../../../modals/AddCommentModal";

export default function ConsultaionComments() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const {
    consultaionComments,
    commentsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetConsultaionComments();

  const allConsultaionComments =
    consultaionComments?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <div className="comments">
      <div className="comments-header">
        <h2>{t("community.comments")}</h2>
        <CustomButton size="large" onClick={() => setShowModal(true)}>
          {t("community.addComment")}
        </CustomButton>
      </div>

      <div className="row">
        {!commentsLoading && allConsultaionComments.length === 0 && (
          <EmptySection height="500px" message={t("community.noComments")} />
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allConsultaionComments.map((comment) => (
            <div className="col-12 col-lg-6 p-2" key={comment.id}>
              <ConsultationCommentsCard comment={comment} />
            </div>
          ))}
        </InfiniteScroll>

        {(commentsLoading || isFetchingNextPage) && (
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
