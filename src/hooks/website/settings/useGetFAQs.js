import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetFAQs(page = 1) {
  const { data, isLoading } = useQuery({
    queryKey: ["faqs", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/faqs?pagination=on&page=${page}`
      );
      return data;
    },
    keepPreviousData: true,
  });
  return { data, isLoading };
}
