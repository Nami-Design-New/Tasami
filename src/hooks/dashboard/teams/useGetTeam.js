import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetTeam(search = "", page = 1, pageSize = 10) {
  const {
    data: team,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-team"],
    queryFn: async () => {
      const res = await adminAxiosInstance.get("dh-employees", {
        params: { search, page, limit_per_page: pageSize },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error create Data");
      }
      console.log(res?.data);

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    team,
    isLoading,
    currentPage: team?.current_page || 1,
    lastPage: team?.last_page || 1,
    isError,
    refetch,
  };
}
