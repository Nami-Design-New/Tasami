import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "../../../lib/axios";

export default function useDismissFollowSuccessNotice() {
  const { mutate: dismissFollowSuccessNotice, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("notification-setting", {
        hide_follow_success_notice: true,
      });

      if (response.data.code !== 200) {
        throw new Error(
          response.data.message || "Failed to save notification preference",
        );
      }

      return response.data;
    },
  });

  return { dismissFollowSuccessNotice, isPending };
}
