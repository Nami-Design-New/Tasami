import { useMutation } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useAddFaq() {
  const { mutate: addNewFaq, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await adminAxiosInstance.post("dh-fqs", payload);
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message, "Erro Adding FAq");
      }
      return res.data;
    },
  });

  return { addNewFaq, isPending };
}
