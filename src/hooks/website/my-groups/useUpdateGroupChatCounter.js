import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useUpdateGroupChatCounter() {
  const { id } = useParams();

  return useMutation({
    mutationFn: async () =>
      await axiosInstance.post(`update-group-chat-counter`, {
        group_id: id,
      }),
  });
}
