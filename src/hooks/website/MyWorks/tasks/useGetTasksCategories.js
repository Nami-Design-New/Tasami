import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetTasksCategories() {
  const { data: taskaCategories, isLoading } = useQuery({
    queryKey: ["tasks-categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("task-categories");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Data");
      }
      return res.data.data;
    },
  });
  return { taskaCategories, isLoading };
}
