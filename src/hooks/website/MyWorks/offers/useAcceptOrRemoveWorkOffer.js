import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useAcceptOrRemoveWorkOffer() {
  const { mutate: acceptOrRemoveWorkOffer, isPending } = useMutation({
    mutationFn: async (payload) => {
      console.log(payload);

      const res = await axiosInstance.put(
        `goal-offer/${payload?.offer_id}`,
        null,
        {
          params: payload,
        }
      );
      console.log("accept Response", res.data);

      if (res.data.code !== 200) {
        console.log("From Error", res.data);

        // throw new Error(res.data.message, "Error Handle offer");
      }
      return res.data;
    },
  });
  return { acceptOrRemoveWorkOffer, isPending };
}
