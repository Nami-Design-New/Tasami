import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetCV() {
  const { data: cv, isLoading } = useQuery({
    queryKey: ["cv"],
    queryFn: async () => {
      const res = await axiosInstance.get("user-cv");
      if (res.data.code !== 200) {
        console.log(res.data.message);

        throw new Error("Failed to fetch CV");
      }

      return res.data.data;
    },
  });

  return { cv, isLoading };
}
