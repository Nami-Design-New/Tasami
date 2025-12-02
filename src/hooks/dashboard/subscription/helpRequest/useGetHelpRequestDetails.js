import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetHelpRequestDetails(enabled = true) {
  const { id } = useParams();

  const { data: helpRequestDetails, isLoading } = useQuery({
    queryKey: ["help-requests-details", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-help-requests/${id}`);
      if (res.data.code !== 200) {
        throw new Error(
          res.data.message || `Error Fetching Help Request Details with id ${id}`
        );
      }
      return res.data.data;
    },
    enabled: !!id && enabled,

  });
  return { helpRequestDetails, isLoading };
}
