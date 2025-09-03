import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetDocsTypes() {
  const { data: docsTypes, isLoading } = useQuery({
    queryKey: ["docsTypes"],
    queryFn: async () => {
      const res = await axiosInstance.get("document-types");
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    },
  });

  return { docsTypes, isLoading };
}
