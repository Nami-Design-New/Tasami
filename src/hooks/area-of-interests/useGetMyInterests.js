import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetMyInterests() {
  const {
    data: interests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["interests"],
    queryFn: async () => {
      const res = await axiosInstance.get("auth/user-categories");
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Something went wrong");
      }
      return res.data.data;
    },
  });
  return { interests, isLoading, isError };
}
