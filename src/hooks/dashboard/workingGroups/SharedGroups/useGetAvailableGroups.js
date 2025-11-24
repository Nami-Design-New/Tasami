import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";
import { useParams } from "react-router";

export default function useGetAvailableGroups(page = 1, pageSize = 10) {
  const { id } = useParams();
  const { data: availableGroups, isLaoding } = useQuery({
    queryKey: ["available-groups", id, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-available-groups/${id}`, {
        params: {
          page,
          limit_per_page: pageSize,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error Fetching Available Groups");
      }
      return res.data;
    },
    keepPreviousData: true,
  });
  return {
    availableGroups,
    isLaoding,
    currentPage: availableGroups?.current_page || 1,
    lastPage: availableGroups?.last_page || 1,
  };
}
