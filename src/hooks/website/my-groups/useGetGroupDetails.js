import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function useGetGroupDetails() {
  const { id } = useParams();

  const { data: groupDetails, isLoading } = useQuery({
    queryKey: ["group-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`helper-groups/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    },
    enabled: !!id,
  });

  return { groupDetails, isLoading };
}
