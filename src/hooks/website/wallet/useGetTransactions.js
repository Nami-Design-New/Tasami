import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetTransactions() {
  const { data: transctions, isLoading } = useInfiniteQuery({
    queryKey: ["my-transactions"],
    queryFn: async () => {
      const res = await axiosInstance.get("wallet");
      if (res.data.code !== "") {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data.data;
    },
  });
  return { transctions, isLoading };
}
