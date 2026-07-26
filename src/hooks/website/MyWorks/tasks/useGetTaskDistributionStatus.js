import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../../../../lib/axios";

const EMPTY_STATUS = {
  current_distribution: [],
  optimal_distribution: [],
  improvement: {
    comparison: [],
    overall_assessment: "",
  },
  optimal_distribution_generated: false,
  improvement_generated: false,
};

export default function useGetTaskDistributionStatus(workId) {
  const {
    data: taskDistributionStatus = EMPTY_STATUS,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["task-distribution-status", workId],
    queryFn: async () => {
      const response = await axiosInstance.get("distribution-tasks/status", {
        params: { work_id: workId },
      });

      if (response.data.code !== 200) {
        throw new Error(
          response.data.message || "Error loading task distribution status",
        );
      }

      return {
        ...EMPTY_STATUS,
        ...response.data.data,
        improvement: {
          ...EMPTY_STATUS.improvement,
          ...response.data.data?.improvement,
        },
      };
    },
    enabled: Boolean(workId),
    retry: false,
  });

  return {
    taskDistributionStatus,
    isLoading,
    isError,
    refetch,
  };
}
