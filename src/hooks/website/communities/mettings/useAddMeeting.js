import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useAddMeeting() {
  const { mutate: addMeeting, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("meeting", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error adding meeting");
      }
      return res.data;
    },
  });
  return { addMeeting, isPending };
}
