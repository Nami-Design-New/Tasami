import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useWorkWithoutAssistant() {
  const { mutate: removeAssistant, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`ask-for-helper/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Remoing assistant");
      }
      return res.data.data;
    },
  });
  return { removeAssistant, isPending };
}
