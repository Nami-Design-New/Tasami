import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useEditAssistance() {
  const { mutate: editYourAssistance, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post(`my-help-service/${payload.id}`, {
        is_archived: payload.isArchived,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Editng your assistance");
      }
      return res.data;
    },
  });
  return { editYourAssistance, isPending };
}
