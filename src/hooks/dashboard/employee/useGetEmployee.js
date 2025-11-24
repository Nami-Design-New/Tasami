import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetEmployee() {
  const { id } = useParams();

  const { data: employee, isLoading } = useQuery({
    queryKey: ["dashboard-employee-details", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-employees/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Error Fetching Employee");
      }
      return res.data;
    },
    staleTime: undefined,
    gcTime: undefined,
  });
  return { employee, isLoading };
}
