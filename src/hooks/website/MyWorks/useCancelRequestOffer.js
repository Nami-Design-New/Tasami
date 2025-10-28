import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useCancelRequestOffer() {
  const { mutate: cancelRequestOffer, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`cancel-request/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error canceling request");
      }

      return res.data.data;
    },
  });
  return { cancelRequestOffer, isPending };
}
