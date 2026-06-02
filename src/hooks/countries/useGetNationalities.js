import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetNationalities(search, pagination = "on") {
  const { data: nationalities, isLoading } = useQuery({
    queryKey: ["nationalities", search, pagination],
    queryFn: async () => {
      const res = await axiosInstance.get("nationalities", {
        params: {
          search,
          pagination,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch nationalities");
      }
      return res.data;
    },
  });
  return { nationalities, isLoading };
}
