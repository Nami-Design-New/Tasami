import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useEditMeeting() {
  const { mutate: editMeeting, isPending } = useMutation({
    mutationFn: async ({ id, params }) => {
      const res = await axiosInstance.put(`meeting/${id}`, null, {
        params,
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Editing Meeting");
      }
      return res.data;
    },
  });
  return { editMeeting, isPending };
}
