import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetPostDetails() {
  const { id } = useParams();
  const { data: postDetails, isLoading } = useQuery({
    queryKey: ["post-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`posts/${id}`);
      if (res.data.code !== 200) {
        throw new Error("Error Get Details");
      }

      return res.data.data;
    },
  });

  return { postDetails, isLoading };
}
