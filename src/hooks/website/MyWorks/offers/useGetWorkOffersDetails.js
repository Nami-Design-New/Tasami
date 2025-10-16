import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetWorkOffersDetails(id) {
  const { data: workOfferDetails, isLoading } = useQuery({
    queryKey: ["work-offers-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`goal-offer/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Data");
      }
      return res.data.data;
    },
    enabled: !!id,
  });

  return { workOfferDetails, isLoading };
}
