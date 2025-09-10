import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetHomeData() {
  const { data: homePageData, isLoading } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const res = await axiosInstance.get("home");
      if (res.data.code !== 200) {
        throw new Error(res?.data?.message);
      }

      return res.data.data;
    },
  });
  return { homePageData, isLoading };
}
