import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../../lib/axios";

export default function useSendAssistantMessage() {
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("contract-chat", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message || "Error Sending Message");
      }
      return res.data.data;
    },
  });
  return { sendMessage, isPending };
}
