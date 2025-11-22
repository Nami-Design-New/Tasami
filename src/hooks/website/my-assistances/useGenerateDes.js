import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useGenerateDes() {
  const { mutate: generateDes, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.get("generate-ai", {
        params: data,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }

      return res.data.data;
    },
  });
  return { generateDes, isPending };
}
