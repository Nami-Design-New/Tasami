
import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetConsultaionDashDetails(
  id
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["consultaion-dash-details", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-community-consultations/${id}`,);

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching community consultations details");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    consultaionDashDetails: data?.data || [],
    isLoading,
    isError,
    refetch,
  };
}
