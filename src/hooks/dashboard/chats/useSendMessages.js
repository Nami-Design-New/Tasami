import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useSendMessages() {
  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-chat-messages`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Sending Message");
      }
      return res.data;
    },
  });
  return { sendMessage, isSendingMessage };
}
