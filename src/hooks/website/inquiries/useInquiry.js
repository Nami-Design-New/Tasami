import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useInquiry() {
  const { mutate: inquiry, isPending } = useMutation({
    mutationFn: async ({ work_id, message }) => {
      const res = await axiosInstance.post("inquires", { work_id, message });
      if (res.data.code !== 200) {
        throw new Error(res.data.message || " Error Inquriy");
      }
      return res.data;
    },
  });
  return { inquiry, isPending };
}
