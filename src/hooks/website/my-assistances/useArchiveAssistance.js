import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useArchiveAssistance() {
  const { mutate: archiveYourAssistance, isPending } = useMutation({
    mutationFn: async ({ id, body }) => {
      const res = await axiosInstance.post(`my-help-service/${id}`, body);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Editng your assistance");
      }
      return res.data;
    },
  });
  return { archiveYourAssistance, isPending };
}
