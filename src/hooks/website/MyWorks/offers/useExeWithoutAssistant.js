import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useExeWithoutAssistant() {
  const { mutate: removeAssistants, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`ask-for-helper/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error removing assistant");
      }
      return res.data;
    },
  });

  return { removeAssistants, isPending };
}
