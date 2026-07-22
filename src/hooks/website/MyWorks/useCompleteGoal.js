import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useCompleteGoal() {
  const queryClient = useQueryClient();
  const { mutate: completeGoal, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.put(`my-works/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Complete Goal");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counters-notify"] });
    },
  });
  return { completeGoal, isPending };
}
