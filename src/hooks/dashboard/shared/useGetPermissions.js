import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";
import { useSearchParams } from "react-router";

export default function useGetPermissions() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data: permissions, isLoading } = useQuery({
    queryKey: ["dashboard-permissions", search],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-permissions", {
        params: {
          search,
        },
      });

      if (res.data?.code !== 200) {
        throw new Error(res.data.code, "Error fetching permissions");
      }
      return res.data;
    },

    staleTime: undefined,
    gcTime: undefined,
  });

  return { permissions, isLoading };
}
