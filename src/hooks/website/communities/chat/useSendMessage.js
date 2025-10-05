import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../../lib/axios";

export default function useSendMessage() {
  const { id } = useParams();
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async ({ type, message, file_path }) => {
      const res = await axiosInstance.post("community-chat", {
        community_id: id,
        type,
        message,
        file_path,
      });
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message || "Error Sending Message");
      }
      return res.data.data;
    },
  });
  return { sendMessage, isPending };
}
