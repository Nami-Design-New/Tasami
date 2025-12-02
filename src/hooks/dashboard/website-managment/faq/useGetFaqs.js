import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";
import { useSearchParams } from "react-router";

export default function useGetFaqs(page = 1, pageSize = 10) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { data, isLoading } = useQuery({
    queryKey: ["dh-faqs", page],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-fqs", {
        params: { search, page, limit_per_page: pageSize },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching faqs");
      }
      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    faqs: data?.data,
    isLoading,
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
  };
}
