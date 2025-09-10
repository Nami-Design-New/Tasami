import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetPackages() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ["get-packages"],
    queryFn: async () => {
      const res = await axiosInstance.get("packages");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch packages");
      }
      return res.data.data;
    },
  });

  return { packages, isLoading };
}
