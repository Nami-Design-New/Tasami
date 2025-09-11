import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetCities({
  search,
  pagenation = "on",
  countryId,
} = {}) {
  const { data: cities, isLoading: isCitiesLoading } = useQuery({
    queryKey: ["cities", search, pagenation, countryId],
    queryFn: async () => {
      const res = await axiosInstance.get("/cities", {
        params: {
          search,
          pagenation,
          country_id: countryId,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Failed to fetch cities");
      }
      return res.data;
    },
  });
  return { cities, isCitiesLoading };
}
