import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetRates(id) {
  const { data: rates, isLoading } = useQuery({
    queryKey: ["work-rates", id],
    queryFn: async () => {
      const res = await axiosInstance.get("help-services-rates", {
        params: {
          work_id: id,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Rates");
      }
      return res.data.data;
    },
  });
  return { rates, isLoading };
}
