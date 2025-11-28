import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useUpdateFaqQorder() {
  const { mutate: reorderFaq, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post(`dh-fqs-orders`, payload);
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message, "Erro reorder FAq");
      }
      return res.data;
    },
  });

  return { reorderFaq, isPending };
}
