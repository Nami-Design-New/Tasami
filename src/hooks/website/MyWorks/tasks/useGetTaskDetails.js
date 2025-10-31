import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";
import { useParams } from "react-router";

export default function useGetTaskDetails() {
  const { taskId } = useParams();
  const { data: taskDetails, isLoading } = useQuery({
    queryKey: ["task-details", taskId],
    queryFn: async () => {
      const res = await axiosInstance.get(`tasks/${taskId}`);
      if (res.data.code !== 200) {
        throw new Error(res?.data?.message || "Error Fetching Task Details");
      }
      return res.data.data;
    },
  });

  return { taskDetails, isLoading };
}
