import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useUnjoinCommunity() {
  const { mutate: unjoinCommunity, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.put(`my-communities/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Unjoin community");
      }
      return res.data;
    },
  });

  return { unjoinCommunity, isPending };
}
