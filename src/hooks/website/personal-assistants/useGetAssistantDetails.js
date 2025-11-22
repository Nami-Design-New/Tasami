import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetAssistantDetails() {
  const { id } = useParams();
  const { data: assistantDetails, isLoading } = useQuery({
    queryKey: ["assistant-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`helpers/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Assistant Data");
      }

      return res.data.data;
    },
  });

  return { assistantDetails, isLoading };
}
