import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../../../../lib/axios";

const EMPTY_STATUS = {
  current_distribution: [],
  optimal_distribution: [],
  improvement: {
    comparison: [],
    overall_assessment: "",
  },
  analysis: {
    strengths: [],
    conclusion: "",
    improvement_points: [],
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

      const data = response.data.data || {};
      const improvement = data.improvement || {};
      const analysis = data.analysis || {};

      return {
        ...EMPTY_STATUS,
        ...data,
        current_distribution: Array.isArray(data.current_distribution)
          ? data.current_distribution
          : [],
        optimal_distribution: Array.isArray(data.optimal_distribution)
          ? data.optimal_distribution
          : [],
        improvement: {
          comparison: Array.isArray(improvement.comparison)
            ? improvement.comparison
            : [],
          overall_assessment: improvement.overall_assessment || "",
        },
        analysis: {
          strengths: Array.isArray(analysis.strengths)
            ? analysis.strengths
            : [],
          conclusion: analysis.conclusion || "",
          improvement_points: Array.isArray(analysis.improvement_points)
            ? analysis.improvement_points
            : [],
        },
        optimal_distribution_generated: Boolean(
          data.optimal_distribution_generated,
        ),
        improvement_generated: Boolean(data.improvement_generated),
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
