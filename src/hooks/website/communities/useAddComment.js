import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useAddComment() {
  const { id } = useParams();
  const { mutate: addComment, isPending } = useMutation({
    mutationFn: async (comment) => {
      const res = await axiosInstance.post("consultation-comments", null, {
        params: { consultation_id: id, comment },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to reply to consultaion");
      }
      return res.data;
    },
  });
  return { addComment, isPending };
}
