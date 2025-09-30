import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useToggleSavedGoals() {
  const { mutate: toggleSaveGoal, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.post("my-saved-goals", {
        work_id: id,
      });
      if (res.data.code !== 200) {
        throw new Error(res?.data?.message || "Error saving Goal");
      }

      return res.data;
    },
  });
  return { toggleSaveGoal, isPending };
}
