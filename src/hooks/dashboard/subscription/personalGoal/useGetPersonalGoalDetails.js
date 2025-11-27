import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetPersonalGoalDetails(enabled = true) {
  const { id } = useParams();

  const { data: personalGoalDetails, isLoading } = useQuery({
    queryKey: ["personal-goal-details", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-goals/${id}`);
      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || `Error Fetching Personal Goal Details with id ${id}`
        );
      }
      return res.data.data;
    },
    enabled: !!id && enabled,

  });
  return { personalGoalDetails, isLoading };
}
