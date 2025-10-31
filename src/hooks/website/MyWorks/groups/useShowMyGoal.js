import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useShowMyGoal() {
  const { mutate: showMyGoal, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("group-of-goal", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Show my Goal");
      }
      return res.data.data;
    },
  });
  return { showMyGoal, isPending };
}
