import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetCurrentPackage(enabled) {
  const { data: currentPackage, isLoading } = useQuery({
    queryKey: ["current-package"],
    queryFn: async () => {
      const res = await axiosInstance.get("current-package");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch current package");
      }
      return res.data.data;
    },
    enabled,
  });

  return { currentPackage, isLoading };
}
