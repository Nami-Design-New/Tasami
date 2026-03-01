import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetTaskSystems(user) {
  const { data: taskSystems, isLoading } = useQuery({
    queryKey: ["task-systems-web"],
    queryFn: async () => {
      const res = await axiosInstance.get("app-task-systems?type=outside");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "");
      }

      return res.data;
    },
    enabled: !!user,
  });
  return { taskSystems, isLoading };
}
