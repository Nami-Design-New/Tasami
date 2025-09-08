import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export default function useGetHelpMechanisms() {
  const { data: helpMechanisms, isLoading } = useQuery({
    queryKey: ["helpMechanism"],
    queryFn: async () => {
      const res = await axiosInstance.get("help-mechanisms");
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    },
  });
  return { helpMechanisms, isLoading };
}
