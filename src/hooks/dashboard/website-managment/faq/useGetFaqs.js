import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetFaqs(search, page = 1, pageSize = 10) {
  const { data, isLoading } = useQuery({
    queryKey: ["dh-faqs", search, page],
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
