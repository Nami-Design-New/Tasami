import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetCountries({ search, pagenation = "on" } = {}) {
  const { data: countries, isLoading } = useQuery({
    queryKey: ["countries", search, pagenation],
    queryFn: async () => {
      const res = await axiosInstance.get("/countries", {
        params: {
          search,
          pagenation,
        },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch countries");
      }

      return res.data;
    },
  });

  return { countries, isLoading };
}
