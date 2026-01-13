import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetMeetingDetails(id, show) {
  const { isLoading, data: meetingDetails } = useQuery({
    queryKey: ["meeting-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`meeting/${id}`);
      if (res.data.code !== 200) {
        throw new Error(res.data.meesage || "error fetching ,eeting details");
      }
      return res.data.data;
    },
    enabled: !!id && show,
  });
  return { meetingDetails, isLoading };
}
