import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useSendPublicNotification() {
  const {
    mutate: sendPublicNotification,
    isPending: isSendingPublicNotification,
  } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(
        "dh-send-general-notifications",
        payload
      );
      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || "Error sending public notification"
        );
      }
      return res.data;
    },
  });

  return { sendPublicNotification, isSendingPublicNotification };
}
