import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";
import { useSearchParams } from "react-router";

export default function useGetWithDrawRequests(
  search,
  page = 1,
  pageSize = 10
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: withdrawRequests, isLoading } = useQuery({
    queryKey: ["withdraw-requests", page, pageSize, search],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-withdraw-requests", {
        params: { page, limit_per_page: pageSize, search },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error Fetching witdraw Data");
      }

      return res.data;
    },
  });
  return {
    withdrawRequests,
    isLoading,
    currentPage: withdrawRequests?.current_page || 1,
    lastPage: withdrawRequests?.last_page || 1,
  };
}
