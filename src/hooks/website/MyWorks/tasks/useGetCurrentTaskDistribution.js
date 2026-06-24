import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { toast } from "sonner";

export default function useGetCurrentTaskDistribution(workId) {
  const {
    data: currentTaskDistribution = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["current-task-distribution", workId],
    queryFn: async () => {
      const response = await axiosInstance.post("distribution-tasks/current", {
        work_id: workId,
      });

      if (response.data.code !== 200) {
        toast.error( response.data.message || "Error loading current task distribution")
        throw new Error(
          response.data.message || "Error loading current task distribution",
        ); 
      }

      return response.data.data || [];
    },
    enabled: Boolean(workId),
  });

  return {
    currentTaskDistribution,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
