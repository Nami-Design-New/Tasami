import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { toast } from "sonner";

export default function useGetTaskDistribution(workId) {
  const {
    data: taskDistribution = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["task-distribution", workId],
    queryFn: async () => {
      const response = await axiosInstance.post("distribution-tasks", {
        work_id: workId,
      });

      if (response.data.code !== 200) { 
        toast.error( response.data.message || "Error loading current task distribution")
        throw new Error(
          response.data.message || "Error loading task distribution",
        );
      }

      return response.data.data || [];
    },
    // The recommendation is generated deliberately from the page, rather than
    // every time a user opens the task list.
    enabled: false,
  });

  return { taskDistribution, isLoading, isFetching, isError, refetch };
}
