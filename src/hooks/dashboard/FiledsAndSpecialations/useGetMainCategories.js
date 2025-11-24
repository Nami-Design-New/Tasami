import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetMainCategories() {
  const { data: mainCategories, isLoading } = useQuery({
    queryKey: ["dashboard-main-categories"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-categories");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Categories");
      }
      return res.data;
    },
  });
  return { mainCategories, isLoading };
}
