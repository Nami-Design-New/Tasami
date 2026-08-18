import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import { createApiResponseError } from "../../../utils/apiErrors";

export default function useGetOfferDetials() {
  const { id } = useParams();
  const { data: offerDetails, isLoading, error } = useQuery({
    queryKey: ["offer-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-help-service/${id}`);
      if (res.data.code !== 200) {
        throw createApiResponseError(res.data, "Error Fetch data");
      }

      return res.data.data;
    },
  });
  return { offerDetails, isLoading, error };
}
