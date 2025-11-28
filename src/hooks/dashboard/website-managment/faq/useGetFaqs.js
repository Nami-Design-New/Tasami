import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetFaqs(page = 1) {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["dh-faqs", page],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("", {
        params: { page },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching faqs");
      }
      return res.data;
    },
  });

  return { faqs, isLoading };
}
