import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useEditFaq() {
  const { mutate: editNewFaq, isPending } = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await adminAxiosInstance.post(`dh-fqs/${id}`, payload);
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message, "Erro Editing FAq");
      }
      return res.data;
    },
  });

  return { editNewFaq, isPending };
}
