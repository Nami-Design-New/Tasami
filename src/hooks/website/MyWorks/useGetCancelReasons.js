import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetCancelReasons() {
  const { data: cancelReasons, isLaoding } = useQuery({
    queryKey: ["cancel-reasons"],
    queryFn: async () => {
      const res = await axiosInstance.get("contract-cancel-reasons");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "");
      }
      res.data.data;
    },
  });
  return { cancelReasons, isLaoding };
}
