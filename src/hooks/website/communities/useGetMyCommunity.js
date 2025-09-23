import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetMyCommunity() {
  const { data: myCommunity, isLoading } = useQuery({
    queryKey: ["my-community"],
    queryFn: async () => {
      const res = await axiosInstance.get("community");

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }

      return res.data.data;
    },
  });
  return { myCommunity, isLoading };
}
