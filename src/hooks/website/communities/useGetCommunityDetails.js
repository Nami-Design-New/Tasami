import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { useParams } from "react-router";

export default function useGetCommunityDetails() {
  const { id } = useParams();
  const { data: communityDetails, isLoading } = useQuery({
    queryKey: ["community-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`my-communities/${id}`);

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }

      return res.data.data;
    },
  });
  return { communityDetails, isLoading };
}
