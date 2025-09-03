import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useEditDoc() {
  const { mutate: editDoc, isPending } = useMutation({
    mutationFn: async ({ id, ...data }) => {
      const res = await axiosInstance.put(`user-documents/${id}`, null, {
        params: data,
      });

      if (res.data.code !== 200) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });

  return { editDoc, isPending };
}
