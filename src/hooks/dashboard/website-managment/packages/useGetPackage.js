import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetPackage(id, enabled = true) {
  const {
    data: packageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dh-package", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-packages/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching package");
      }
      return res.data.data;
    },
    enabled: enabled && !!id,
  });
  return { packageData, isLoading, error };
}
