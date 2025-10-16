import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../lib/axios";

export default function useGetWorkAssistants(id) {
  console.log(id);

  const { data: workAssistants, isLoading } = useQuery({
    queryKey: ["assistants", id],
    queryFn: async () => {
      const res = await axiosInstance.get("helpers-of-goal", {
        params: { work_id: id },
      });
      console.log(res);

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    },
  });
  return { workAssistants, isLoading };
}
