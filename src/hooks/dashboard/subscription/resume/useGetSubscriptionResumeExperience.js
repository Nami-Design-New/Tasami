import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../../lib/adminAxios";

export default function useGetSubscriptionResumeExperience(
  search = "",
  page = 1,
  pageSize = 10,
) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["resume-experiences", search, page, pageSize],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-experiences`, {
        params: { search, page, limit_per_page: pageSize },
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching subscription resumes experiences");
      }

      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    resumeExperiences: data?.data || [],
    currentPage: data?.current_page || 1,
    lastPage: data?.last_page || 1,
    isLoading,
    isError,
    refetch,
  };
}
