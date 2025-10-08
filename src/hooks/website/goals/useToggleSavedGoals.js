import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useToggleSavedGoals() {
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["homeData"] });
      queryClient.refetchQueries({ queryKey: ["saves"] });
      queryClient.refetchQueries({ queryKey: ["goals"] });
      queryClient.refetchQueries({ queryKey: ["goal-details"] });
    },
  });
  return { toggleSaveGoal, isPending };
}
