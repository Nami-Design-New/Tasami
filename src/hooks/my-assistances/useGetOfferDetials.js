import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../lib/axios";

export default function useGetOfferDetials() {
  const { id } = useParams();
  const { data: offerDetails, isLoading } = useQuery({
    queryKey: ["offer-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-help-service/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      console.log(res.data.data);

      return res.data.data;
    },
  });
  return { offerDetails, isLoading };
}
