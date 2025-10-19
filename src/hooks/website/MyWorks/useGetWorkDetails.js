import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetWorkDetails() {
  const { id } = useParams();
  const { data: workDetails, isLoading } = useQuery({
    queryKey: ["work-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`my-works/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message, "Erro fetching work details");
      }
      return res?.data?.data;
    },
  });
  return { workDetails, isLoading };
}
