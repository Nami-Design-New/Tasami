import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";
import { useParams } from "react-router";

export default function useGetDraftedUser() {
  const { id } = useParams();
  const { data: draftedUser, isLoading } = useQuery({
    queryKey: ["drafted-user-details", id],
    queryFn: async () => {
      const res = await adminAxiosInstance(`dh-draft-employees/${id}`);
      if (res?.data?.code !== 200) {
        throw new Error(
          res.data.message,
          "Error Fetching Drafted user details"
        );
      }
      return res.data;
    },
    staleTime: undefined,
    gcTime: undefined,
  });
  return { draftedUser, isLoading };
}
