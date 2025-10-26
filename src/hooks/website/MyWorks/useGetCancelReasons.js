import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetCancelReasons() {
  const { data: cancelReasons, isLoading } = useQuery({
    queryKey: ["cancel-reasons"],
    queryFn: async () => {
      const res = await axiosInstance.get("contract-cancel-reasons");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "");
      }
      return res.data.data;
    },
  });
  return { cancelReasons, isLoading };
}
