import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGetDocsAuth() {
  const { data: docsAuthorities, isLoading } = useQuery({
    queryKey: ["docs-authorities"],
    queryFn: async () => {
      const res = await axiosInstance.get("document-authorities");
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    },
  });

  return { docsAuthorities, isLoading };
}
