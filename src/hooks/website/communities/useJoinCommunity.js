import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useJoinCommunity() {
  const { mutate: joinCommunity, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("my-communities", payload);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error join community");
      }
      return res.data;
    },
  });

  return { joinCommunity, isPending };
}
