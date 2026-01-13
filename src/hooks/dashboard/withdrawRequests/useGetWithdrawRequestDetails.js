import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetWithdrawRequestDetails(id) {
  const { data: withdrawRequestDetails, isLoading } = useQuery({
    queryKey: ["withdraw-request", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-withdraw-requests/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Data");
      }

      return res.data.data;
    },
  });
  return { withdrawRequestDetails, isLoading };
}
