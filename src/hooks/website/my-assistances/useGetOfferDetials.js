import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetOfferDetials() {
  const { id } = useParams();
  const { data: offerDetails, isLoading, error } = useQuery({
    queryKey: ["offer-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-help-service/${id}`);
      if (res.data.code !== 200) {
        const responseError = new Error(res.data.message);
        responseError.status = res.data.code;
        responseError.responseData = res.data;
        throw responseError;
      }

      return res.data.data;
    },
  });
  return { offerDetails, isLoading, error };
}
