import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetRoles() {
  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ["dashboard-roles"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-roles");
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error fetching Roles");
      }
      return res.data;
    },
  });
  return { roles, rolesLoading };
}
