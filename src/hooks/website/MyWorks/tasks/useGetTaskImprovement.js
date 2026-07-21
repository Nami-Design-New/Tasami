import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosInstance } from "../../../../lib/axios";

const EMPTY_IMPROVEMENT = {
  comparison: [],
  overall_assessment: "",
};

export default function useGetTaskImprovement(workId) {
  const {
    data: taskImprovement = EMPTY_IMPROVEMENT,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["task-improvement", workId],
    queryFn: async () => {
      const response = await axiosInstance.post("distribution-tasks/improving", {
        work_id: workId,
      });

      if (response.data.code !== 200) {
        const message =
          response.data.message || "Error loading task improvement analysis";
        toast.error(message);
        throw new Error(message);
      }

      return response.data.data || EMPTY_IMPROVEMENT;
    },
    enabled: false,
  });

  return {
    taskImprovement,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
