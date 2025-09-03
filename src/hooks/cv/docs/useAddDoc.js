import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useAddDoc() {
  const { mutate: addDoc, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("user-documents", data);
      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return { addDoc, isPending };
}
