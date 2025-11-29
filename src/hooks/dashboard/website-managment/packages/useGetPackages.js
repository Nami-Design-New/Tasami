import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";
import { useSearchParams } from "react-router";

export default function useGetPackages(page, pageSize) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  const {
    data: packages,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dh-packages"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-packages", {
        params: { search, page, limit_per_page: pageSize },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching packages");
      }
      return res.data.data;
    },
    keepPreviousData: true,
  });
  return {
    packages,
    isLoading,
    error,
    refetch,
    currentPage: packages?.current_page || 1,
    lastPage: packages?.last_page || 1,
  };
}
