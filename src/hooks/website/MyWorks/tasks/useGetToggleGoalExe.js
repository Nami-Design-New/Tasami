import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetToggleGoalExe() {
  const { mutate: toggleGoalExe, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.get(`toggle-goal-execution/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error execute Goal Tasks");
      }
      return res.data;
    },
  });
  return { toggleGoalExe, isPending };
}
