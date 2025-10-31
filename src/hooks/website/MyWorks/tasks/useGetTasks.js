import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetTasks(id) {
  const { data: goalTasks, isLoading } = useQuery({
    queryKey: ["work-tasks", id],
    queryFn: async () => {
      const res = await axiosInstance.get("tasks", {
        params: {
          work_id: id,
        },
      });
      if (res?.data?.code !== 200) {
        throw new Error(res.data.message || "Error Fetching the Tasks ");
      }
      return res.data.data;
    },

    enabled: !!id,
  });
  return { goalTasks, isLoading };
}
