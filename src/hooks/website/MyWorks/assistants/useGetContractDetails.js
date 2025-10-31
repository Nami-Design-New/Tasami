import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetContractDetails(id) {
  const { data: contractDetails, isLoading } = useQuery({
    queryKey: ["contract-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/helpers-of-goal/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetch data");
      }

      return res.data.data;
    },
  });
  return { contractDetails, isLoading };
}
