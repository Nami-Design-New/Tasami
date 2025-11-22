import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useAcceptOrRemoveWorkOffer() {
  const { mutate: acceptOrRemoveWorkOffer, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.put(
        `goal-offer/${payload?.offer_id}`,
        null,
        {
          params: payload,
        }
      );

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Handle offer");
      }
      return res.data;
    },
  });
  return { acceptOrRemoveWorkOffer, isPending };
}
