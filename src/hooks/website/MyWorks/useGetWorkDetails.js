import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetWorkDetails() {
  const { id } = useParams();
  const { data: workDetails, isLoading } = useQuery({
    queryKey: ["work-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`my-works/${id}`);
      if (res.data.code === 200) {
        return res.data.data;
      } else if (res.data.code === 404) {
        window.location.href = "/not-found";
        return null;
        // throw new Error("Error Get Details");
      }
    },
  });
  return { workDetails, isLoading };
}
