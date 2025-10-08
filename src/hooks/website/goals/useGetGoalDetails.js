import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetGoalDetails() {
  const { id } = useParams();

  const { data: goalDetails, isLoading } = useQuery({
    queryKey: ["goal-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`goals/${id}`);
      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || `Error Fetching Goal Details with id ${id}`
        );
      }
      return res.data.data;
    },
  });
  return { goalDetails, isLoading };
}
