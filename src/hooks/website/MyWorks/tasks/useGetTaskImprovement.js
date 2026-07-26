import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosInstance } from "../../../../lib/axios";

const EMPTY_IMPROVEMENT = {
  comparison: [],
  overall_assessment: "",
  analysis: {
    strengths: [],
    conclusion: "",
    improvement_points: [],
  },
};

function normalizeImprovement(data) {
  const source = data?.improvement || data || {};
  const analysis = data?.analysis || source?.analysis || {};

  return {
    comparison: Array.isArray(source.comparison) ? source.comparison : [],
    overall_assessment: source.overall_assessment || "",
    analysis: {
      strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
      conclusion: analysis.conclusion || "",
      improvement_points: Array.isArray(analysis.improvement_points)
        ? analysis.improvement_points
        : [],
    },
  };
}

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

      return normalizeImprovement(response.data.data);
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
