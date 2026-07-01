import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteInquriy() {
  const { mutate: deleteInquriy, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`inquires/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to delete inquiry");
      }

      return res.data;
    },
  });

  return { deleteInquriy, isPending };
}
