import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetAssistantOffersDetails(enabled = true) {
  const { id } = useParams();

  const { data: assistantOffersDetails, isLoading } = useQuery({
    queryKey: ["assistant-offers", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-programs/${id}`);
      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || `Error Fetching Assistant Offers Details with id ${id}`
        );
      }
      return res.data.data;
    },
    enabled: !!id && enabled,

  });
  return { assistantOffersDetails, isLoading };
}
