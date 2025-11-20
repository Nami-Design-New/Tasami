import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetPermissions() {
  const { data: permissions, isLoading } = useQuery({
    queryKey: ["dashboard-permissions"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-permissions");
      if (res.data?.code !== 200) {
        throw new Error(res.data.code, "Error fetching permissions");
      }
      return res.data;
    },
  });
  return { permissions, isLoading };
}
