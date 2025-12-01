import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useSendMessages() {
  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async (chatId) => {
      const res = await adminAxiosInstance.post(`dh-chat-messages/${chatId}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Sending Message");
      }
      return res.data;
    },
  });
  return { sendMessage, isSendingMessage };
}
