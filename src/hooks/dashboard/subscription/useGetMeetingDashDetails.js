import { useQuery } from "@tanstack/react-query";
import { adminAxiosInstance } from "../../../lib/adminAxios";

export default function useGetMeetingDashDetails(id, show) {
  const { isLoading, data: meetingDashDetails } = useQuery({
    queryKey: ["dh-community-meetings", id],
    queryFn: async () => {
      const res = await adminAxiosInstance.get(`dh-community-meetings/${id}`);
      if (res.data.code !== 200) {
        throw new Error(
          res.data.meesage || "error fetching ,meetings dashboard details"
        );
      }
      return res.data.data;
    },
    enabled: !!id && show,
  });
  return { meetingDashDetails, isLoading };
}
