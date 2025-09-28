import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useParams } from "react-router";

export default function useGetConsultaionDetails() {
  const { id } = useParams();
  const { data: consultaionDetails, isLoading } = useQuery({
    queryKey: ["consultaion-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/consultations/${id}`);
      if (res.status !== 200) {
        throw new Error("Failed to fetch consultaion details");
      }
      return res.data.data;
    },
  });
  return { consultaionDetails, isLoading };
}
