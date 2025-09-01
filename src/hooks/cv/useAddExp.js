import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useAddExp() {
  const { mutate: addExp, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("user-experience", {
        ...data,
      });
      if (res.data.code !== 200) {
        throw new Error("Failed to add experience");
      }
      return res.data;
    },
  });
  return { addExp, isPending };
}
