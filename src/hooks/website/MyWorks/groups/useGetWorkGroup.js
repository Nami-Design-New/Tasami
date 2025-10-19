import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetWorkGroup(id, groupId) {
  const { data: workGroup, isLoading } = useQuery({
    queryKey: ["work-group", id, groupId],
    queryFn: async () => {
      const res = await axiosInstance.get("group-of-goal", {
        params: {
          work_id: id,
          group_id: groupId,
        },
      });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || "Error fetching group");
      }
      return res.data.data;
    },
  });
  return { workGroup, isLoading };
}
