import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useAddPostComments from "../../../../hooks/website/communities/posts/useAddPostComments";
import useDeletePostComment from "../../../../hooks/website/communities/posts/useDeletePostComment";
import useGetPostComments from "../../../../hooks/website/communities/posts/useGetPostComments";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomButton from "../../../CustomButton";
import EmptySection from "../../../EmptySection";
import InputField from "../../../forms/InputField";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import ConsultationCommentsCard from "../consultations/ConsultationCommentsCard";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { formatDate } from "../../../../utils/helper";

export default function PostsComments({ isSubscribed, isMyCommunity }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const bottomRef = useRef(null);
  const { user } = useSelector((state) => state.authRole);
  const schema = yup.object().shape({
    commentText: yup
      .string()
      .required(
        t("validation.requiredField", { field: t("community.commentLabel") })
      )
      .min(
        1,
        t("validation.min", { field: t("community.commentLabel"), min: 15 })
      ),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    postComments,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPostComments();

  const allPostComments =
    postComments?.pages?.flatMap((page) => page?.data) ?? [];

  const { addPostComment } = useAddPostComments();
  const { deletePostComment, isPending: isDeleting } = useDeletePostComment();

  const handleDeleteComment = (commentId) => {
    deletePostComment(commentId, {
      onSuccess: (res) => {
        toast.success(res.message || "Comment deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      },
    });
  };

  const onSubmit = async (data) => {
    const newComment = {
      id: `temp-${Date.now()}`,
      comment: data.commentText,
      created_at: formatDate(new Date().toISOString()),
      user_image: user?.image,
      user_id: user?.id,
      user_name: user?.name,
    };

    // Cancel any outgoing refetches (so we don’t overwrite optimistic update)
    await queryClient.cancelQueries({ queryKey: ["post-comments"] });

    // Snapshot previous value
    const previousComments = queryClient.getQueryData([
      "post-comments",
      `${id}`,
    ]);

    // Optimistically update to the new value
    queryClient.setQueryData(["post-comments", `${id}`], (old) => {
      if (!old.pages.length) {
        // No existing pages, create one
        return { ...old, pages: [{ data: [newComment] }] };
      }

      const lastPageIndex = old.pages.length - 1;

      const updatedPages = old.pages.map((page, idx) =>
        idx === lastPageIndex
          ? { ...page, data: [...page.data, newComment] }
          : page
      );

      return { ...old, pages: updatedPages };
    });

    bottomRef.current.scrollIntoView({ behavior: "smooth" });

    // Reset input

    addPostComment(data?.commentText, {
      onSuccess: (res) => {
        toast.success(res.message);
        // queryClient.invalidateQueries({ queryKey: ["post-comments"] });

        reset();
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || err?.message || "Something went wrong"
        );
        // Rollback to previous comments
        queryClient.setQueryData(["post-comments"], previousComments);
      },
    });
  };

  return (
    <div className="comments ">
      {/* Header */}
      <div className="comments-header  px-4 py-3 ">
        <h2 className="text-lg font-semibold">{t("community.comments")}</h2>
      </div>
      {/* Comments list */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ height: "500px" }}
      >
        {" "}
        {!isLoading && allPostComments.length === 0 && (
          <EmptySection height="400px" message={t("community.noComments")} />
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allPostComments.map((comment) => (
            <div className="w-full mt-3" key={comment.id}>
              <ConsultationCommentsCard
                comment={comment}
                onDelete={handleDeleteComment}
                isDeleting={isDeleting}
              />
            </div>
          ))}
        </InfiniteScroll>
        {(isLoading || isFetchingNextPage) && (
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
      {/* Add comment input - sticky */}
      {
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex align-items-center gap-2 p-3">
            <InputField
              placeholder={t("community.commentPlaceholder")}
              id="commentText"
              {...register("commentText")}
            />
            <CustomButton
              loading={isLoading}
              style={{ height: "54px" }}
              color="success"
              type="submit"
            >
              <i className="fa-solid fa-send"></i>
            </CustomButton>
          </div>
        </form>
      }{" "}
    </div>
  );
}
