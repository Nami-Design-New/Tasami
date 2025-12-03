import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../../lib/axios";

export default function useUpdateCommunityChatCounter() {
  const { id } = useParams();

  return useMutation({
    mutationFn: async () =>
      await axiosInstance.post(`update-community-chat-counter`, {
        community_id: id,
      }),
  });
}
