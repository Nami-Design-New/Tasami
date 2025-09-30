import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetPersonalOfferDetails() {
  const { id } = useParams();
  const { data: offerDetails, isLoading } = useQuery({
    queryKey: ["offer-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`help-services/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetch data");
      }
      return res.data.data;
    },
  });
  return { offerDetails, isLoading };
}
