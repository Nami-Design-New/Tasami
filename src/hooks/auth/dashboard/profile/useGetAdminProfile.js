import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetAdminProfile(enabled) {
  const {
    data: profile,
    isLoading,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("auth/dh-profile");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data.data;
    },
    enabled,
    retry: false,
  });
  return { profile, isLoading, isFetching, isSuccess };
}
