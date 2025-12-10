import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useDeleteFaq() {
  const { mutate: deleteFaq, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await adminAxiosInstance.delete(`dh-fqs/${id}`);
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message, "Erro Deleting FAq");
      }
      return res.data;
    },
  });

  return { deleteFaq, isPending };
}
