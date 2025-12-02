import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useDeleteMeeting() {
  const { mutate: deleteMeeting, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`meeting/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data || "Error Deleting Meeting");
      }
      return res.data;
    },
  });
  return { deleteMeeting, isPending };
}
