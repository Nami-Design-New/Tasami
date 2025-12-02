import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useReportGoalOrService() {
  const { mutate: reportGoalOrService, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post("violation-report", payload);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Reporting Goal");
      }
      return res.data;
    },
  });
  return { reportGoalOrService, isPending };
}
